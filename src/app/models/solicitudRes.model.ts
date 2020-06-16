export class SolicitudRes {
    constructor(
        public ruc: string,
        public legalName: string,
        public legalAgent: string,
        public ciLegalAgent: string,
        public phone: string,
        public diaddressreccion: string,
        public email: string,
        public password: string,
        // public foto: string,
        // public descripcion: string,
        public _id?: string
    ){}
  }