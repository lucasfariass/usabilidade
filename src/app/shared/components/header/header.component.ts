import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'ua-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  usuarioLogado() {
    return this.authService.getUsuario();
  }

  logout() {
    this.authService.logout();
    this.toastrService.success('Usuário desconectado');
  }

}
