import GameObject from '../../../storage/GameObject';

class Target {
  public static TARGET_ASTEROID = 0;
  public static TARGET_PLAYER = 1;
  public static TARGET_POINT = 2;

  public readonly type: number;
  public readonly gameObject: GameObject;

  public constructor(type: number, gameObject: GameObject) {
    this.type = type;
    this.gameObject = gameObject;
  }
}

export default Target;
