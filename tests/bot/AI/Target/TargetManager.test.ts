import TargetManager from '../../../../src/bot/AI/Target/TargetManager';
import Target from '../../../../src/bot/AI/Target/Target';

const targetManager = new TargetManager();

const asteroids = [
  {id: 2, x: 100, y: 0, r: 60}, // closest, but bigger then player
  {id: 4, x: 120, y: 0, r: 40}, // closest smaller then player
  {id: 3, x: 250, y: 0, r: 40}, // far
];

describe('Select target', () => {
  test('If there is no players, closest asteroid is the target', () => {
    const target = targetManager.selectTarget({id: 1, x: 0, y: 0, r: 50}, [], asteroids);

    const expectedTarget = new Target(Target.TARGET_ASTEROID, {id: 4, x: 120, y: 0, r: 40});
    expect(target).toEqual(expectedTarget);
  });
});

describe('Check target existance', () => {
  test('Target exists', () => {
    const target = new Target(Target.TARGET_ASTEROID, {id: 2, x: 0, y: 0, r: 50});
    const isTargetExists = targetManager.isTargetObjectExists(target, [], asteroids);

    expect(isTargetExists).toBeTruthy();
  });

  test('Target not exists', () => {
    const target = new Target(Target.TARGET_ASTEROID, {id: 100500, x: 0, y: 0, r: 50});
    const isTargetExists = targetManager.isTargetObjectExists(target, [], asteroids);

    expect(isTargetExists).toBeFalsy();
  });
});
