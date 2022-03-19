import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Doe para Ucrânia 🇺🇦'
export const siteTitle = 'Doe para 🇺🇦🇺🇦🇺🇦! Agora!'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Faça doações via PIX para a Ucrânia."
        />
        <meta
          property="og:image"
          content="https://pix-donate.vercel.app/images/og-image.png"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <Image
            priority
            src="/images/profile.webp"
            className={utilStyles.borderCircle}
            height={144}
            width={144}
            alt={name}
        />
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}