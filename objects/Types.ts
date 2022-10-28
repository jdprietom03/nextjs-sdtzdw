export interface Localidad {
  Id_localidad?: Number;
  Calles?: Number[];
  Carreras?: Number[];
}

export interface Zona {
  Id_zona?: Number;
  Calles?: Number[];
  Carreras?: Number[];
  Factores_riesgo?: String[];
}

export interface Residencia {
  Id_residencia?: Number;
  Direccion?: String;
}

export interface Escuela {
  Id_escuela?: Number;
  Direccion?: String;
}

export interface Estudiante {
  Edad?: Number;
  Sexo?: String;
  Genero?: String;
  Etnia?: String;
  Id_residencia?: Number;
  Id_escuela?: Number;
  Jornada_Escolar?: String;
  Porcentaje_ausencias?: Number;
  Disciplina?: String;
  Relaciones_interpersonales?: String;
  Presencia_parental?: String;
}

export interface DataParams {
  numeroLocalidades: number;
  numeroZonas: number;
  numeroResidencias: number;
  numeroEscuelas: number;
  numeroEstudiantes: number;
}
