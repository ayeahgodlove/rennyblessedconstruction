const nodemailer = require('nodemailer');
const path = require('path');

// Email configuration
const emailConfig = {
  service: 'gmail', // or your email service provider
  auth: {
    user: 'rennyblessedconstruction@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password' // Use app password for Gmail
  }
};

// Create transporter with error handling
let transporter;
try {
  // Nodemailer uses `createTransport` (not `createTransporter`)
  transporter = nodemailer.createTransport(emailConfig);
} catch (error) {
  console.error('Error creating email transporter:', error);
}

// Email templates
const emailTemplates = {
  quoteRequest: (data) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Quote Request - RB Construction</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #e74c3c; }
            .value { margin-top: 5px; }
            .message-box { background: white; padding: 20px; border-left: 4px solid #e74c3c; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🏗️ RB Construction & Engineering</div>
                <p>New Quote Request Received</p>
            </div>
            <div class="content">
                <h2>Quote Request Details</h2>
                
                <div class="field">
                    <div class="label">Client Name:</div>
                    <div class="value">${data.name}</div>
                </div>
                
                <div class="field">
                    <div class="label">Email Address:</div>
                    <div class="value">${data.email}</div>
                </div>
                
                <div class="field">
                    <div class="label">Phone Number:</div>
                    <div class="value">${data.phone}</div>
                </div>
                
                <div class="field">
                    <div class="label">Project Details:</div>
                    <div class="message-box">
                        ${data.message.replace(/\n/g, '<br>')}
                    </div>
                </div>
                
                <div class="field">
                    <div class="label">Request Date:</div>
                    <div class="value">${new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</div>
                </div>
                
                <div class="footer">
                    <p><strong>RB Construction & Engineering Associate</strong></p>
                    <p>📍 Nkwen Bamenda, Cameroon</p>
                    <p>📞 (+237) 675 729 438 | 📧 rennyblessedconstruction@gmail.com</p>
                    <p><em>Building Dreams, Creating Futures</em></p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  },

  contactForm: (data) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message - RB Construction</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #e74c3c; }
            .value { margin-top: 5px; }
            .message-box { background: white; padding: 20px; border-left: 4px solid #e74c3c; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🏗️ RB Construction & Engineering</div>
                <p>New Contact Message Received</p>
            </div>
            <div class="content">
                <h2>Contact Message Details</h2>
                
                <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">${data.name}</div>
                </div>
                
                <div class="field">
                    <div class="label">Email:</div>
                    <div class="value">${data.email}</div>
                </div>
                
                <div class="field">
                    <div class="label">Subject:</div>
                    <div class="value">${data.subject}</div>
                </div>
                
                <div class="field">
                    <div class="label">Message:</div>
                    <div class="message-box">
                        ${data.message.replace(/\n/g, '<br>')}
                    </div>
                </div>
                
                <div class="field">
                    <div class="label">Received:</div>
                    <div class="value">${new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</div>
                </div>
                
                <div class="footer">
                    <p><strong>RB Construction & Engineering Associate</strong></p>
                    <p>📍 Nkwen Bamenda, Cameroon</p>
                    <p>📞 (+237) 675 729 438 | 📧 rennyblessedconstruction@gmail.com</p>
                    <p><em>Building Dreams, Creating Futures</em></p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  }
};

// Email sending functions
const sendQuoteRequest = async (data) => {
  try {
    if (!transporter) {
      throw new Error('Email transporter not configured');
    }

    const mailOptions = {
      from: 'rennyblessedconstruction@gmail.com',
      to: 'rennyblessedconstruction@gmail.com',
      subject: `New Quote Request from ${data.name}`,
      html: emailTemplates.quoteRequest(data),
      replyTo: data.email
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Quote request email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending quote request email:', error);
    return { success: false, error: error.message };
  }
};

const sendContactMessage = async (data) => {
  try {
    if (!transporter) {
      throw new Error('Email transporter not configured');
    }

    const mailOptions = {
      from: 'rennyblessedconstruction@gmail.com',
      to: 'rennyblessedconstruction@gmail.com',
      subject: `New Contact Message: ${data.subject}`,
      html: emailTemplates.contactForm(data),
      replyTo: data.email
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Contact message email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending contact message email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendQuoteRequest,
  sendContactMessage
};
