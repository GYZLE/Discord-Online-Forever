const { Client } = require("discord.js-selfbot-v13");
const { joinVoiceChannel } = require("@discordjs/voice");
const keep_alive = require("./keep_alive.js");

const token = process.env.token;
const VOICE_CHANNEL_ID = "1448659636025557114";

if (!token) {
  console.log("Discord token not configured. Please set the 'token' secret.");
  console.log("Keep-alive server is still running on port 5000...");
} else {
  const client = new Client({ checkUpdate: false });

  client.on("error", (err) => {
    console.error("Client error:", err.message || err);
  });

  client.on("ready", async () => {
    console.log("Connected as:", client.user.tag);
    
    try {
      const channel = await client.channels.fetch(VOICE_CHANNEL_ID);
      if (!channel) {
        console.error("Voice channel not found!");
        return;
      }
      
      console.log("Joining voice channel:", channel.name);
      
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfMute: false,
        selfDeaf: false
      });
      
      console.log("Joined voice channel successfully!");
    } catch (err) {
      console.error("Failed to join voice channel:", err.message || err);
    }
  });

  client.on("disconnect", () => {
    console.log("Disconnected from Discord");
  });

  console.log("Connecting to Discord...");
  client.login(token).catch(err => {
    console.error("Login failed:", err.message || err);
  });
}
