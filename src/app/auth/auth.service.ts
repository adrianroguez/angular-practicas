import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthRequest, AuthResponse } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly TOKEN_KEY = 'token';
    private readonly API = 'http://localhost:8080/api/auth';

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        const body: AuthRequest = { username, password };

        return this.http.post<AuthResponse>(`${this.API}/login`, body).pipe(
            tap(res => {
                // Guardar el token al hacer login correctamente
                localStorage.setItem(this.TOKEN_KEY, res.token);
            })
        );
    }

    logout() {
        // Borrar el token (cerrar sesión)
        localStorage.removeItem(this.TOKEN_KEY);
    }

    getToken(): string | null {
        // Leer el token (si existe) para poder enviarlo en requests
        return localStorage.getItem(this.TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
