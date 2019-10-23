const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';

const config: {
  serverUrl: string,
  visibilityRadius: number,
  tickInterval: number,
  minDistanceToDangerObject: number,
} = {
  serverUrl,
  visibilityRadius: 400,
  tickInterval: 15,
  minDistanceToDangerObject: 10,
};

export default config;
