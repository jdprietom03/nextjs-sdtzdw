import Head from 'next/head';
import { use, useState, useEffect } from 'react';
import AgesTable from '../components/AgesTable';
import FactorsTable from '../components/FactorsTable';
import FilterTable from '../components/FilterTable';
import LocalidadesTable from '../components/LocalidadesTable';
import ZonesTable from '../components/ZonesTable';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <div className="distribucion">
        <ZonesTable />
        <AgesTable />
        <FactorsTable />
        <LocalidadesTable />
      </div>
      <div className="filtros">
        <FilterTable />
      </div>
    </div>
  );
}
