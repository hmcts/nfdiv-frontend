import { initFees } from '../../app/fees/service/get-fee';

export class FeesRegister {
  public enable(): void {
    initFees();
  }
}
