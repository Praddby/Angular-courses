import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthStateFacade } from '../../store/auth/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class NotAuthorizedGuard implements CanActivate {
  public constructor(private authStateFacade: AuthStateFacade, private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const toCourses: UrlTree = this.router.parseUrl('/courses');

    return this.authStateFacade.isAuthorized$.pipe(
      map((isAuth: boolean) => (isAuth ? toCourses : true)),
    );
  }
}
