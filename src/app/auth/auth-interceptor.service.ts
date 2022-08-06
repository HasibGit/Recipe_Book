import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { take, exhaustMap, Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     if (!user) {
    //       next.handle(req);
    //     }
    //     const modifiedReq = req.clone({
    //       params: new HttpParams().set('auth', user ? user.token : null),
    //     });
    //     return next.handle(modifiedReq);
    //   })
    // );

    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      exhaustMap((user) => {
        if (!user) {
          next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user ? user.token : null),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
