import { Storage, Client } from 'attraction-wars-client-storage';
import Bot from './bot/Bot';
import config from './config';
import BotAI from './bot/AI/BotAI';
import TargetManager from './bot/AI/Target/TargetManager';
import DirectionManager from './bot/AI/Direction/DirectionManager';
import KeysPressStateFactory from './bot/AI/KeysPressStateFactory';
const { serverUrl } = config;

const n = 1;
const botNames = [];

for (let i = 0; i < n; i++) {
  botNames.push(`test${i}`);
}

const botAIs: BotAI[] = [];

const targetManager = new TargetManager();
const directionManager = new DirectionManager(config.minDangerDistance);
const keyPressStateFactory = new KeysPressStateFactory();

for (const botName of botNames) {
  const storage = new Storage();
  const client = new Client(storage, serverUrl);
  const bot = new Bot(botName, client, storage, config.visibilityRadius);
  const botAI = new BotAI(bot, targetManager, directionManager, keyPressStateFactory);
  botAIs.push(botAI);
}

setInterval(() => {
  for (const botAI of botAIs) {
    botAI.tick();
  }
}, config.tickInterval);
