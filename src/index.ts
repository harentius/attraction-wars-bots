import { Storage, Client } from 'attraction-wars-client-storage';

const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';

const n = 10;
const bots = [];

for (let i = 0; i < n; i++) {
  bots.push({name: `test${i}`, socket: null});
}

const clients = [];
for (const bot of bots) {
  const storage = new Storage();
  const client = new Client(storage, serverUrl);
  client.login(bot);
  client.sendKeysPressState({
    up: false,
    down: false,
    left: false,
    right: true,
    space: false,
  });
  clients.push(client);
}
