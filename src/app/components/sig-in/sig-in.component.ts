import { Registro } from './../../interfaces/registro';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Router } from '@angular/router';
import { RegistroService } from '../services/registro.service';


@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrl: './sig-in.component.css',
  providers: [RegistroService]
})



export class SigInComponent {

  registro: FormGroup = new FormGroup({});

  constructor (private fb: FormBuilder, private router: Router, private Auth: RegistroService){

      this.registro = fb.group({
          idAlumno: ['0'],
          Nombre: ['', [Validators.required]],
          ApellidoPaterno: ['', [Validators.required]],
          ApellidoMaterno: ['', [Validators.required]],
          Curp: ['', [Validators.required, Validators.minLength(18)]],
          Genero: ['', [Validators.required]],
          EstadoCivil: ['', [Validators.required]],
          Estado: ['', [Validators.required]],
          Municipio: ['', [Validators.required]],
          Colonia: ['', [Validators.required]],
          Direccion: ['', [Validators.required]],
          Telefono: ['', [Validators.required]],
          Email: ['', [Validators.required, Validators.email]],
          FechaNacimiento: ['', [Validators.required]],
          idDependencia: [0],
          idCarrera: [0],
          matricula: ['', [Validators.required]],
          contraseña: ['', [Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16)
          ]],
          salt:['']

      })

  }

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }


  async onRegister(registro: any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Confirmación de registro',
      text: "Al continuar con el registro estas aceptando que estas de acuerdo con nuestras politicas de privacidad",
      footer: '<a href="/Politicas" target="_blank">Ver Politicas</a>',
      icon: 'warning',
      confirmButtonText: 'He leido y acepto las politicas de privacidad',
      cancelButtonText: 'No estoy de acuerdo!',
      showCancelButton: true,
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const user = await (await this.Auth.RegistroAlumno(registro)).subscribe(response=>{
            console.log(response)
            if(user) {
              Swal.fire({
                icon: 'success',
                title: 'Yes!',
                text: 'Registro exitoso!',
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
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'error'
        )
      }
    })

  }



  cancel(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-success'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro de terminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Terminar registro!',
      cancelButtonText: 'Continuar con el registro!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'El proceso de registro ha sido cancelado.',
          'success'
        )
        this.router.navigate(['']);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Por favor, continue con el registro.',
          'error'
        )
      }
    })
  }

  get f(){
    return this.registro.controls;
  }
}
