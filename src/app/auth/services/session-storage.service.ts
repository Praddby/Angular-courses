import { Injectable } from '@angular/core';
import { WindowRef } from '../../services/window-ref';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private SESSION_KEY = 'token';

  constructor(private winRef: WindowRef) {}

  public setToken(token: string): void {
    this.winRef.nativeWindow.sessionStorage.setItem(this.SESSION_KEY, token);
  }

  public getToken(): string {
    return this.winRef.nativeWindow.sessionStorage.getItem(this.SESSION_KEY);
  }

  public deleteToken(): void {
    this.winRef.nativeWindow.sessionStorage.removeItem(this.SESSION_KEY);
  }
}
