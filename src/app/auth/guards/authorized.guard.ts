import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthStateFacade } from '../../store/auth/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanLoad {
  public constructor(private authStateFacade: AuthStateFacade, private router: Router) {}

  public canLoad(
    route: Route,
    segments: UrlSegment[],
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const toLogin: UrlTree = this.router.parseUrl('/login');

    return this.authStateFacade.isAuthorized$.pipe(
      map((isAuth: boolean) => (isAuth ? true : toLogin)),
    );
  }
}
