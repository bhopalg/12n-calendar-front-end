import styles from '../../styles/information.module.css';
import {Day} from "../calendar/calendar";
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import {useState} from "react";

function Information(props: { selectEvent: Day | null }) {
    const [tooltip, showTooltip] = useState(true);
    console.log(props);
    return (
        <>
            {
                props.selectEvent ?
                    <div className={`${styles['info-container']} relative bg-gray-50 p-10 pb-20 px-4 sm:px-6 lg:pb-10 lg:px-8`}>
                        <div className="absolute inset-0">
                            <div className={`${styles['info-back']} h-1/3 sm:h-2/3`} />
                        </div>
                        <div className="relative max-w-7xl mx-auto md:overflow-y-hidden">
                            <div className="text-left">
                                <h2 className={`${styles['info-header']} text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl`}>{moment(props.selectEvent.date).format('Do MMMM YYYY')}</h2>
                            </div>
                            <div className={styles['event-card-container'] + " overflow-x-scroll md:overflow-x-inherit mt-12 xl:max-w-lg mx-auto grid gap-5 lg:grid-cols lg:max-w-none"}>
                                {props.selectEvent.events.sort((a, b) => moment(a.datetime).valueOf() - moment(b.datetime).valueOf()).map((post) => (
                                    <div key={post.projectName} className={styles['event-card'] + " flex flex-col rounded-lg shadow-lg overflow-hidden"}>
                                        <div className="flex-shrink-0">
                                            <img className="xl:h-48 w-full object-cover" src={post.bannerURL ?? '/default-banner-image.jpg' } alt="default-banner-image" />
                                        </div>
                                        <div className={`${styles['event-content']} flex-1 pt-3 pr-6 pl-6 pb-6 flex flex-col justify-between`}>
                                            <div className="flex-1">
                                                <div className="mt-3 flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <span className="sr-only">{post.projectName}</span>
                                                        <img className="h-10 w-10 rounded-full" src={post.profilePicURL ?? '/default-logo-image.jpg'} alt="default-logo-image" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-xl font-semibold text-white-900">{post.projectName}</p>
                                                    </div>
                                                </div>
                                                <p className="mt-3 text-base text-white-500">{post.description}</p>
                                            </div>
                                            <div className="mt-6 flex items-center">
                                                <div className={`${styles['event-info']} flex flex-col items-start xl:flex-row xl:items-center justify-between space-x-1 text-m font-semibold text-white-900`}>
                                                    <div className={'flex flex-col pb-5 xl:pb-0'}>
                                                        <label>Drop Time</label>
                                                        <div
                                                            className={'cursor-pointer'}
                                                            onMouseLeave={() => {
                                                                showTooltip(false);
                                                                setTimeout(() => showTooltip(true), 50);
                                                            }}
                                                            onMouseEnter={() => showTooltip(true)}
                                                            data-tip="Time shown in local time">
                                                            <time dateTime={post.datetime}>{new Date(post.datetime).toTimeString().split(' ')[0]}</time>
                                                        </div>
                                                        {tooltip && <ReactTooltip delayHide={5} place="top" type="dark" effect="solid"/>}
                                                    </div>
                                                    <div className={'flex flex-col pb-5 xl:pb-0'}>
                                                        <label>Mint Price</label>
                                                        <span>{post?.mintPrice ? `${post.mintPrice} ${post.blockchain ?? ''}` : <></>}</span>
                                                    </div>
                                                    <div className={'flex flex-col'}>
                                                        <label>Supply</label>
                                                        <span>{post?.supply ? post?.supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : <></>}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'mt-6'}>
                                                <div className={'flex flex-row gap-3'}>
                                                    {post.links.discordLink ? <a className={styles['social-links']} href={post.links.discordLink}>
                                                        <img className={`${styles['social-link-image']} ${styles['discord-image']} h-10 w-10 rounded-full`} src={'/discord.svg'} alt="discord" />
                                                    </a> : <></>}
                                                    {post.links.twitterLink ? <a className={styles['social-links']} href={post.links.twitterLink}>
                                                        <img className={`${styles['social-link-image']} ${styles['twitter-image']} h-10 w-10 rounded-full`} src={'/twitter.svg'} alt="twitter" />
                                                    </a> : <></>}
                                                    {post.links.instagramLink ? <a className={styles['social-links']} href={post.links.instagramLink}>
                                                        <img className={`${styles['social-link-image']} ${styles['instagram-image']} h-10 w-10 rounded-full`} src={'/instagram.svg'} alt="instagram" />
                                                    </a> : <></>}
                                                    {post.links.openSeaLink ? <a className={styles['social-links']} href={post.links.openSeaLink}>
                                                        <img className={`${styles['social-link-image']} ${styles['opensea-image']} h-10 w-10 rounded-full`} src={'/opensea.svg'} alt="opensea" />
                                                    </a> : <></>}
                                                    {post.links.etherscanLink ?<a className={styles['social-links']} href={post.links.etherscanLink}>
                                                        <img className={`${styles['social-link-image']} ${styles['etherscan-image']} h-10 w-10 rounded-full`} src={'/etherscan-logo-light-circle.svg'} alt="etherscan" />
                                                    </a> : <></>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    :
                    <div></div>
            }
        </>
    );
}

export default Information;