import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { images } from '../../config/config.json';
import en from '../../data/harugquotesen.json';

export const data = new SlashCommandBuilder()
  .setName('harumakigohan')
  .setDescription('The creator of Buff Macaron');

export async function execute(interaction: CommandInteraction) {
  const channel = (await interaction.client.channels.fetch(
    interaction.channel!.id,
  )) as TextChannel;

  const webhooks = await channel.fetchWebhooks();
  let webhook = webhooks.find((w) => w.token != null);

  if (!webhook) {
    webhook = await channel.createWebhook('Bald Macaron', {
      avatar: interaction.client.user!.avatarURL(),
    });
  }

  const quote = () => {
    const number = en[Math.floor(Math.random() * en.length)];
    if (
      number ===
      'The way our icons are looking over their shoulders is too similar'
    ) {
      return number + ' ' + images.shoulder;
    } else {
      return number;
    }
  };

  // TODO: figure out how to bypass mandatory reply for interactions when sending webhook
  interaction.reply('​');
  await interaction.deleteReply();

  return await webhook!.send({
    avatarURL: images.HarugoAvatar,
    username: 'Harumaki Gohan',
    content: quote(),
  });
}
