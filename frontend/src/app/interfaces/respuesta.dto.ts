export interface RespuestaDTO {
  id: number;
  fechaCreacion: string;
  encuesta: {
    id: number;
    nombre: string;
    codigoRespuesta: string;
  };
  respuestasAbiertas: {
    id: number;
    texto: string;
    pregunta: {
      id: number;
      numero: number;
      texto: string;
      tipo: string;
    };
  }[];
  respuestasOpciones: {
    id: number;
    opcion: {
      id: number;
      texto: string;
      numero: number;
    };
  }[];
}