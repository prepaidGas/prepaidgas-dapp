export function randNum(min: number, max: number): number {
  return Math.round(min + Math.random() * (max - min))
}

export function randOpt(mod = 0): boolean {
  return Math.random() > 0.5 + mod
}
