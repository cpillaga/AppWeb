import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../conf/conf';
import { Solicitud } from '../models/solicitud.model';
import 'rxjs/add/operator/map';
import { WebSocketService } from './websocket.service';
import { SolicitudRes } from '../models/solicitudRes.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  responseStatus: number;

  constructor(
    private http: HttpClient,
    private socket: WebSocketService
  ) { }

  enviarSol(solicitud: Solicitud){
    const urlSolici = URL_SERVICE.url + '/solicitud';

    return this.http.post(urlSolici, solicitud)
                    .map( (resp: any) => {
                      this.socket.emit('getSolicitud', resp);
                      console.log('Termino proceso');
                    });
  }

  modificarImg(solicitud: Solicitud){
    const urlUpload = URL_SERVICE.url + `/upload/${ solicitud.tipo }/${ solicitud.ruc }`;
    console.log(urlUpload);
    return this.http.post(urlUpload, solicitud)
                  .map( (resp: any) => {
                    console.log('Se ha actualizado foto');
                    // return resp.solicitud;
                  });
  }

  enviarSolRes(solRes: SolicitudRes){
    const urlSolici = 'https://bee.com.ec/shop';

    return this.http.post(urlSolici, solRes, {observe: 'response'})
                    .map( (resp: any) => {
                      this.responseStatus = resp.status;
                      return this.responseStatus;
                    });
  }
}
