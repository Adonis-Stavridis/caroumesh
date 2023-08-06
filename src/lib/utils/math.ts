export const modulo = (left: number, right: number) =>
  ((left % right) + right) % right;

export const normalizedSCurve = (x: number) => (Math.tanh(6.5 * x - 2) + 1) / 2;
