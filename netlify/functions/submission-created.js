exports.handler = async function (event) {
  try {
    const payload = JSON.parse(event.body).payload;
    const { name, email, subject, message } = payload.data;

    // Drop honeypot-triggered submissions
    if (payload.data["bot-field"]) {
      return { statusCode: 200, body: "Bot detected — skipping" };
    }

    if (!email) {
      return { statusCode: 200, body: "No email address — skipping auto-reply" };
    }

    // Basic content sanity checks
    if (!name || name.trim().length < 2 || !message || message.trim().length < 10) {
      return { statusCode: 200, body: "Invalid submission — skipping" };
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
        subject: "Thanks for reaching out!",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
          <body style="margin:0; padding:0; background-color:#f1f5f9; font-family: system-ui, -apple-system, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9; padding: 40px 16px;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

                    <!-- Header -->
                    <tr>
                      <td style="background-color:#0ea5e9; border-radius:12px 12px 0 0; padding: 32px 40px; text-align:center;">
                        <p style="margin:0; font-size:13px; color:#e0f2fe; letter-spacing:1px; text-transform:uppercase;">Message Received</p>
                        <h1 style="margin:8px 0 0; font-size:24px; font-weight:700; color:#ffffff;">Tom Nguyen</h1>
                        <p style="margin:4px 0 0; font-size:13px; color:#bae6fd;">Full Stack & AI Developer</p>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="background-color:#ffffff; padding: 40px;">

                        <p style="margin:0 0 8px; font-size:16px; color:#0f172a;">Hi <strong>${name}</strong>,</p>
                        <p style="margin:0 0 24px; font-size:15px; color:#334155; line-height:1.7;">
                          Thank you for reaching out! I've received your message and will get back to you as soon as possible — typically within <strong>24 hours</strong>.
                        </p>

                        <!-- Message recap -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; border-left:4px solid #0ea5e9; border-radius:0 8px 8px 0; margin-bottom:32px;">
                          <tr>
                            <td style="padding:20px 24px;">
                              <p style="margin:0 0 4px; font-size:11px; font-weight:600; color:#94a3b8; letter-spacing:1px; text-transform:uppercase;">Your message</p>
                              <p style="margin:8px 0 0; font-size:14px; color:#475569; line-height:1.7;">${message.replace(/\n/g, "<br/>")}</p>
                            </td>
                          </tr>
                        </table>

                        <p style="margin:0 0 4px; font-size:15px; color:#334155;">In the meantime, feel free to explore my work:</p>

                        <!-- CTA buttons -->
                        <table cellpadding="0" cellspacing="0" style="margin: 16px 0 32px;">
                          <tr>
                            <td style="padding-right:12px;">
                              <a href="https://www.tomnguyen.me" style="display:inline-block; background-color:#0ea5e9; color:#ffffff; font-size:13px; font-weight:600; text-decoration:none; padding:10px 20px; border-radius:8px;">My Portfolio</a>
                            </td>
                            <td style="padding-right:12px;">
                              <a href="https://github.com/tomnguyen103" style="display:inline-block; background-color:#f1f5f9; color:#334155; font-size:13px; font-weight:600; text-decoration:none; padding:10px 20px; border-radius:8px;">GitHub</a>
                            </td>
                            <td>
                              <a href="https://www.linkedin.com/in/tomnguyen103/" style="display:inline-block; background-color:#f1f5f9; color:#334155; font-size:13px; font-weight:600; text-decoration:none; padding:10px 20px; border-radius:8px;">LinkedIn</a>
                            </td>
                          </tr>
                        </table>

                        <p style="margin:0; font-size:15px; color:#334155; line-height:1.7;">
                          Talk soon,<br/>
                          <strong style="color:#0f172a;">Tom Nguyen</strong>
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color:#f8fafc; border-radius:0 0 12px 12px; padding:20px 40px; text-align:center; border-top:1px solid #e2e8f0;">
                        <p style="margin:0; font-size:12px; color:#94a3b8;">
                          You're receiving this because you submitted the contact form at
                          <a href="https://www.tomnguyen.me" style="color:#0ea5e9; text-decoration:none;">tomnguyen.me</a>
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return { statusCode: 500, body: "Failed to send auto-reply" };
    }

    // Notification email to Tom
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <noreply@tomnguyen.me>",
        to: ["huuthong103@gmail.com"],
        reply_to: email,
        subject: `New message from ${name} — ${subject}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
          <body style="margin:0; padding:0; background-color:#f1f5f9; font-family: system-ui, -apple-system, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9; padding: 40px 16px;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

                    <!-- Header -->
                    <tr>
                      <td style="background-color:#0f172a; border-radius:12px 12px 0 0; padding: 28px 40px; text-align:center;">
                        <p style="margin:0; font-size:12px; color:#94a3b8; letter-spacing:1px; text-transform:uppercase;">New Contact Form Submission</p>
                        <h1 style="margin:8px 0 0; font-size:22px; font-weight:700; color:#ffffff;">tomnguyen.me</h1>
                      </td>
                    </tr>

                    <!-- Sender details -->
                    <tr>
                      <td style="background-color:#ffffff; padding: 32px 40px 0;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; margin-bottom:24px;">
                          <tr style="background-color:#f8fafc;">
                            <td style="padding:10px 16px; font-size:11px; font-weight:600; color:#94a3b8; letter-spacing:1px; text-transform:uppercase; width:80px;">From</td>
                            <td style="padding:10px 16px; font-size:14px; color:#0f172a;">${name}</td>
                          </tr>
                          <tr style="border-top:1px solid #e2e8f0;">
                            <td style="padding:10px 16px; font-size:11px; font-weight:600; color:#94a3b8; letter-spacing:1px; text-transform:uppercase;">Email</td>
                            <td style="padding:10px 16px; font-size:14px;"><a href="mailto:${email}" style="color:#0ea5e9; text-decoration:none;">${email}</a></td>
                          </tr>
                          <tr style="border-top:1px solid #e2e8f0;">
                            <td style="padding:10px 16px; font-size:11px; font-weight:600; color:#94a3b8; letter-spacing:1px; text-transform:uppercase;">Subject</td>
                            <td style="padding:10px 16px; font-size:14px; color:#0f172a;">${subject}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Message -->
                    <tr>
                      <td style="background-color:#ffffff; padding: 0 40px 32px;">
                        <p style="margin:0 0 8px; font-size:11px; font-weight:600; color:#94a3b8; letter-spacing:1px; text-transform:uppercase;">Message</p>
                        <div style="background-color:#f8fafc; border-left:4px solid #0ea5e9; border-radius:0 8px 8px 0; padding:20px 24px;">
                          <p style="margin:0; font-size:14px; color:#334155; line-height:1.8;">${message.replace(/\n/g, "<br/>")}</p>
                        </div>
                      </td>
                    </tr>

                    <!-- Reply CTA -->
                    <tr>
                      <td style="background-color:#ffffff; padding: 0 40px 32px; text-align:center;">
                        <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block; background-color:#0ea5e9; color:#ffffff; font-size:14px; font-weight:600; text-decoration:none; padding:12px 28px; border-radius:8px;">Reply to ${name}</a>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color:#f8fafc; border-radius:0 0 12px 12px; padding:20px 40px; text-align:center; border-top:1px solid #e2e8f0;">
                        <p style="margin:0; font-size:12px; color:#94a3b8;">Submitted via contact form at <a href="https://www.tomnguyen.me" style="color:#0ea5e9; text-decoration:none;">tomnguyen.me</a></p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    });

    return { statusCode: 200, body: "Auto-reply sent" };
  } catch (err) {
    console.error("submission-created error:", err);
    return { statusCode: 500, body: "Internal error" };
  }
};
