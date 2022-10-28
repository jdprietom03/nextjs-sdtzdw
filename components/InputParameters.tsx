import React from 'react';
import styles from '../styles/Home.module.css';

export default function InputParameters({
  numeroLocalidades,
  numeroZonas,
  numeroEscuelas,
  numeroEstudiantes,
  numeroResidencias,
  setNumeroLocalidades,
  setNumeroZonas,
  setNumeroEscuelas,
  setNumeroEstudiantes,
  setNumeroResidencias,
}) {
  return (
    <>
      <div className={styles.container}>
        <label>
          Numero de Localidades:
          <input
            type="number"
            value={numeroLocalidades}
            onChange={(evt: any) =>
              setNumeroLocalidades(parseInt(evt.target.value))
            }
          />
        </label>
        <label>
          Numero de Zonas:
          <input
            type="number"
            value={numeroZonas}
            onChange={(evt: any) => setNumeroZonas(parseInt(evt.target.value))}
          />
        </label>
        <label>
          Numero de Residencias:
          <input
            type="number"
            value={numeroResidencias}
            onChange={(evt: any) =>
              setNumeroResidencias(parseInt(evt.target.value))
            }
          />
        </label>
        <label>
          Numero de Escuelas:
          <input
            type="number"
            value={numeroEscuelas}
            onChange={(evt: any) =>
              setNumeroEscuelas(parseInt(evt.target.value))
            }
          />
        </label>
        <label>
          Numero de Estudiantes:
          <input
            type="number"
            value={numeroEstudiantes}
            onChange={(evt: any) =>
              setNumeroEstudiantes(parseInt(evt.target.value))
            }
          />
        </label>
      </div>
    </>
  );
}
