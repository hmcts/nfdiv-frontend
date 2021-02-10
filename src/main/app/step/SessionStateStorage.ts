import autobind from 'autobind-decorator';

import { AppSession } from '../controller/AppRequest';

import { SessionState, StepStateStorage } from './StepStateStorage';

@autobind
export class SessionStateStorage implements StepStateStorage {
  constructor(private readonly session: AppSession) {}

  public getCurrentState(): SessionState {
    return this.session.state;
  }

  public async store(state: SessionState): Promise<void> {
    Object.assign(this.session.state, state);
    await new Promise((resolve, reject) => this.session.save(err => (err ? reject(err) : resolve(true))));
  }
}
