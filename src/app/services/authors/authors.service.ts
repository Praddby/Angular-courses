import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author, RequestAuthor } from '../../models/author';

interface ResponseAuthors {
  result: Author[];
  successful: boolean;
}

interface ResponseAuthor {
  result: Author;
  successful: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<ResponseAuthors> {
    return this.http.get<ResponseAuthors>('http://localhost:3000/authors/all');
  }

  public addAuthor(author: RequestAuthor): Observable<ResponseAuthors> {
    return this.http.post<ResponseAuthors>('http://localhost:3000/authors/add', author);
  }

  public getAuthor(id: string): Observable<ResponseAuthor> {
    return this.http.get<ResponseAuthor>(`http://localhost:3000/authors/${id}`);
  }
}
