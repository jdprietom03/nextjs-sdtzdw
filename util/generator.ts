import {
  Localidad,
  Zona,
  Escuela,
  Residencia,
  Estudiante,
  DataParams,
} from './../objects/Types';

let ID_LOCALIDAD = 1;
let ID_ZONA = 1;
let ID_ESCUELA = 1;
let ID_RESIDENCIA = 1;

let BEGIN_LOCALIDAD = 1;
const LOCALIDAD_RANGE = 10;

let BEGIN_ZONA_HORIZONTAL = 1;
let BEGIN_ZONA_VERTICAL = 1;
const ZONA_RANGE = 1;

const localidades = [];
const zonas = [];
const residencias = [];
const escuelas = [];
const estudiantes = [];

const AVAILABLE_ZONES = [];
const AVAILABLE_SCHOOLS = [];
const AVAILABLE_RESIDENCES = [];

const getLocalidad = (): Localidad => {
  const localidad: Localidad = {};

  localidad.Id_localidad = ID_LOCALIDAD++;
  localidad.Calles = [1, LOCALIDAD_RANGE];
  localidad.Carreras = [BEGIN_LOCALIDAD, BEGIN_LOCALIDAD + LOCALIDAD_RANGE];

  BEGIN_LOCALIDAD += LOCALIDAD_RANGE;

  localidades.push(localidad);

  return localidad;
};

const getZona = (): Zona => {
  const zona: Zona = {};

  zona.Id_zona = ID_ZONA++;

  zona.Calles = [BEGIN_ZONA_HORIZONTAL, BEGIN_ZONA_HORIZONTAL + 1];
  zona.Carreras = [BEGIN_ZONA_VERTICAL, BEGIN_ZONA_VERTICAL++ + ZONA_RANGE];
  zona.Factores_riesgo = getRandomFactorRiesgo();

  BEGIN_ZONA_VERTICAL =
    BEGIN_ZONA_VERTICAL == BEGIN_LOCALIDAD
      ? 1 && BEGIN_ZONA_HORIZONTAL++
      : BEGIN_ZONA_VERTICAL;

  zonas.push(zona);
  AVAILABLE_ZONES.push(zona);

  return zona;
};

const getEscuela = (): Escuela => {
  const escuela: Escuela = {};
  escuela.Id_escuela = ID_ESCUELA++;
  escuela.Direccion = getAddress(getRandomizeZone());

  escuelas.push(escuela);
  AVAILABLE_SCHOOLS.push(escuela);

  return escuela;
};

const getResidencia = (): Residencia => {
  const residencia: Residencia = {};
  residencia.Id_residencia = ID_RESIDENCIA++;
  residencia.Direccion = getAddress(getRandomizeZone());

  residencias.push(residencia);
  AVAILABLE_RESIDENCES.push(residencia);

  return residencia;
};

const getRandomizeZone = (): Zona => {
  AVAILABLE_ZONES.push(AVAILABLE_ZONES[0]);
  return AVAILABLE_ZONES.shift();
};

const getAddress = (zone: Zona): string => {
  const COD_SECTOR = Math.round(Math.random() * 2);
  const sector = COD_SECTOR == 1 ? 'Calle' : 'Carrera';
  const numeroSector = COD_SECTOR == 0 ? zone.Calles[0] : zone.Carreras[0];
  const numeral = COD_SECTOR != 0 ? zone.Calles[0] : zone.Carreras[0];

  return `${sector} ${numeroSector} # ${numeral} - ${
    Math.round(Math.random() * 10) + 1
  }`;
};

const randomizeZones = () => {
  for (let i = zonas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [AVAILABLE_ZONES[i], AVAILABLE_ZONES[j]] = [
      AVAILABLE_ZONES[j],
      AVAILABLE_ZONES[i],
    ];
  }
};

const getRandomFactorRiesgo = (): String[] => {
  const code = Math.round(Math.round(Math.random() * 60) / 10);
  const options = ['P', 'M', 'PR', 'HC', 'HS', 'GAML', 'N'];
  const ans: String[] = [];

  return [options[code]];
};

const getRandomSex = (): string => {
  const id = Math.round(Math.random() * 2) == 1 ? 0 : 1;
  const options = ['Masculino', 'Femenino'];

  return options[id];
};

const getRandomGender = (): string => {
  const code = Math.round(Math.round(Math.random() * 30) / 10);
  const options = ['Heterosexual', 'Homosexual', 'No binario'];

  return options[code];
};

const getRandomDisciplina = (): string => {
  const code = Math.round(Math.round(Math.random() * 40) / 10);
  const options = ['D', 'F', 'A', 'O'];

  return options[code];
};

const getRandomSchool = (): Escuela => {
  AVAILABLE_SCHOOLS.push(AVAILABLE_SCHOOLS[0]);
  return AVAILABLE_SCHOOLS.shift();
};

const getRandomResidence = (): Residencia => {
  AVAILABLE_RESIDENCES.push(AVAILABLE_RESIDENCES[0]);
  return AVAILABLE_RESIDENCES.shift();
};

const getEstudiante = (): Estudiante => {
  const estudiante: Estudiante = {};
  estudiante.Edad = Math.round(Math.random() * 10) + 10;
  estudiante.Sexo = getRandomSex();
  estudiante.Genero = getRandomGender();
  estudiante.Etnia = Math.round(Math.random() * 2) == 1 ? 'Si' : 'No';
  estudiante.Id_residencia = getRandomResidence().Id_residencia;
  estudiante.Id_escuela = getRandomSchool().Id_escuela;
  estudiante.Porcentaje_ausencias = Math.round(Math.random() * 100) + 1;
  estudiante.Disciplina = getRandomDisciplina();
  estudiante.Relaciones_interpersonales = getRandomDisciplina();
  estudiante.Presencia_parental = getRandomDisciplina();

  estudiantes.push(estudiante);

  return estudiante;
};

export const getData = (data: DataParams) => {
  const {
    numeroLocalidades,
    numeroZonas,
    numeroEscuelas,
    numeroEstudiantes,
    numeroResidencias,
  } = data;

  for (let i = 0; i < numeroLocalidades; i++) getLocalidad();
  for (let i = 0; i < numeroZonas * numeroLocalidades; i++) getZona();

  randomizeZones();

  for (let i = 0; i < numeroEscuelas * numeroLocalidades; i++) getEscuela();
  for (let i = 0; i < numeroResidencias * numeroLocalidades; i++)
    getResidencia();

  for (let i = 0; i < numeroEstudiantes; i++) getEstudiante();

  return { localidades, zonas, escuelas, residencias, estudiantes };
};

export interface DataProps {
  localidades?: Localidad[];
  zonas?: Zona[];
  escuelas?: Escuela[];
  residencias?: Residencia[];
  estudiantes?: Estudiante[];
}
