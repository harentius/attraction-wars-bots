import config from './config';
import TargetManager from './bot/AI/Target/TargetManager';
import DirectionManager from './bot/AI/Direction/DirectionManager';
import KeysPressStateFactory from './bot/AI/KeysPressStateFactory';
import DangerObjectManager from './bot/AI/Direction/DangerObjectManager';
import BotAIFactory from './bot/AI/BotAIFactory';
import BotAIManager from './bot/AI/BotAIManager';

const targetManager = new TargetManager(config.borderMarginRadiusMultiplier);
const dangerObjectManager = new DangerObjectManager(config.minDistanceToDangerObject);
const directionManager = new DirectionManager(config.visibilityRadius, dangerObjectManager);
const keyPressStateFactory = new KeysPressStateFactory();
const botAIFactory = new BotAIFactory(
  targetManager,
  directionManager,
  keyPressStateFactory,
  config.serverUrl,
  config.visibilityRadius,
  config.ticksBeforeChangeDirection,
  config.tooBigMultiplier,
  config.borderMarginRadiusMultiplier,
);
const botAIManager = new BotAIManager(
  botAIFactory,
  config.tickInterval,
  config.botManagerInterval,
  config.minPlayers,
  config.maxPlayers,
);

botAIManager.startLoop();
