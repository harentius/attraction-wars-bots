import { Storage, Client } from 'attraction-wars-client-storage';
import Bot from './Bot';
const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';

const n = 10;
const botNames = [];

for (let i = 0; i < n; i++) {
  botNames.push(`test${i}`);
}

const bots: Bot[] = [];

for (const botName of botNames) {
  const storage = new Storage();
  const client = new Client(storage, serverUrl);
  const bot = new Bot(botName, client, storage);
  bots.push(bot);
  bot.login();
  bot.triggerLeft();
}
