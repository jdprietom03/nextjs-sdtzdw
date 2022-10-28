import { Escuela, Localidad, Residencia, Zona } from '../objects/Types';
import { supabase } from './db';

export const getZonas = async () => {
  let { data: zona, error } = await supabase.from('zona').select('*');
  return zona;
};

export const getLocalidades = async () => {
  let { data: localidad, error } = await supabase.from('localidad').select('*');

  return localidad;
};

export const getResidencias = async () => {
  let { data: localidad, error } = await supabase
    .from('residencia')
    .select('*');

  return localidad;
};

export const getEscuelas = async () => {
  let { data: escuela, error } = await supabase.from('escuela').select('*');
  return escuela;
};

export const getEstudiantes = async () => {
  let { data: estudiante, error } = await supabase
    .from('estudiante')
    .select('*');

  return estudiante;
};

export const getEstudiantesWithResidencias = async () => {
  let { data: estudiante, error } = await supabase
    .from('estudiante')
    .select('residencia ( Id_residencia, Id_zona )');

  return estudiante;
};

export const getEstudiantesWithZones = async () => {
  let { data: estudiante, error } = await supabase
    .from('estudiante')
    .select('residencia ( Id_residencia, zona ( Id_zona, Factores_riesgo) )');

  return estudiante;
};

export const getZonesWithLocalidades = async () => {
  let { data: estudiante, error } = await supabase
    .from('localidad')
    .select('Id_localidad, zona (Id_localidad, Factores_riesgo)');

  return estudiante;
};
