import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket
  ) { 
    this.checkStatus();
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

    //this.emit('getSolicitud', {nombre: 'Christian Pillaga', email: 'cpillaga@hotmail.com'});
  }

  emit(evento: string, payload?: any, callback?: Function ){
    this.socket.emit(evento, payload, callback);
    console.log('Envio solicitud socket');
  }
}
