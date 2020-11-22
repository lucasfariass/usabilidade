import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });
  }

  logar() {
    Object.keys(this.form.controls).forEach(ctrl => {
      this.form.get(ctrl).updateValueAndValidity();
    });
    if (this.form.valid) {
      const { email, password } = this.form.controls;
      const login = this.authService.login(email.value, password.value);
      if (login) {
        this.toastrService.success('Login realizado com sucesso');
        this.router.navigate(['/public/home']);
      } else {
        this.toastrService.error('Usuário não encontrado');
      }
    }
  }

}
