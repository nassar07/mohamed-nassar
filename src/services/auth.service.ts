class AuthService {
  private TOKEN_KEY = 'auth_token';

  login(username: string, password: string): boolean {
    // Simulated authentication - replace with real API call
    if (username === 'admin' && password === 'Aa123456') {
      const token = 'mock_jwt_token_' + Date.now();
      localStorage.setItem(this.TOKEN_KEY, token);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}

export const authService = new AuthService();
