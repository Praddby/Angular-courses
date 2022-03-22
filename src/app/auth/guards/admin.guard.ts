import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserStateFacade } from '../../store/user/user.facade';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  public constructor(private userStateFacade: UserStateFacade, private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const toCourses: UrlTree = this.router.parseUrl('/courses');

    return this.userStateFacade.isAdmin$.pipe(
      map((isAuth: boolean) => (isAuth ? true : toCourses)),
    );
  }
}
