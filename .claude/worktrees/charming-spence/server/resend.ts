import { Resend } from 'resend';

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@humanityorg.foundation';

  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  return { apiKey, fromEmail };
}

export async function getResendClient() {
  const { apiKey, fromEmail } = getResendConfig();
  return {
    client: new Resend(apiKey),
    fromEmail,
  };
}

export async function sendCEOContactEmail(data: {
  name: string;
  phone: string;
  company: string;
  designation?: string;
  message: string;
}) {
  const { client, fromEmail } = await getResendClient();

  const emailContent = `
New Contact Request from Leadership Page

Name: ${data.name}
Phone: ${data.phone}
Company: ${data.company}
Designation: ${data.designation || 'Not provided'}

Message:
${data.message}
  `.trim();

  await client.emails.send({
    from: fromEmail,
    to: 'abhishek@humanityorg.foundation',
    subject: `New Contact Request from ${data.name} - ${data.company}`,
    text: emailContent,
    replyTo: fromEmail,
  });

  return { success: true };
}
