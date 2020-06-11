import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Solicitud } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  formaSol: FormGroup;
  titulo: string;
  info: string;

  constructor(
    private _route: ActivatedRoute,
    private _solService: SolicitudService,
    private router: Router
  ) { }

  ngOnInit() {
    const par = this._route.snapshot.paramMap.get('par');

    this.infoTipo(par);

    this.formaSol = new FormGroup({

      nombre: new FormControl(null, Validators.required),
      razon: new FormControl(null, Validators.required),
      ruc: new FormControl(null, Validators.required),
      representante: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      foto: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required)
    });
  }
  
  public enviarSolicitud(){

    if(this.formaSol.invalid){
      return;
    }

    let solicitud = new Solicitud (
      this.formaSol.value.nombre,
      this.formaSol.value.razonSocial,
      this.formaSol.value.ruc,
      this.formaSol.value.representante,
      this.formaSol.value.telefono,
      this.formaSol.value.direccion,
      this.formaSol.value.email,
      this.formaSol.value.foto,
      this.titulo,
      this.formaSol.value.descripcion
    );

    this._solService.enviarSol(solicitud)
          .subscribe(resp => 
            console.log('Pronto enviaremos tu respuesta'));

    // this._solService.modificarImg(solicitud)
    //       .subscribe(resp => console.log('Actualizo') );

  }

  infoTipo(tipo: string){
    if (tipo === 'delivery') {
      this.titulo = 'Delivery';
      this.info = 'Bee es la mejor elección para que tu negocio realice deliverys (pedidos a domicilio)' + 
                  'y entregas en tu local programadas, todo esto de una manera fácil, rápida y segura. '+
                  'Se parte de la comunidad Bee y accede a un montón de beneficios pensados para ti.';
    } else if (tipo === 'taxi') {
      this.titulo = 'Taxi';
      this.info = 'Inscríbete como taxi legal a Bee, consigue carreras e incrementa tus ingresos de una ' +
                  'forma rápida, fácil y segura. Al mismo tiempo accede a un sinfín de beneficios para '+
                  'tu taxi.';
    } else if (tipo === 'evento') {
      this.titulo = 'Organizador de eventos';
      this.info = 'Crea, promociona y vende tu evento a nuestra comunidad Bee, de una manera práctica, '+
                  'segura y eficiente.';
    } else if (tipo === 'reservas') {
      this.titulo = 'Reservas';
      this.info = 'Incrementa tus ganancias y productividad con nuestro servicio de reservas Bee para tu negocio';
    }
  }
}
