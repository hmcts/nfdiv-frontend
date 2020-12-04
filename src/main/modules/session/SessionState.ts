export class SessionState {
  private readonly state: any = {
    'lp': {
      value: 'yes'
    }
  };

  public get() {
    return this.state;
  }

  public set(field: string, value: string): void {
    this.state[field].value = value;
    this.state[field].cb(value, this);
  }

  public remove(field: string): void {
    delete this.state[field];
  }

  public initialise(field: string, cb: any): void {
    this.state[field] = {
      value: '',
      cb: cb
    };
  }
}
