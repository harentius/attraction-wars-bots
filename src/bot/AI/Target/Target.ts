import GameObject from '../../../storage/GameObject';

class Target {
  public static TARGET_ASTEROID = 0;
  public static TARGET_PLAYER = 1;
  public static TARGET_POINT = 2;

  public readonly type: number;
  public readonly gameObject: GameObject;
  // tslint:disable-next-line:variable-name
  private _ticksMoved: number;

  public constructor(type: number, gameObject: GameObject) {
    this.type = type;
    this.gameObject = gameObject;
    this._ticksMoved = 0;
  }

  public increaseTickMoved() {
    this._ticksMoved++;
  }

  get ticksMoved(): number {
    return this._ticksMoved;
  }
}

export default Target;
