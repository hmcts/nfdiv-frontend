import { initAuthToken } from '../../app/auth/service/get-service-auth-token.js';

export class AuthProvider {
  public enable(): void {
    void initAuthToken().catch(() => undefined);
  }
}
