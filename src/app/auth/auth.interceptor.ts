import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.auth.getToken();

        // Recomendado: no interceptar login
        const isLogin = req.url.includes('/api/auth/login');
        if (isLogin) return next.handle(req);

        if (!token) return next.handle(req);

        const authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });

        return next.handle(authReq);
    }
}
