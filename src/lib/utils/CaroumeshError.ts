export class CaroumeshError extends Error {
  constructor(location: string, message: string) {
    super(`Caroumesh@${location}: ${message}`);
  }
}
