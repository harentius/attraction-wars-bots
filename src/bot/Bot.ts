import { Storage, Client } from 'attraction-wars-client-storage';
import KeysPressState from '../storage/KeysPressState';
import isCirclesIntersect from '../utils/isCirclesIntersect';
import calculateDistance from '../utils/calculateDistance';
import GameObject from '../storage/GameObject';
import Circle from '../storage/Circle';

class Bot {
  private readonly name: string;
  private readonly client: Client;
  private readonly storage: Storage;
  private keyPressState: KeysPressState;
  private visibilityRadius: number;

  constructor(name: string, client: Client, storage: Storage, visibilityRadius: number) {
    this.name = name;
    this.client = client;
    this.storage = storage;
    this.visibilityRadius = visibilityRadius;
    this.keyPressState = new KeysPressState();
  }

  public login(): void {
    this.client.login(this.name);
  }

  public moveLeft(isPress: boolean = true): void {
    this.triggerArrowKey('left', isPress);
  }

  public moveRight(isPress: boolean = true): void {
    this.triggerArrowKey('right', isPress);
  }

  public moveUp(isPress: boolean = true): void {
    this.triggerArrowKey('up', isPress);
  }

  public moveDown(isPress: boolean = true): void {
    this.triggerArrowKey('down', isPress);
  }

  public pressSpace(): void {
    const keyPressState = this.keyPressState.clone();
    keyPressState.space = true;
    this.client.sendKeysPressState(keyPressState);
    keyPressState.space = false;
    this.client.sendKeysPressState(keyPressState);
  }

  public stop() {
    this.updateKeyPressState(new KeysPressState());
  }

  public getVisibleAsteroids(): GameObject[] {
    return this.filterVisibleObjects(this.storage.worldData.asteroidsData);
  }

  public getVisiblePlayers(): GameObject[] {
    return this.filterVisibleObjects(this.storage.worldData.playersData);
  }

  public getPlayerData(): GameObject {
    return this.storage.playerData;
  }

  public getWorldData(): any {
    return this.storage.worldData;
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

  //TODO
  private filterVisibleObjects(data: {[key: string]: GameObject}): GameObject[] {
    const visibilityArea = this.getVisibilityArea();

    return Object.values(data)
      .filter((v: any) => {
        return isCirclesIntersect(visibilityArea, v);
      })
      .sort((v1, v2) => {
        const d1 = calculateDistance(visibilityArea, v1);
        const d2 = calculateDistance(visibilityArea, v2);

        return d1 < d2 ? 1 : -1;
      }) as GameObject[]
    ;
  }

  private getVisibilityArea(): Circle {
    return {
      x: this.storage.playerData.x,
      y: this.storage.playerData.y,
      r: this.storage.playerData.r + this.visibilityRadius,
    };
  }
}

export default Bot;
