exports.handler = async function (event) {
  try {
    const payload = JSON.parse(event.body).payload;
    const { name, email, subject, message } = payload.data;

    if (!email) {
      return { statusCode: 200, body: "No email address — skipping auto-reply" };
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tom Nguyen <noreply@tomnguyen.me>",
        to: [email],
        reply_to: "tom.nguyen.nht@gmail.com",
        subject: "Thanks for reaching out!",
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #0f172a;">
            <h2 style="color: #0ea5e9;">Hey ${name}, thanks for your message!</h2>
            <p>I received your message and will get back to you as soon as possible — usually within 24 hours.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #64748b; font-size: 14px;"><strong>Your message:</strong></p>
            <p style="color: #64748b; font-size: 14px;"><em>${message.replace(/\n/g, "<br/>")}</em></p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p>Talk soon,<br/><strong>Tom Nguyen</strong></p>
            <p style="font-size: 12px; color: #94a3b8;">
              <a href="https://www.tomnguyen.me" style="color: #0ea5e9;">tomnguyen.me</a> ·
              <a href="https://github.com/tomnguyen103" style="color: #0ea5e9;">GitHub</a> ·
              <a href="https://www.linkedin.com/in/tomnguyen103/" style="color: #0ea5e9;">LinkedIn</a>
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return { statusCode: 500, body: "Failed to send auto-reply" };
    }

    return { statusCode: 200, body: "Auto-reply sent" };
  } catch (err) {
    console.error("submission-created error:", err);
    return { statusCode: 500, body: "Internal error" };
  }
};
