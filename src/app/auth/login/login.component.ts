import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = '';
    password = '';
    error: string | null = null;

    constructor(private auth: AuthService, private router: Router) { }

    onSubmit() {
        this.error = null;

        this.auth.login(this.username, this.password).subscribe({
            next: () => this.router.navigate(['/tareas']),
            error: () => this.error = 'Credenciales inválidas'
        });
    }
}
