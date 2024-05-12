import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService]
})


export class LoginComponent {

  login: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router, private Auth: LoginService) {

    this.login = fb.group({
      Email: ['', Validators.required],
      contraseña: ['', Validators.required]
    })

  }

  async onLogin(login: any) {
    try {
      const user = await (await this.Auth.LoginAlumno(login)).subscribe(response => {
        console.log(response)
        if (user) {
          Swal.fire({
            icon: 'success',
            title: 'Yes!',
            text: 'Login exitoso!',
          })
          this.router.navigate(['/']);
        }
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error!',
      })
    }
  }

}
