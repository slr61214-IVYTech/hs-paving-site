export async function onRequestPost(context) {
  try {
    const data = await context.request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    // 1. Fetch your API Key from the Environment Variables you set in Cloudflare
    const resendApiKey = context.env.RESEND_API_KEY;

    // 2. Send the data to Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'H&S Paving <onboarding@resend.dev>', // Update this after verifying your domain in Resend
        to: ['slr6.12.14@gmail.com'], // The email address you want to receive notifications at
        subject: `New Quote Request from ${name}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Resend API Error:', errorText);
      return new Response('Failed to send email', { status: 500 });
    }

    // 3. Redirect back to your site with a success message
    return new Response(null, {
      status: 302,
      headers: { 'Location': '/?success=true' },
    });

  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}
