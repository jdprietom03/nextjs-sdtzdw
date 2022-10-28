import {
  createContext,
  useMemo,
  useContext,
  useState,
  cloneElement,
  useEffect,
} from 'react';
import {
  getLocalidades,
  getResidencias,
  getZonas,
  getEscuelas,
  getEstudiantes,
} from '../lib/connection';
import { DataParams } from '../objects/Types';

import { getData, DataProps } from './../util/generator';

const dummyData = {
  estudiantes: [],
  residencias: [],
  escuelas: [],
  zonas: [],
  localidades: [],
};

interface AppProps {
  updateData?: (data: DataParams) => void;
  zonesFilters?: string[];
  activeStudentFilters?: any;
  studentFilters?: any;
}

type ContextProps = DataProps & AppProps;
const AppContext = createContext<ContextProps>(dummyData);

export const useAppContext = () => useContext(AppContext);

export default function AppContextProvider({ children }) {
  const [data, setData] = useState<DataProps>(dummyData);
  const [zonas, setZonas] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [escuelas, setEscuelas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [residencias, setResidencias] = useState([]);
  const [zonesFilters, setZonesFilters] = useState([]);
  const [studentFilters, setStudentFilters] = useState([]);

  useEffect(() => {
    getZonas().then((res) => setZonas(res));
    getLocalidades().then((res) => setLocalidades(res));
    getEstudiantes().then((res) => setEstudiantes(res));
    getResidencias().then((res) => setResidencias(res));
    getEscuelas().then((res) => setEscuelas(res));
  }, []);

  useEffect(() => {
    setData({
      zonas,
      localidades,
      escuelas,
      residencias,
      estudiantes,
    });
  }, [zonas, localidades, escuelas, residencias, estudiantes]);

  const activeStudentFilters = (filters) => setStudentFilters(filters);

  const value = useMemo(
    (): ContextProps => ({
      ...data,
      zonesFilters,
      activeStudentFilters,
      studentFilters,
    }),
    [data]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const AppConsumerWithProps = ({ children }) => {
  return (
    <AppContext.Consumer>
      {(props) => cloneElement(children, { ...props })}
    </AppContext.Consumer>
  );
};

export const AppConsumer = ({ children }) => {
  return (
    <AppContext.Consumer>
      {(props) => cloneElement(children, { ...props })}
    </AppContext.Consumer>
  );
};
