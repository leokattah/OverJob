import styles from '../../../styles/components/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <a>
            <Image
              src="/images/overjob.svg"
              width="200"
              height="40"
              alt="logo do projeto"
            />
          </a>
        </Link>
        <Link href="/description/1" passHref>
          <a>
            <button className={styles.publishedButton}>Cadastrar Vagas</button>
          </a>
        </Link>
      </div>

      <div className={styles.search}>
        <div className={styles.searchFields}>
        <input type="text" placeholder="Digite um cargo" />
        <input type="text" placeholder="Digite uma cidade" />
        <button>
          <image
            src="./images/lupa.svg"
            widht="30"
            heigth="30"
            alt="imagem de lupa"
          ></image>
        </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
