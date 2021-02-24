import { initAuthToken } from '../../app/auth/service/get-auth-token';

export class AuthProvider {
  public enable(): void {
    initAuthToken();
  }
}
