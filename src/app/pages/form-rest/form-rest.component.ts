import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { SolicitudRes } from '../../models/solicitudRes.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-rest',
  templateUrl: './form-rest.component.html'
})
export class FormRestComponent implements OnInit {
  formaRes: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _solService: SolicitudService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formaRes = new FormGroup({
      ruc: new FormControl(null, Validators.required),
      razonSoc: new FormControl(null, Validators.required),
      representante: new FormControl(null, Validators.required),
      ciR: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      // foto: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required)
    });
  }


  public enviarSolicitudRes(){

    if(this.formaRes.invalid){
      return;
    }

    let solicitudRes = new SolicitudRes (
      this.formaRes.value.ruc,
      this.formaRes.value.razonSoc,
      this.formaRes.value.representante,
      this.formaRes.value.ciR,
      this.formaRes.value.telefono,
      this.formaRes.value.direccion,
      this.formaRes.value.email,
      this.formaRes.value.password,
      this.formaRes.value.foto
    );

    this._solService.enviarSolRes(solicitudRes)
          .subscribe(resp => {
            if( resp === 200){
              Swal.fire({
                icon: 'success',
                title: 'Solicitud registrada',
                text: 'Pronto enviaremos una respuesta a ' + solicitudRes.email + ' y asi puedas ingresar a la plataforma',
                showCloseButton: true,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: "#ffbf00"
              });

              this.formaRes.reset();
            
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se ha podido procesar la solicitd',
                showConfirmButton: false,
                showCloseButton: true
              });
            }

            
          });
  }
}
