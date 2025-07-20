import axios from 'axios';

export async function sendDiscordLog(webhookUrl: string, message: string) {
  try {
    await axios.post(webhookUrl, {
      content: message,
    });
  } catch (err) {
    // Optionally log failure to send to Discord
    // You can use NestJS Logger here if needed
  }
}
