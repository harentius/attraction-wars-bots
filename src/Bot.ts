import { Storage, Client } from 'attraction-wars-client-storage';
import KeysPressState from './KeysPressState';

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

  private triggerArrowKey(name: string, isPress: boolean) {
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

  private getVisibleAbsorbableAsteroids() {
    // TODO
  }

  private getVisibleAbsorbablePlayers() {
    // TODO
  }
}

export default Bot;
