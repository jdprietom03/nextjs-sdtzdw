import React, { useEffect, useState } from 'react';
import { useAppContext } from './../context/AppContextProvider';

function TableHeaders(props) {
  const { headers } = props;
  return (
    <thead>
      <tr>
        {headers.map((header, key) => {
          return <th>{header}</th>;
        })}
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const { data } = props;
  return (
    <tbody>
      {data.map((row, key) => {
        return (
          <tr>
            {row.map((el) => (
              <td>{el}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

const proccessData = (estudiantes, zonas) => {
  const data = [];
  const options = ['P', 'M', 'PR', 'HC', 'HS', 'GAML', 'N'];
  const counting = {};

  options.forEach((el) => (counting[el] = 0));
  estudiantes.forEach(
    (el) => counting[el.residencia.zona.Factores_riesgo[0]]++
  );

  options.forEach((el) =>
    data.push([el, counting[el], counting[el] / estudiantes.length])
  );

  return data;
};

export default function ZonesTable() {
  const headers = [
    'Factor de riesgo',
    'Numero de estudiantes',
    'Frecuencia Relativa',
  ];

  const [results, setResults] = useState([]);
  const { zonas } = useAppContext();

  useEffect(() => {
    fetch('./api/factors')
      .then((data) => data.json())
      .then((res) => setResults(res));
  }, []);

  const data = proccessData(results, zonas);
  return (
    <div className="table">
      <TableHeaders {...{ headers }} />
      <TableBody {...{ data }} />
    </div>
  );
}
