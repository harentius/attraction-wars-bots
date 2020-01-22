const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';

const config: {
  serverUrl: string,
  visibilityRadius: number,
  tickInterval: number,
  botManagerInterval: number,
  minDistanceToDangerObject: number,
  ticksBeforeChangeDirection: number,
  minPlayers: number,
  maxPlayers: number,
  // Max relative to world width size
  tooBigMultiplier: number,
  borderMarginRadiusMultiplier: number,
} = {
  serverUrl,
  visibilityRadius: 400,
  tickInterval: 500,
  botManagerInterval: 5000,
  minDistanceToDangerObject: 50,
  ticksBeforeChangeDirection: 500,
  minPlayers: 5,
  maxPlayers: 18,
  tooBigMultiplier: 1.0 / 60.0,
  borderMarginRadiusMultiplier: 2,
};

export default config;
