import DirectionManager from '../../../../src/bot/AI/Direction/DirectionManager';
import each from 'jest-each';
import Direction from '../../../../src/bot/AI/Direction/Direction';
import GameObject from '../../../../src/storage/GameObject';
import Target from '../../../../src/bot/AI/Target/Target';

const directionManager = new DirectionManager(50);

each([
  [],
]).test('Select Directional', (
  playerData: GameObject,
  target: Target,
  visiblePlayers: GameObject[],
  visibleAsteroids: GameObject[],
  expectedDirection: Direction,
) => {
  const direction = directionManager.selectDirection(playerData, target, visiblePlayers, visibleAsteroids);

  expect(expectedDirection).toEqual(direction);
});
