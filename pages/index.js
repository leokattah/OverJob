import styles from '../styles/pages/Home.module.css'
import Header from '../src/components/Header'
import Filters from '../src/components/Filters'
import Cards from '../src/components/Cards'


export default function Home() {
  return (
    <div className={styles.container}>

    <Header />
    <Filters/>
    <Cards />

    </div>
  )
}
