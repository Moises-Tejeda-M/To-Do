import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recover',
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.css'
})
export class RecoverComponent {
  forgotForm: FormGroup;
  submitted = false;
  emailSent = false;

  constructor(private fb: FormBuilder) {
    this.forgotForm = this.fb.group({
      email:['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.emailSent = false;

    if (this.forgotForm.invalid) {
      return;
    }
  //Vericamos si el correo existe en el localStorage
    const email = this.forgotForm.value.email;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: any) => u.email === email);

    if (userExists) {
      console.log('Enviando enlace a:', email);
    this.emailSent = true;

    } else {
      this.forgotForm.controls['email'].setErrors({notFound: true});
    } 

  }
  clearMessage() {
    this.emailSent = false;
  }

}
