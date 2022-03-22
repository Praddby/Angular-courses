import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthStateFacade } from '../../store/auth/auth.facade';
import { UserStateFacade } from '../../store/user/user.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;

  public constructor(
    private router: Router,
    private userStateFacade: UserStateFacade,
    private authStateFacade: AuthStateFacade,
  ) {}

  public ngOnInit(): void {
    this.subscribe = this.authStateFacade.isAuthorized$.subscribe((isAuth) => {
      if (isAuth) {
        this.userStateFacade.getCurrentUser();
        this.router.navigateByUrl('/courses');
      }
    });
  }

  public onSubmit(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.pass;
    this.authStateFacade.login({ email, password });
  }

  public ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
