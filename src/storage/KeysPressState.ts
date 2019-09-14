class KeysPressState {
  // tslint:disable-next-line:variable-name
  private _up: boolean;
  // tslint:disable-next-line:variable-name
  private _down: boolean;
  // tslint:disable-next-line:variable-name
  private _left: boolean;
  // tslint:disable-next-line:variable-name
  private _right: boolean;
  // tslint:disable-next-line:variable-name
  private _space: boolean;

  get space(): boolean {
    return this._space;
  }

  set space(value: boolean) {
    this._space = value;
  }

  get right(): boolean {
    return this._right;
  }

  set right(value: boolean) {
    this._right = value;

    if (value) {
      this._left = false;
    }
  }

  get left(): boolean {
    return this._left;
  }

  set left(value: boolean) {
    this._left = value;

    if (value) {
      this._right = false;
    }
  }

  get down(): boolean {
    return this._down;
  }

  set down(value: boolean) {
    this._down = value;

    if (value) {
      this._up = false;
    }
  }

  get up(): boolean {
    return this._up;
  }

  set up(value: boolean) {
    this._up = value;

    if (value) {
      this._down = false;
    }
  }

  constructor({ up = false, down = false, left = false, right = false, space = false } = {}) {
    this._up = up;
    this._down = down;
    this._left = left;
    this._right = right;
    this._space = space;
  }

  public isEqual(keysPressState: KeysPressState) {
    for (const [key, value] of Object.entries(this)) {
      if (value !== keysPressState[key]) {
        return false;
      }
    }

    return true;
  }

  public clone(): KeysPressState {
    return new KeysPressState(this.toJSON());
  }

  public toJSON() {
    return {
      up: this._up,
      down: this._down,
      left: this._left,
      right: this._right,
      space: this._space,
    };
  }
}

export default KeysPressState;
