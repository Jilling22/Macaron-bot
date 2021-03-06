import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { images } from '../../config/config.json';
import jp from '../../data/harugquotesjp.json';
import { setWebhook } from '../../util/set-webhook';

export const data = new SlashCommandBuilder()
  .setName('はるまきごはん')
  .setDescription('The creator of Buff Macaron');

export async function execute(interaction: CommandInteraction) {
  const channel = (await interaction.client.channels.fetch(
    interaction.channel!.id,
  )) as TextChannel;

  const webhook = await setWebhook(interaction.client, channel);

  const quote = () => {
    const number = jp[Math.floor(Math.random() * jp.length)];
    if (number === 'アイコンの振り向き方同じすぎる') {
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
    username: 'はるまきごはん',
    content: quote(),
  });
}
