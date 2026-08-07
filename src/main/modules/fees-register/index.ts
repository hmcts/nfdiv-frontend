import { initFees } from '../../app/fees/service/get-fee.js';

export class FeesRegister {
  public enable(): void {
    initFees();
  }
}
