import nodemailer from "nodemailer";
import fetch from "node-fetch";

export async function POST(request) {
  const body = await request.json();
  console.log("Received form data:", body);

  const { name, email, message } = body;

  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    auth: {
      user: "resend",
      pass: "re_FgQZQFgv_5HsxKuc9ySQEja7s8obeh6Qt", // Replace with your Resend API key
    },
  });

  const mailOptions = {
    from: "onboarding@resend.dev", // Use a verified sender from Resend
    to: "daveonation523@gmail.com",
    subject: `New Contact Form Submission from ${name || "Unknown"}`,
    text: `Name: ${name || "Not provided"}\nEmail: ${
      email || "Not provided"
    }\nMessage: ${message || "No message"}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", "daveonation523@gmail.com");
    return new Response(
      JSON.stringify({ message: "Message sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Email sending failed:", error.message, error.stack);
    return new Response(JSON.stringify({ message: "Failed to send message" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  const { code } = await request.json(); // Authorization code from Spotify redirect
  const clientId = "6f1a650e402b412f9f3f7896eb3fd756";
  const clientSecret = "10ac5a94646a4de1ba8c8e466bed5320";
  const redirectUri = "https://portofolio-ochre-iota.vercel.app/"; // Set in Spotify Dashboard

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();
  const accessToken = data.access_token; // This is the token you use
  return new Response(JSON.stringify({ accessToken }), { status: 200 });
}
