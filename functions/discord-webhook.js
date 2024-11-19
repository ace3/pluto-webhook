const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { body } = event;

  try {
    const payload = JSON.parse(body);

    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    // Customize the Discord message
    const discordMessage = {
      content: `🚀 Deployment Update\n\n- **Site Name**: ${payload.name}\n- **State**: ${payload.state}\n- **Branch**: ${payload.branch}\n- **URL**: ${payload.deploy_url}`,
    };

    // Send the message to Discord
    await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error processing webhook:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
