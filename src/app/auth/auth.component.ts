import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  loginMode: boolean = false;
  isLoading: boolean = false;
  error: string = null;
  storeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    // let authObservable: Observable<AuthResponseData>;

    if (this.loginMode) {
      // authObservable = this.authService.login(email, password);
      this.store.dispatch(
        new authActions.LoginStart({ email: email, password: password })
      );
    } else {
      // authObservable = this.authService.signUp(email, password);
      this.store.dispatch(
        new authActions.SignupStart({ email: email, password: password })
      );
    }

    // authObservable.subscribe({
    //   next: (res) => {
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   error: (errorMsg) => {
    //     this.error = errorMsg;
    //     this.isLoading = false;
    //   },
    // });

    form.reset();
  }

  onCloseModal() {
    this.store.dispatch(new authActions.ClearError());
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
