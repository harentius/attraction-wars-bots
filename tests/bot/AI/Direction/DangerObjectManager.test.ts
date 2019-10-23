import each from 'jest-each';
import DangerObjectManager from '../../../../src/bot/AI/Direction/DangerObjectManager';
import GameObject from '../../../../src/storage/GameObject';
import Direction from '../../../../src/bot/AI/Direction/Direction';

const dangerObjectManager = new DangerObjectManager(0);

each([
  [{ x: 0, y: 0, r: 50, id: 1}, [], [], null],
  [{ x: 0, y: 0, r: 50, id: 1}, [{ x: 300, y: 0, r: 40}], [], null], // smaller
  [{ x: 0, y: 0, r: 50, id: 1}, [{ x: 300, y: 0, r: 60}], [], { x: 300, y: 0, r: 72}],
  [{ x: 0, y: 0, r: 50, id: 1}, [{ x: 200, y: 0, r: 60}, { x: 300, y: 0, r: 60}], [], { x: 200, y: 0, r: 72}],
]).test('Get Danger Object', (
  playerData: GameObject,
  visibleAsteroids: GameObject[],
  visiblePlayers: GameObject[],
  expectedDangerObject: GameObject|null,
) => {
  const dangerObject = dangerObjectManager.getDangerObject(
    playerData,
    visiblePlayers,
    visibleAsteroids,
    1.5,
    1.2,
  );

  expect(dangerObject).toEqual(expectedDangerObject);
});
