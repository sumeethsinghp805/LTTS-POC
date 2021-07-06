import { HttpEvent, HttpHandler,HttpInterceptor,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpsInterceptorService implements HttpInterceptor {

  timeout=10000;
  constructor() { }

  intercept(request:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>
  {
    let updatedRequest:HttpRequest<any>;
    clearTimeout(this.timeout);
    updatedRequest = request.clone({
        url: this.updateURL(request.url)
    });

    return next.handle(updatedRequest);
  }

  updateURL(req: string)
  {
      return ((req.split('/')[0]!='assets' && req.split('/')[0].indexOf('http') == -1?location.origin+'/':'') + req);
  }

}
