import { Storage, Client } from 'attraction-wars-client-storage';
import Bot from '../../src/bot/Bot';

const storage = new Storage();
storage.refresh(
  // World Data
  {
    asteroidsData: {
      0: { x: 100, y: 100, r: 30 }, // circle is inside vision
      1: { x: 250, y: 250, r: 50 }, // circle is out of vision
      2: { x: 200, y: 200, r: 60 }, // center is out of vision, circle is in vision
      3: { x: 140, y: 140, r: 60 }, // center is in vision, circle is partially out vision
    },
  },

  // Player Data
  { x: 0, y: 0, r: 50 },
);

const client = new Client(storage, '');
const bot = new Bot('test_name', client, storage, 100);

describe('Bot vision', () => {
  test('Bot sees asteroids inside vision radius and they are sorted by distance', () => {
    const visibleObjects = bot.getVisibleAsteroids();

    expect(visibleObjects).toEqual([
      { x: 100, y: 100, r: 30 },
      { x: 140, y: 140, r: 60 },
      { x: 200, y: 200, r: 60 },
    ]);
  });
});
