import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from "../components/header/header";

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
      <main className={styles['main-container'] + ' lg:relative mb-9'}>
          <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
              <div className="px-4 lg:w-2/3 sm:px-8 xl:pr-16">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                      <span className="block xl:inline text-white">Welcome to</span><br/>
                      <span className="block xl:inline text-white"><span className={styles['nft-name']}>NFT</span> Investor</span>
                  </h1>
                  <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl text-white">
                      We simplify the NFT market and make it possible for you to stay up to date with all things WEB3.
                  </p>
                  <div className="mt-10 sm:flex sm:justify-center lg:justify-start items-end">
                      <div className={styles['email-input-container'] + ' rounded-md shadow'}>
                          <div className="mt-1 h-14">
                              <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  className={`${styles['email-input']} pl-3 h-14 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                  placeholder="Email address"
                              />
                          </div>
                      </div>
                      <div className="h-14 mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                          <button
                              className={`${styles['join-newsletter-button']} h-14 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10`}
                          >
                              Join Newsletter
                          </button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/3 lg:h-full">
              <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                  alt=""
              />
          </div>
      </main>
    </div>
  )
}

export default Home
