import { Injectable } from '@angular/core';
import { UsuarioModel } from './models/usuario.model';

@Injectable()
export class AuthService {

  usuarioLogado: UsuarioModel; 
  usuarios: UsuarioModel[] = [];

  constructor() { }

  criarUsuario(usuario: UsuarioModel) {
    this.usuarios.push(usuario);
    this.usuarioLogado = usuario;
  }

  getUsuario() {
    return this.usuarioLogado;
  }

  login(email: string, senha: string) {
    const usuario = this.usuarios.find(usuario => (usuario.email === email && usuario.senha === senha));
    if (usuario) {
      this.usuarioLogado = usuario;
      return true;
    }
    return false;
  }

  logout() {
    this.usuarioLogado = null;
  }
}
