import dotenv from 'dotenv';
dotenv.config();
const { CLIENT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!CLIENT_TOKEN || !CLIENT_ID || !GUILD_ID) {
  throw new Error('Missing environment variables!');
}

const envTokens: Record<string, string> = {
  CLIENT_TOKEN,
  CLIENT_ID,
  GUILD_ID,
};

export default envTokens;