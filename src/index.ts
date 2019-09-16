import { Storage, Client } from 'attraction-wars-client-storage';
import Bot from './bot/Bot';
import config from './config';
import BotAI from './bot/BotAI';
const { serverUrl } = config;

const n = 1;
const botNames = [];

for (let i = 0; i < n; i++) {
  botNames.push(`test${i}`);
}

const botAIs: BotAI[] = [];

for (const botName of botNames) {
  const storage = new Storage();
  const client = new Client(storage, serverUrl);
  const bot = new Bot(botName, client, storage, config.visibilityRadius);
  const botAI = new BotAI(bot);
  botAIs.push(botAI);
}

setInterval(() => {
  for (const botAI of botAIs) {
    botAI.tick();
  }
}, config.tickInterval);
