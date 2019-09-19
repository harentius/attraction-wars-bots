// Canonical Line equation: y = a*x + b
// Or x = const (if not canonical)
interface Line {
  a: number;
  b: number;
  x: number | null;
}

export default Line;
