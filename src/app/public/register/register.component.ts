import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private toastrService: ToastrService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      cpf: [null, Validators.required],
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
      telefone: [null, Validators.required],
      cep: [null, Validators.required],
      numero: [null, Validators.required],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required]
    });
  }

  public salvar() {
    Object.keys(this.form.controls).forEach(ctrl => {
      this.form.get(ctrl).updateValueAndValidity();
    });
    if (this.form.valid) {
      this.authService.criarUsuario(this.form.getRawValue());
      this.toastrService.success('Cadastro realizado com sucesso');
      this.router.navigate(['/public/home']);
    }
  }

}
