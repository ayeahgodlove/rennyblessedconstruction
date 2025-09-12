# Email Setup Instructions for RB Construction Website

## Quick Setup Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables Setup
Create a `.env` file in your project root with the following:

```env
# Server Configuration
SERVER_PORT=3000

# Database Configuration (your existing settings)
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# Email Configuration (NEW - REQUIRED FOR EMAIL FUNCTIONALITY)
EMAIL_PASSWORD=your_gmail_app_password

# Application URL
APP_URL=http://localhost:3000

# Session Secret (your existing setting)
SESSION_SECRET=your_session_secret_key
```

### 3. Gmail App Password Setup (IMPORTANT!)

To enable email functionality, you need to set up a Gmail App Password:

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/
   - Sign in with: rennyblessedconstruction@gmail.com

2. **Enable 2-Factor Authentication**
   - Go to "Security" → "2-Step Verification"
   - Follow the setup process

3. **Generate App Password**
   - Go to "Security" → "App passwords"
   - Select "Mail" as the app
   - Copy the generated 16-character password
   - Use this password in your `.env` file as `EMAIL_PASSWORD`

### 4. Test Email Functionality

Once setup is complete:
- Start your application: `npm start`
- Visit the contact page and submit a test message
- Check rennyblessedconstruction@gmail.com for the email

### 5. Email Configuration Details

- **From Email**: rennyblessedconstruction@gmail.com
- **To Email**: rennyblessedconstruction@gmail.com
- **Forms**: Quote requests and contact messages
- **Templates**: Professional HTML emails with company branding

### 6. Troubleshooting

If emails don't work:
1. Verify the Gmail App Password is correct
2. Check that 2-Factor Authentication is enabled
3. Ensure the `.env` file is in the project root
4. Check console logs for error messages

### 7. Security Notes

- Never commit the `.env` file to version control
- The App Password is different from your regular Gmail password
- App Passwords are more secure for applications

## Ready to Go!

Once these steps are completed, your website will have:
✅ Professional email templates
✅ Quote form submissions
✅ Contact form submissions
✅ All emails sent to rennyblessedconstruction@gmail.com
✅ Professional company branding in emails
