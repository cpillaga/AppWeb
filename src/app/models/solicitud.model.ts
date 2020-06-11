export class Solicitud {
    constructor(
        public nombre: string,
        public razon: string,
        public ruc: string,
        public representante: string,
        public telefono: string,
        public direccion: string,
        public email: string,
        public foto: string,
        public tipo: string,
        public descripcion: string,
        public estado: string = 'pendiente',
        public observaciones?: string,
        public _id?: string
    ){}
  }