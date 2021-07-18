import styles from ' ../../../styles/Description.module.css ';
import Header from '../../src/components/Header';
import CardDetails from '../../src/components/Card'
import axios from 'axios'

export default function description({ job }) {
  return (
    <div className={style.container}>
      <Header showSearch={false} />
      <div className={styles.card}>
        {
        job &&
         <CardDetails
         title={job.title}
         description={job.description}
         enterprise={job.enterprise}
         day={job.day}
         local={` ${job.city} - ${job.state} `}
         />
        }
        </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallBack: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const { data } = await axios.get(
    'http://localhost:3000/api/jobs?{id}&secret=over'
  );
  return {
    props: {
      job: data.jobs,
    },
  };
}
