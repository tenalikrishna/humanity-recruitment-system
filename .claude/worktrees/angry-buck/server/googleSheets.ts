// Google Sheets integration for form submissions
// Using Replit Google Sheets connector

let connectionSettings: any;

async function getAccessToken(): Promise<string> {
  if (connectionSettings && connectionSettings.settings?.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('Replit token not found');
  }

  const response = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  );
  
  const data = await response.json();
  connectionSettings = data.items?.[0];

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

// Sheet ID will be stored after first creation
let spreadsheetId: string | null = null;

// Create the main spreadsheet with tabs for each form type
async function getOrCreateSpreadsheet(): Promise<string> {
  if (spreadsheetId) return spreadsheetId;
  
  const accessToken = await getAccessToken();
  
  // First, try to find existing spreadsheet by searching
  const driveSearchUrl = 'https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
    q: "name='HUManity Foundation - Form Responses' and mimeType='application/vnd.google-apps.spreadsheet'",
    fields: 'files(id,name)'
  });
  
  const searchResponse = await fetch(driveSearchUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });
  
  const searchData = await searchResponse.json();
  
  if (searchData.files && searchData.files.length > 0) {
    spreadsheetId = searchData.files[0].id;
    return spreadsheetId!;
  }
  
  // Create new spreadsheet with tabs
  const createUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  const createResponse = await fetch(createUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: 'HUManity Foundation - Form Responses'
      },
      sheets: [
        { properties: { title: 'Volunteer Applications', index: 0 } },
        { properties: { title: 'Corporate Partnerships', index: 1 } },
        { properties: { title: 'Contact Messages', index: 2 } },
        { properties: { title: 'Donations', index: 3 } }
      ]
    })
  });
  
  const createData = await createResponse.json();
  spreadsheetId = createData.spreadsheetId;
  
  // Add headers to each sheet
  const headers = {
    'Volunteer Applications': ['Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'City', 'Date of Birth', 'Occupation', 'Volunteer Type', 'Projects'],
    'Corporate Partnerships': ['Timestamp', 'Company Name', 'Contact Person', 'Email', 'Phone', 'Interests', 'Engagement Type', 'Location', 'Expected Employees', 'Additional Notes'],
    'Contact Messages': ['Timestamp', 'Name', 'Email', 'Subject', 'Message'],
    'Donations': ['Timestamp', 'Name', 'Email', 'Phone', 'Amount', 'ID Type', 'ID Number', 'Payment ID', 'Order ID']
  };
  
  for (const [sheetName, headerRow] of Object.entries(headers)) {
    await appendToSheet(sheetName, [headerRow]);
  }
  
  return spreadsheetId!;
}

// Append data to a specific sheet/tab
export async function appendToSheet(sheetName: string, values: any[][]): Promise<void> {
  const accessToken = await getAccessToken();
  const sheetId = await getOrCreateSpreadsheet();
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: values
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error('Google Sheets API error:', error);
    throw new Error('Failed to append to Google Sheet');
  }
}

// Helper function to get the spreadsheet URL
export async function getSpreadsheetUrl(): Promise<string> {
  const sheetId = await getOrCreateSpreadsheet();
  return `https://docs.google.com/spreadsheets/d/${sheetId}`;
}

// Form submission handlers
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
  const timestamp = new Date().toISOString();
  await appendToSheet('Volunteer Applications', [[
    timestamp,
    data.firstName,
    data.lastName,
    data.email,
    data.phone,
    data.city,
    data.dob,
    data.occupation,
    data.volunteerType.join(', '),
    data.projects.join(', ')
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
  const timestamp = new Date().toISOString();
  const location = data.locationType === 'existing' ? data.existingLocation : data.customLocation;
  await appendToSheet('Corporate Partnerships', [[
    timestamp,
    data.companyName,
    data.pocName,
    data.email,
    data.phone,
    data.interest.join(', '),
    data.engagementType,
    location || '',
    data.expectedEmployees,
    data.additionalNotes || ''
  ]]);
}

export async function submitContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  const timestamp = new Date().toISOString();
  await appendToSheet('Contact Messages', [[
    timestamp,
    data.name,
    data.email,
    data.subject,
    data.message
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
  const timestamp = new Date().toISOString();
  await appendToSheet('Donations', [[
    timestamp,
    data.name,
    data.email,
    data.phone,
    data.amount,
    data.idType,
    data.idNumber,
    data.paymentId,
    data.orderId
  ]]);
}

export async function submitCEOContact(data: {
  name: string;
  phone: string;
  company: string;
  designation?: string;
  message?: string;
}): Promise<void> {
  const timestamp = new Date().toISOString();
  await ensureCEOContactSheet();
  await appendToSheet('CEO Contact Requests', [[
    timestamp,
    data.name,
    data.phone,
    data.company,
    data.designation || '',
    data.message || ''
  ]]);
}

async function ensureCEOContactSheet(): Promise<void> {
  const accessToken = await getAccessToken();
  const sheetId = await getOrCreateSpreadsheet();
  
  // Check if the sheet already exists
  const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties.title`;
  const metaResponse = await fetch(metaUrl, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const metaData = await metaResponse.json();
  
  const sheetExists = metaData.sheets?.some((s: any) => s.properties?.title === 'CEO Contact Requests');
  
  if (!sheetExists) {
    // Create the new sheet
    const batchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`;
    await fetch(batchUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [{
          addSheet: {
            properties: { title: 'CEO Contact Requests' }
          }
        }]
      })
    });
    
    // Add headers
    await appendToSheet('CEO Contact Requests', [['Timestamp', 'Name', 'Phone', 'Company', 'Designation', 'Message']]);
  }
}
