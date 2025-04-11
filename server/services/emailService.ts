import nodemailer from 'nodemailer';
import { Contact } from '@shared/schema';

// For demo/test purposes, we're using Ethereal - a fake SMTP service
// In production, you would use actual email credentials
async function createTestAccount() {
  // Generate test SMTP service account from ethereal.email
  const testAccount = await nodemailer.createTestAccount();
  
  // Create a SMTP transporter object
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

// Initialize with Ethereal by default (for testing)
let transporter: nodemailer.Transporter;

// This function will be called once when the server starts
export async function initializeEmailService() {
  try {
    transporter = await createTestAccount();
    console.log('Email service initialized with Ethereal test account');
  } catch (error) {
    console.error('Failed to initialize email service:', error);
  }
}

// Function to send a notification email when someone submits the contact form
export async function sendContactNotification(contact: Contact): Promise<string | null> {
  try {
    if (!transporter) {
      await initializeEmailService();
    }
    
    // Format the email content
    const mailOptions = {
      from: '"Portfolio Website" <portfolio@example.com>',
      to: 'happyswaraj7667@gmail.com', // Happy's email
      subject: `New Contact Form Submission: ${contact.subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message.replace(/\n/g, '<br>')}</p>
        <p><strong>Submitted on:</strong> ${new Date(contact.createdAt || '').toLocaleString()}</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // For Ethereal, we get a preview URL
    console.log('Contact notification email sent:', info.messageId);
    // Preview URL only available when using Ethereal
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log('Preview URL: %s', previewUrl);
      return typeof previewUrl === 'string' ? previewUrl : String(previewUrl);
    }
    
    return null;
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    return null;
  }
}

// Alternative function for use with real SMTP credentials
export function configureRealEmailService(options: {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}) {
  transporter = nodemailer.createTransport(options);
  console.log('Email service configured with real SMTP credentials');
}