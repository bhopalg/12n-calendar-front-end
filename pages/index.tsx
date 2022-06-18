import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from "../components/header/header";
import Calendar from "../components/calendar/calendar";

const Home: NextPage = () => {
  return (
    <div className={'max-w-7xl m-auto'}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={styles['main-container'] + ' flex xl:flex-row flex-col p-5 gap-10 mb-9'}>
      </main>
    </div>
  )
}

export default Home
