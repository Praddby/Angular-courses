import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../models/user';

interface ResponseUser {
  result: User;
  successful: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUser(): Observable<User> {
    return this.http
      .get<ResponseUser>('http://localhost:3000/users/me')
      .pipe(map((response) => response.result));
  }
}
