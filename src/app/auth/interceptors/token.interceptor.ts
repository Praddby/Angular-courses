import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private sessionStorageService: SessionStorageService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${this.sessionStorageService.getToken()}`,
      },
    });

    return next.handle(request).pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse): ObservableInput<any> | never {
    if (error.status === 401) {
      this.sessionStorageService.deleteToken();
      this.router.navigate(['/login']);
      return EMPTY;
    } else {
      return throwError(error.error);
    }
  }
}
