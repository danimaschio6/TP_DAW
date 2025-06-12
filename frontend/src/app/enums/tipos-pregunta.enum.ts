export enum TiposRespuestaEnum {
  ABIERTA = 'ABIERTA',
  OPCION_MULTIPLE_SELECCION_SIMPLE = 'OPCION_MULTIPLE_SELECCION_SIMPLE',
  OPCION_MULTIPLE_SELECCION_MULTIPLE = 'OPCION_MULTIPLE_SELECCION_MULTIPLE',
  VERDADERO_FALSO = 'VERDADERO_FALSO',
}

export const tiposPreguntaPresentacion: {
  tipo: TiposRespuestaEnum;
  presentacion: string;
}[] = [
  { tipo: TiposRespuestaEnum.ABIERTA, presentacion: 'Abierta' },
  {
    tipo: TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE,
    presentacion: 'Selección Simple',
  },
  {
    tipo: TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE,
    presentacion: 'Selección Múltiple',
  },
  { tipo: TiposRespuestaEnum.VERDADERO_FALSO, presentacion: 'Verdadero/Falso' }
];