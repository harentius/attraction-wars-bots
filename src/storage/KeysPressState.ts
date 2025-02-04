class KeysPressState {
  public up: boolean;
  public down: boolean;
  public left: boolean;
  public right: boolean;
  public space: boolean;

  constructor({ up = false, down = false, left = false, right = false, space = false } = {}) {
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    this.space = space;
  }

  public isEqual(keysPressState: KeysPressState) {
    for (const [key, value] of Object.entries(this)) {
      if (value !== keysPressState[key]) {
        return false;
      }
    }

    return true;
  }
}

export default KeysPressState;
