import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user';

interface ResponseAuth {
  result: string;
  successful: boolean;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(private http: HttpClient) {}

  public register(user: User): Observable<ResponseAuth> {
    return this.http.post<ResponseAuth>('http://localhost:3000/register', user);
  }

  public login(user: LoginData) {
    return this.http.post<ResponseAuth>('http://localhost:3000/login', user);
  }

  public logout(): Observable<void> {
    return this.http.delete<void>('http://localhost:3000/logout');
  }
}
