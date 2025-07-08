import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regist-form',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './regist-form.component.html',
  styleUrl: './regist-form.component.css'
})
export class RegistFormComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    //Inicializar el formulario con validaciones
    this.registerForm = this.fb.nonNullable.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    }, { validators: this.passwordMatchValidator });
  }

  //Validador
  passwordMatchValidator(control: AbstractControl): {[key: string]: boolean } | null {
    const group = control as FormGroup
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : {passwordsMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { fullName, email, password } = this.registerForm.value;
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const exist = users.find((u: any) => u.email === email);
      if (exist) {
        alert ('El usuario ya existe.');
        return
      }

      users.push({ fullName, email, password });
      localStorage.setItem('users', JSON.stringify(users));

      alert('registro exitoso');
      this.registerForm.reset();

      //Redirir a la pagina de inicial sesion
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);

    } else {
      this.registerForm.markAllAsTouched();
      alert('Por favor, complete el formulario correctamente');
    }
  }

}
