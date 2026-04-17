// Google Sheets integration using a Google Service Account
// Required env vars:
//   GOOGLE_SERVICE_ACCOUNT_KEY  — the full JSON key file contents (as a string)
//   GOOGLE_SHEET_ID             — the spreadsheet ID (from its URL)

import crypto from 'crypto';

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

function base64url(input: string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set');
  }

  const key: ServiceAccountKey = JSON.parse(keyJson);
  const now = Math.floor(Date.now() / 1000);

  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({
      iss: key.client_email,
      scope: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.readonly',
      ].join(' '),
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  );

  const signingInput = `${header}.${claims}`;
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signingInput);
  const signature = sign
    .sign(key.private_key, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  const jwt = `${signingInput}.${signature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const data = (await response.json()) as any;
  if (!data.access_token) {
    throw new Error('Failed to get Google access token: ' + JSON.stringify(data));
  }

  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + 55 * 60 * 1000; // refresh 5 min before expiry
  return cachedToken!;
}

function getSheetId(): string {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error('GOOGLE_SHEET_ID environment variable is not set');
  return id;
}

// ─── Core helper ─────────────────────────────────────────────────────────────

export async function appendToSheet(sheetName: string, values: any[][]): Promise<void> {
  const accessToken = await getAccessToken();
  const sheetId = getSheetId();

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/` +
    `${encodeURIComponent(sheetName)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Google Sheets API error:', error);
    throw new Error('Failed to append to Google Sheet: ' + JSON.stringify(error));
  }
}

export async function getSpreadsheetUrl(): Promise<string> {
  return `https://docs.google.com/spreadsheets/d/${getSheetId()}`;
}

export async function readSheet(sheetName: string): Promise<any[][]> {
  const accessToken = await getAccessToken();
  const sheetId = getSheetId();

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/` +
    `${encodeURIComponent(sheetName)}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error('Failed to read sheet: ' + JSON.stringify(error));
  }

  const data = (await response.json()) as any;
  return data.values || [];
}

// ─── Form submission handlers ─────────────────────────────────────────────────

export async function submitVolunteerForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  dob: string;
  occupation: string;
  volunteerType: string[];
  projects: string[];
}): Promise<void> {
  await appendToSheet('Volunteer Applications', [[
    new Date().toISOString(),
    data.firstName,
    data.lastName,
    data.email,
    data.phone,
    data.city,
    data.dob,
    data.occupation,
    data.volunteerType.join(', '),
    data.projects.join(', '),
  ]]);
}

export async function submitCorporatePartnership(data: {
  pocName: string;
  companyName: string;
  email: string;
  phone: string;
  interest: string[];
  engagementType: string;
  locationType: string;
  existingLocation?: string;
  customLocation?: string;
  expectedEmployees: string;
  additionalNotes?: string;
}): Promise<void> {
  const location = data.locationType === 'existing' ? data.existingLocation : data.customLocation;
  await appendToSheet('Corporate Partnerships', [[
    new Date().toISOString(),
    data.companyName,
    data.pocName,
    data.email,
    data.phone,
    data.interest.join(', '),
    data.engagementType,
    location || '',
    data.expectedEmployees,
    data.additionalNotes || '',
  ]]);
}

export async function submitContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  await appendToSheet('Contact Messages', [[
    new Date().toISOString(),
    data.name,
    data.email,
    data.subject,
    data.message,
  ]]);
}

export async function submitDonation(data: {
  name: string;
  email: string;
  phone: string;
  amount: number;
  idType: string;
  idNumber: string;
  paymentId: string;
  orderId: string;
}): Promise<void> {
  await appendToSheet('Donations', [[
    new Date().toISOString(),
    data.name,
    data.email,
    data.phone,
    data.amount,
    data.idType,
    data.idNumber,
    data.paymentId,
    data.orderId,
  ]]);
}

export async function submitCEOContact(data: {
  name: string;
  phone: string;
  company: string;
  designation?: string;
  message?: string;
}): Promise<void> {
  await appendToSheet('CEO Contact Requests', [[
    new Date().toISOString(),
    data.name,
    data.phone,
    data.company,
    data.designation || '',
    data.message || '',
  ]]);
}
