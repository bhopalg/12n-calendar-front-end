import styles from '../../styles/header.module.scss';
import { useEffect, useState } from 'react';
import NewsletterSubscribe from "../newsletter/newsletter-subscribe";
import { useMediaQuery } from 'react-responsive';
import {useRouter} from "next/router";

function Header() {
    const [topRightButtonData, setTopRightButtonData] = useState({ link: '/', text: 'Home' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1280px)' })
    const router = useRouter();

    useEffect(() => {
        if (router.pathname === '/dashboard') {
            setTopRightButtonData({
                link: '/',
                text: 'Home',
            });
        } else {
            setTopRightButtonData({
                link: '/dashboard',
                text: 'Dashboard',
            });
        }
    }, []);

    return (
        <header className={styles['header-container'] + ' fixed right-0 left-0 z-1030 bg-'}>
            <div className="mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-6 md:justify-between md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#" className={'flex items-center'}>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="/logo.svg"
                                alt="Logo"
                            />
                            <h1 className={styles['logo-title']}>
                                <span className={`pl-5 ${styles['logo-title-nft']}`}>NFT</span>
                                <span className={`pl-2 ${styles['logo-title-investor']}`}>Investor</span>
                            </h1>
                        </a>
                    </div>
                    <div className={`${styles['right-nav']} md:flex items-center justify-end md:flex-1 lg:w-0`}>
                        {!isTabletOrMobile ? <NewsletterSubscribe/> : <></>}
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <a
                            href={topRightButtonData.link}
                            className={styles['header-home-link'] + " ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"}
                        >
                            {topRightButtonData.text}
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;