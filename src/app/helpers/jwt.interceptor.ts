import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { config } from '../config';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.jwtToken;
        const isApiUrl = request.url.startsWith(config.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.jwtToken}`,
                    // AccessControlAllowOrigin:'*', 
                    // AccessControlAllowMethods:'GET, POST, PUT, DELETE',
                    // AccessControlAllowHeaders: 'Origin, Content-Type, X-Auth-Token'
                }
            });
        }

        return next.handle(request);
    }
}