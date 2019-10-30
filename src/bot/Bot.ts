import { Storage, Client } from 'attraction-wars-client-storage';
import KeysPressState from '../storage/KeysPressState';
import isCirclesIntersect from '../math-utils/isCirclesIntersect';
import calculateCirclesDistance from '../math-utils/calculateCirclesDistance';
import GameObject from '../storage/GameObject';
import Circle from '../math-utils/types/Circle';

class Bot {
  private readonly name: string;
  private readonly client: Client;
  private readonly storage: Storage;
  private keyPressState: KeysPressState;
  private readonly visibilityRadius: number;

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

  public logout(): void {
    this.client.logout();
  }

  public getVisibleAsteroids(): GameObject[] {
    return this.filterVisibleObjects(this.storage.worldData.asteroidsData);
  }

  public getVisiblePlayers(): GameObject[] {
    return this.filterVisibleObjects(this.storage.worldData.playersData)
      .filter((v) => v.id !== this.getPlayerData().id)
    ;
  }

  public getPlayerData(): GameObject {
    return this.storage.playerData;
  }

  public getWorldData(): any {
    return this.storage.worldData;
  }

  public setKeyPressState(keyPressState: KeysPressState): void {
    if (!this.client.isConnected()) {
      return;
    }

    if (!this.keyPressState.isEqual(keyPressState)) {
      this.keyPressState = keyPressState;
      this.client.sendKeysPressState(keyPressState);
    }
  }

  private filterVisibleObjects(data: {[key: string]: GameObject}): GameObject[] {
    const visibilityArea = this.getVisibilityArea();

    return  Object.values(data)
      .filter((v: any) => {
        return isCirclesIntersect(visibilityArea, v);
      })
      .sort((v1, v2) => {
        const d1 = calculateCirclesDistance(this.storage.playerData, v1);
        const d2 = calculateCirclesDistance(this.storage.playerData, v2);

        return d1 > d2 ? 1 : -1;
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
