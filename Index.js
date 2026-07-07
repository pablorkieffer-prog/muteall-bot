const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const TOKEN = "COLOQUE_SEU_TOKEN_AQUI";

client.once("ready", () => {
  console.log(`Bot online como ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "muteall") {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) {
      return interaction.reply({
        content: "Você não tem permissão.",
        ephemeral: true
      });
    }

    const canal = interaction.member.voice.channel;

    if (!canal) {
      return interaction.reply("Entre em um canal de voz primeiro.");
    }

    canal.members.forEach(membro => {
      membro.voice.setMute(true);
    });

    interaction.reply("🔇 Todos foram mutados.");
  }

  if (interaction.commandName === "unmuteall") {
    const canal = interaction.member.voice.channel;

    if (!canal) {
      return interaction.reply("Entre em um canal de voz primeiro.");
    }

    canal.members.forEach(membro => {
      membro.voice.setMute(false);
    });

    interaction.reply("🔊 Todos foram desmutados.");
  }
});

client.login(TOKEN);
