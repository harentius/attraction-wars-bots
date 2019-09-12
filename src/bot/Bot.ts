import { Storage, Client } from 'attraction-wars-client-storage';
import config from '../config';
import KeysPressState from '../storage/KeysPressState';
import isCirclesIntersect from '../utils/isCirclesIntersect';
import calculateDistance from '../utils/calculateDistance';
import Circle from '../storage/Circle';

class Bot {
  private readonly name: string;
  private readonly client: Client;
  private readonly storage: Storage;
  private keyPressState: KeysPressState;

  constructor(name: string, client: Client, storage: Storage) {
    this.name = name;
    this.client = client;
    this.storage = storage;
    this.keyPressState = new KeysPressState();
  }

  public login(): void {
    this.client.login(this.name);
  }

  public triggerLeft(isPress: boolean = true): void {
    this.triggerArrowKey('left', isPress);
  }

  public triggerRight(isPress: boolean = true): void {
    this.triggerArrowKey('right', isPress);
  }

  public triggerUp(isPress: boolean = true): void {
    this.triggerArrowKey('up', isPress);
  }

  public triggerDown(isPress: boolean = true): void {
    this.triggerArrowKey('down', isPress);
  }

  public triggerSpace(): void {
    const keyPressState = this.keyPressState.clone();
    keyPressState.space = true;
    this.client.sendKeysPressState(keyPressState);
    keyPressState.space = false;
    this.client.sendKeysPressState(keyPressState);
  }

  public getVisibleAsteroids(): Circle[] {
    return this.filterVisibleObjects(this.storage.worldData.asteroidsData);
  }

  public getVisiblePlayers(): Circle[] {
    return this.filterVisibleObjects(this.storage.worldData.playersData);
  }

  public getPlayerData(): Circle {
    return this.storage.playerData;
  }

  private triggerArrowKey(name: string, isPress: boolean): void {
    const keyPressState = this.keyPressState.clone();
    keyPressState[name] = isPress;
    this.updateKeyPressState(keyPressState);
  }

  private updateKeyPressState(keyPressState: KeysPressState): void {
    if (!this.keyPressState.isEqual(keyPressState)) {
      this.keyPressState = keyPressState;
      this.client.sendKeysPressState(keyPressState);
    }
  }

  private filterVisibleObjects(data): Circle[] {
    const horizon = this.getVisibilityArea();

    return Object.values(data)
      .filter((v: any) => {
        return isCirclesIntersect(horizon, v);
      })
      .sort((v1, v2) => {
        const d1 = calculateDistance(horizon, v1);
        const d2 = calculateDistance(horizon, v2);

        return d1 < d2 ? 1 : -1;
      }) as Circle[]
    ;
  }

  private getVisibilityArea(): Circle {
    return {
      x: this.storage.playerData.x,
      y: this.storage.playerData.y,
      r: this.storage.playerData.r + config.visibilityRadius,
    };
  }
}

export default Bot;
