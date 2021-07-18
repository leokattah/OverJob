import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import Header from '../src/components/Header';
import Filters from '../src/components/Filters';
import Card from '../src/components/Card';
import React from 'react';
import Link from 'next/link';

export default function Home({ jobs }) {
  const [filters, setFilters] = React.useState({
    Estado: [],
    Modalidade: [],
    Nivel: [],
    Regime: [],
    Categoria: [],
  });

  const [jobList, setJobList] = useState(jobs);
  const [activeFilters, setActiveFilters] = useState({});
  const handleToggleFilter = (key, checked, value) => {
    let field;
    switch (key) {
      case 'Estado':
        field = 'state';
        break;
      case 'Modalidade':
        field = 'model';
        break;
      case 'Nivel':
        field = 'level';
        break;
      case 'Regime':
        field = 'type';
        break;
      case 'Categoria':
        field = 'category';
        break;

      default:
        break;
    }
    setActiveFilters((prevState) => ({
      ...prevState,
      [value]: { field: checked },
    }));
  };

  //No caso abaixo, toda vez que o job mudar o useEffect vai mudar.
  useEffect(() => {
    jobs.forEach((job) => {
      setFilters((prevState) => {
        let object = prevState;
        if (prevState.Estado.indexOf(job.state) > 0) {
          object.Estado = [...object.Estado, job.state];
        }
        if (prevState.Modalidade.indexOf(job.model) > 0) {
          object.Modalidade = [...object.Modalidade, job.model];
        }
        if (prevState.Nivel.indexOf(job.level) > 0) {
          object.Nivel = [...object.Nivel, job.level];
        }
        if (prevState.Regime.indexOf(job.type) > 0) {
          object.Regime = [...object.Regime, job.type];
        }
        if (prevState.Categoria.indexOf(job.category) > 0) {
          object.Categoria = [...object.Categoria, job.category];
        }

        return { ...object };
      });
    });
  }, [jobs]);

  //No caso abaixo, toda vez que o activeFilters mudar o useEffect vai mudar.
  useEffect(() => {
    let _jobs = [];
    object.keys(activeFilters).map((key) => {
      let found = false;
      if (activeFilters[key].checked) {
        found = true;
        _jobs = [
          ...jobs,
          ...jobs.filter((job) => job[activeFilters[key].field == key]),
        ];
      }
      if (!found) {
        setJobList(jobs);
      } else {
        setJobList(_jobs);
      }
    });
  }, [activeFilters]);

  return (
    <div className={styles.structure}>
      <Header />
      <div className={styles.cardContainer}>
        <div className={styles.filter}>
          <h4>Definir busca</h4>
          <div className={filter_list}>
            {object.Keys(filters).map(key, (index) => (
              <Filters
                Key={index}
                filter={filters[key]}
                onChange={handleToggleFilter}
                category={key}
              />
            ))}
          </div>
        </div>
        <div className={styles.cards}>
          {jobList &&
            jobList.map((job, index) => (
              <Link
              href={ ` /description/${job.id} ` }
              passHref
              key={index}
              >
                <a>
                  <Card
                    title={job.title}
                    description={job.description}
                    enterprise={job.enterprise}
                    day={job.day}
                    local={` ${job.city} - ${job.state} `}
                  />
                  ;
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}



export async function getStaticProps() {
  const {
    data: { error, jobs = [] },
  } = await axios.get('http://localhost:3000/api/jobs?secret=over');
  return {
    props: {
      jobs,
    },
    revalidate: 5000,
  };
}
