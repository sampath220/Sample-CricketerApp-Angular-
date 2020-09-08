import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, timestamp } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor(private http: HttpClient) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const users: User[] = [
            { id: 1, email: 'sam@gmail.com', password: 'Sam@12345' }
        ];

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate - public
            if (request.url.endsWith('/login') && request.method === 'POST') {
                // let user = users.find(x => x.email === request.body.email);
                // if (user && user.password !== request.body.password) return error('email or password is incorrect');
                // if (!user) {
                //     user = { id: Date.now(), email: request.body.email, password: request.body.password }
                //     users.push(user);
                // }
                // return ok({
                //     id: user.id,
                //     email: user.email,
                //     token: `fake-jwt-token`
                // });
                this.http.get('http:localhost:3000/login?email=' + request.body.email).subscribe((res: User) => {
                    if (res && res.password !== request.body.password) return error('email or password is incorrect');
                    let user = res;
                    if (!user) {
                        this.http.post('http:localhost:3000/login', request.body).subscribe((response: User) => {
                            user = response;
                            return ok({
                                id: user.id,
                                email: user.email,
                                token: `fake-jwt-token`
                            });
                        })
                    }
                    return ok({
                        id: user.id,
                        email: user.email,
                        token: `fake-jwt-token`
                    });
                })
            }

            // get all users
            // if (request.url.endsWith('/users') && request.method === 'GET') {
            //     if (!isLoggedIn) return unauthorised();
            //     return ok(users);
            // }

            // pass through any requests not handled above
            if (request.url.includes('/cricketers') && request.method !== 'GET') {
                if (!isLoggedIn)
                    return unauthorised();
                return next.handle(request);
            }
            return next.handle(request);
        }))
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        // private helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};