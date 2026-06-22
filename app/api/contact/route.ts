import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, phone, requirements } = body;

    // Validate request body fields
    if (!name || !email || !phone || !requirements) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;

    if (!user || !pass) {
      console.warn('SMTP credentials are not configured in environment variables. Falling back to console logging.');
      console.log('--- Form Submission ---');
      console.log('Name:', name);
      console.log('Company:', company);
      console.log('Email:', email);
      console.log('Phone:', phone);
      console.log('Requirements:', requirements);
      console.log('-----------------------');
      
      // We will succeed during development or local runs without credentials, so UI can show success.
      return NextResponse.json({ 
        success: true, 
        warning: 'SMTP_USER or SMTP_PASSWORD is not set. Logged submission to server console.' 
      }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${name} via JioLite Website" <${user}>`,
      replyTo: email,
      to: 'omar.puneet9797@gmail.com',
      subject: `New Project Inquiry from ${name} (${company || 'No Company'})`,
      text: `
New Contact Form Submission:
----------------------------------
Name: ${name}
Company: ${company || 'N/A'}
Email: ${email}
Phone: ${phone}
Requirements:
${requirements}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fafafa;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px; margin-top: 0;">New Website Lead</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 10px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Company:</td>
              <td style="padding: 10px;">${company || 'N/A'}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; font-weight: bold;">Email:</td>
              <td style="padding: 10px;"><a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Phone:</td>
              <td style="padding: 10px;"><a href="tel:${phone}" style="color: #0ea5e9; text-decoration: none;">${phone}</a></td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #8b5cf6; border-radius: 4px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
            <h4 style="margin-top: 0; color: #8b5cf6; margin-bottom: 8px;">Project Requirements:</h4>
            <p style="white-space: pre-wrap; line-height: 1.5; color: #333333; margin: 0;">${requirements}</p>
          </div>
          <p style="font-size: 11px; color: #777777; text-align: center; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 10px; margin-bottom: 0;">
            This email was automatically generated from the contact form on your website.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
