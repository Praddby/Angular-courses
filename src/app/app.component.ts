import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthStateFacade } from './store/auth/auth.facade';
import { UserStateFacade } from './store/user/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public isAuthorized$: Observable<boolean> = this.authStateFacade.isAuthorized$;

  public isAdmin$: Observable<boolean> = this.userStateFacade.isAdmin$;

  public userName$: Observable<string> = this.userStateFacade.name$;

  private subscribe: Subscription;

  public constructor(
    private authStateFacade: AuthStateFacade,
    private router: Router,
    private userStateFacade: UserStateFacade,
  ) {}

  public ngOnInit(): void {
    this.subscribe = this.authStateFacade.isAuthorized$.subscribe((isAuth) => {
      if (!isAuth) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  public logout() {
    this.authStateFacade.logout();
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
