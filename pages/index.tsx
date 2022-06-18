import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from "../components/header/header";
import { NewspaperIcon, PhoneIcon, SupportIcon } from '@heroicons/react/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import {TwitterTimelineEmbed} from "react-twitter-embed";

interface SocialPanel {
    href: string;
    imageSrc: string;
    altName: string;
    name: string;
}

const socialPanels: SocialPanel[] = [
    {
        href: 'https://twitter.com/nft_invest0r?s=21&t=323gWFIORfRLGmFzqvx4og',
        name: 'Twitter',
        imageSrc: '/twitter.svg',
        altName: 'Twitter',
    },
    {
        href: 'https://vm.tiktok.com/ZMNYUG8xF/',
        name: 'Tiktok',
        imageSrc: '/tiktok.svg',
        altName: 'Tiktok',
    },
    {
        href: 'https://instagram.com/0xnftinvestor?igshid=YmMyMTA2M2Y=',
        name: 'Instagram',
        imageSrc: '/instagram.svg',
        altName: 'Instagram',
    }
];

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
          <div>
              <div className="relative pb-5 xl:pb-0 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className={`${styles['homepage-info-section']} relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8`}>
                      <h2 className={`${styles['homepage-title']} text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl`}>
                          <span>Welcome to</span><br/>
                          <span><span className={styles['nft-name']}>NFT</span> Investor</span>
                      </h2>
                      <h4 className={`${styles['homepage-text']} mt-6 max-w-3xl text-xl`}>
                          We simplify the NFT market and make it possible for you to stay up to date with all things WEB3.
                      </h4>
                  </div>
                  <div className={`${styles['homepage-socials']} relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 w-4/5`}>
                      {socialPanels.map((s: SocialPanel) => (
                          <div key={s.name} className={`${styles['homepage-social-link']} mt-5 mb-5 w-full h-20 flex flex-row items-center pr-10 pl-10 justify-between`}>
                              <div className={'flex flex-row gap-5 items-center'}>
                                  <div className={styles['social-links-image-container'] + ' h-15 w-15 flex p-4'}>
                                      <img className={styles['social-image']} src={s.imageSrc} alt={s.altName}/>
                                  </div>
                                  <div>
                                      <h3 className={'text-white'}>{s.name}</h3>
                                  </div>
                              </div>
                              <a className={'cursor-pointer'} rel={'noreferrer'} href={s.href} target={'_blank'}>
                                  <FontAwesomeIcon className={`${styles['social-link-icon']} w-7 h-7`} icon={faSquareArrowUpRight} />
                              </a>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
          <div className={'sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-2 lg:gap-8 pr-8 pl-8 xl:pr-16 xl:pl-16'}>
              <div className={'pb-10 xl:pb-5'}>
                  <TwitterTimelineEmbed
                      onLoad={function noRefCheck(){}}
                      options={{height: 800}}
                      screenName="nft_invest0r"
                      sourceType="profile"
                      theme="dark"
                  />
              </div>
              <div className={'pb-10 xl:pb-5'}>
                  {/*<TwitterTimelineEmbed*/}
                  {/*    sourceType="profile"*/}
                  {/*    screenName="saurabhnemade"*/}
                  {/*    options={{height: 400}}*/}
                  {/*/>*/}
              </div>
          </div>
      </main>
    </div>
  )
}

export default Home
