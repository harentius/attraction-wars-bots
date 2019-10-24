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
} = {
  serverUrl,
  visibilityRadius: 400,
  tickInterval: 15,
  botManagerInterval: 5000,
  minDistanceToDangerObject: 15,
  ticksBeforeChangeDirection: 500,
  minPlayers: 5,
  maxPlayers: 30,
};

export default config;
