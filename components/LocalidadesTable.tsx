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

const proccessData = (localidades) => {
  const data = [];
  const options = ['P', 'M', 'PR', 'HC', 'HS', 'GAML', 'N'];
  const counting = {};

  localidades.forEach((el) => {
    counting[el.Id_localidad] = {};
    options.forEach((item) => (counting[el.Id_localidad][item] = 0));
  });

  localidades.forEach((el) => {
    el.zona.forEach((item) => {
      counting[el.Id_localidad][item.Factores_riesgo[0]]++;
      console.log(counting);
    });
  });

  localidades.forEach((el) => {
    const counters = [];
    Object.values(counting[el.Id_localidad]).forEach((el) => counters.push(el));
    data.push([el.Id_localidad, ...counters]);
  });

  return data;
};

export default function LocalidadesTable() {
  const headers = ['Localidad', 'P', 'M', 'PR', 'HC', 'HS', 'GAML', 'N'];

  const [results, setResults] = useState([]);
  const { zonas } = useAppContext();

  useEffect(() => {
    fetch('./api/localidades')
      .then((data) => data.json())
      .then((res) => setResults(res));
  }, []);

  const data = proccessData(results);
  return (
    <div className="table">
      <TableHeaders {...{ headers }} />
      <TableBody {...{ data }} />
    </div>
  );
}
