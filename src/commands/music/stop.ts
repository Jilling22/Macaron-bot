import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('Stops the bot and clears the queue');

export async function execute(interaction: CommandInteraction) {
  const queue = interaction.client.player.getQueue(interaction.guildId!);

  await interaction.reply('Playing something...');

  if (!queue) return await interaction.editReply('Burning queue.');

  queue.destroy();
  return interaction.editReply('Bye!');
}