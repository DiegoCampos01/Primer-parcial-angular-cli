import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Universidad Patito</mat-card-title>
          <mat-card-subtitle>Iniciar Sesión</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="credentials-info">
              <p>Credenciales de prueba:</p>
              <p>Email: profesor&#64;universidad.com</p>
              <p>Contraseña: 123456</p>
            </div>
            <mat-form-field appearance="fill">
              <mat-label>Correo Electrónico</mat-label>
              <input matInput formControlName="email" type="email">
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                El correo es requerido
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Ingrese un correo válido
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Contraseña</mat-label>
              <input matInput formControlName="password" type="password">
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                La contraseña es requerida
              </mat-error>
            </mat-form-field>
            <div *ngIf="error" class="error-message">
              {{error}}
            </div>
            <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid">
              Iniciar Sesión
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #673ab7;
    }
    mat-card {
      max-width: 400px;
      width: 90%;
      padding: 20px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .credentials-info {
      background-color: #e3f2fd;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 16px;
    }
    .credentials-info p {
      margin: 5px 0;
      font-size: 14px;
    }
    .error-message {
      color: #f44336;
      font-size: 14px;
      margin-top: -8px;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      if (this.authService.login(email, password)) {
        this.router.navigate(['/alumnos']);
      } else {
        this.error = 'Credenciales incorrectas';
      }
    }
  }
} 