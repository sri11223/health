// src/utils.js
export const loadBotpressScript = () => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.botpress.cloud/webchat/v2.2/shareable.js?configUrl=https://files.bpcontent.cloud/2025/01/24/18/20250124181809-78D46SMK.json";
    script.async = true;
    document.body.appendChild(script);
  };