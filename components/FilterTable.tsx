import React, { useEffect, useState } from 'react';
import { useAppContext } from './../context/AppContextProvider';

const values = {
  genero: ['Heterosexual', 'Homosexual', 'No binario'],
  sexo: ['Masculino', 'Femenino'],
  etnia: ['Si', 'No'],
};

export default function FilterTable() {
  const { activeStudentFilters } = useAppContext();
  const [genero, setGenero] = useState('*');
  const [sexo, setSexo] = useState('*');
  const [edad, setEdad] = useState('*');
  const [etnia, setEtnia] = useState('*');

  const headers = ['Genero', 'Sexo', 'Edad', 'Etnia'];

  const handleFilters = () => {
    activeStudentFilters({
      genero,
      sexo,
      edad,
      etnia,
    });
  };

  return (
    <div className="table">
      <thead>
        <tr>
          {headers.map((el) => (
            <th>{el}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <select onChange={(evt) => setGenero(evt.target.value)}>
              {values.genero.map((el) => (
                <option value={el}>{el}</option>
              ))}
            </select>
          </td>
          <td>
            <select onChange={(evt) => setSexo(evt.target.value)}>
              {values.sexo.map((el) => (
                <option value={el}>{el}</option>
              ))}
            </select>
          </td>
          <td>
            <input type="number" min="0" /> to <input type="number" max="100" />
          </td>
          <td>
            <select onChange={(evt) => setEtnia(evt.target.value)}>
              {values.etnia.map((el) => (
                <option value={el}>{el}</option>
              ))}
            </select>
          </td>
        </tr>
        <button onClick={handleFilters}>Filtrar</button>
      </tbody>
    </div>
  );
}
