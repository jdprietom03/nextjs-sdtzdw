import React from 'react';
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

const proccessData = (estudiantes) => {
  const data = [];

  const counting = {};
  let superiorInterval = 0;

  estudiantes.forEach(
    (el) => (superiorInterval = Math.max(superiorInterval, el.Edad))
  );

  superiorInterval = Math.ceil(superiorInterval / 10) * 10;

  for (let i = 0; i < superiorInterval / 10; i++) counting[i] = 0;

  estudiantes.forEach((el) => counting[Math.floor(el.Edad / 10)]++);

  for (let i = 0; i < superiorInterval / 10; i++) {
    data.push([
      `${i * 10 + 1}-${i * 10 + 10}`,
      counting[i],
      counting[i] / estudiantes.length,
    ]);
  }

  return data;
};

const filterStudents = (estudiantes, filters) => {
  return estudiantes.filter((el) => {
    let toFilter = true;

    if (filters.length === 0) return true;

    toFilter &&= filters.Sexo === '*' || filters.Sexo === el.Sexo;
    toFilter &&= filters.Genero === '*' || filters.Genero === el.Genero;
    toFilter &&= filters.Etnia === '*' || filters.Etnia === el.Etnia;
    toFilter &&= filters.Edad === '*';

    return toFilter;
  });
};

export default function AgesTable() {
  const headers = [
    'Rango de Edad',
    'Numero de estudiantes',
    'Frecuencia Relativa',
  ];

  const { estudiantes, studentFilters } = useAppContext();

  const studentsFiltered = filterStudents(estudiantes, studentFilters);
  const data = proccessData(studentsFiltered);
  console.log(studentFilters);
  return (
    <div className="table">
      <TableHeaders {...{ headers }} />
      <TableBody {...{ data }} />
    </div>
  );
}
