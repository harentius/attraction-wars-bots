const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';

const config: {
  serverUrl: string,
  visibilityRadius: number,
  tickInterval: number,
  maxDangerDistance: number,
} = {
  serverUrl,
  visibilityRadius: 400,
  tickInterval: 100,
  maxDangerDistance: 50,
};

export default config;
