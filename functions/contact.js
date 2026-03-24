export async function onRequestPost(context) {
  try {
    const data = await context.request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    // For now, this will log the data in your Cloudflare dashboard.
    // To actually get an email, you'd plug in a mail API here.
    console.log(`New Quote Request from ${name} (${email}): ${message}`);

    // Redirect to a "Thank You" page or back to home
    return new Response(null, {
      status: 302,
      headers: { 'Location': '/?success=true' }
    });
  } catch (err) {
    return new Response('Error processing form', { status: 500 });
  }
}
