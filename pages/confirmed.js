import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../components/layout.module.css'
import Confetti from 'react-confetti'

export default function Confirmed() {

  return (
    <Layout>
      {(typeof window !== 'undefined') &&
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      } 
      <Head>
        <title>Doação confirmada</title>
      </Head>
        <h1 className={styles.header}>Doação confirmada</h1>
        <div className={styles.backToHome}>
          <a href="/">← Nova doação 🤑 </a>
        </div>
    </Layout>
  )
}