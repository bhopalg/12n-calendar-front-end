import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from "../components/header/header";
import Calendar from "../components/calendar/calendar";

const Home: NextPage = () => {
  return (
    <div className={'max-w-7xl m-auto'}>
      <Head>
        <title>NFT Investor</title>
        <meta name="description" content="NFT Investor" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/site.webmanifest"/>
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
      </Head>
      <Header/>
      <main className={styles['main-container'] + ' flex xl:flex-row flex-col p-5 gap-10 mb-9'}>
          <Calendar/>
      </main>
    </div>
  )
}

export default Home
