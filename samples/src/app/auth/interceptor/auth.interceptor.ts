import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any{
      const idtoken = localStorage.getItem('token');

      if(idtoken){
        const cloned = req.clone({
          headers: req.headers.set("Authorization", idtoken)
        })

        return next.handle(cloned);
      }else{
        return next.handle(req);
      }
  }
}
