class Direction {
  // Value is angle in radians
  public static DIRECTION_RIGHT = 0;
  public static DIRECTION_TOP_RIGHT = Math.PI / 4;
  public static DIRECTION_TOP = Math.PI / 2;
  public static DIRECTION_TOP_LEFT = 3 / 4 * Math.PI;
  public static DIRECTION_LEFT = Math.PI;
  public static DIRECTION_DOWN_LEFT = 5 / 4 * Math.PI;
  public static DIRECTION_DOWN = 3 / 2 * Math.PI;
  public static DIRECTION_DOWN_RIGHT = 7 / 4 * Math.PI;

  public direction: number;

  public getPossibleDirections(): number[] {
    return [
      Direction.DIRECTION_RIGHT,
      Direction.DIRECTION_TOP_RIGHT,
      Direction.DIRECTION_TOP,
      Direction.DIRECTION_TOP_LEFT,
      Direction.DIRECTION_LEFT,
      Direction.DIRECTION_DOWN_LEFT,
      Direction.DIRECTION_DOWN,
      Direction.DIRECTION_DOWN_RIGHT,
    ];
  }
}

export default Direction;
