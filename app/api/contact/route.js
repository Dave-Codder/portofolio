import nodemailer from 'nodemailer';

export async function POST(request) {
  const body = await request.json();
  console.log('Received form data:', body);

  const { name, email, message } = body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 465,
    auth: {
      user: 'resend',
      pass: 're_FgQZQFgv_5HsxKuc9ySQEja7s8obeh6Qt', // Replace with your Resend API key
    },
  });

  const mailOptions = {
    from: 'onboarding@resend.dev', // Use a verified sender from Resend
    to: 'daveonation523@gmail.com',
    subject: `New Contact Form Submission from ${name || 'Unknown'}`,
    text: `Name: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}\nMessage: ${message || 'No message'}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', 'daveonation523@gmail.com');
    return new Response(JSON.stringify({ message: 'Message sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email sending failed:', error.message, error.stack);
    return new Response(JSON.stringify({ message: 'Failed to send message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}