import styles from '../../styles/information.module.css';
import {Day} from "../calendar/calendar";
import moment from 'moment';

function Information(props: { selectEvent: Day | null }) {
    return (
        <>
            {
                props.selectEvent ?
                    <div className={`${styles['info-container']} relative bg-gray-50 p-10 pb-20 px-4 sm:px-6 lg:pb-10 lg:px-8`}>
                    <div className="absolute inset-0">
                        <div className={`${styles['info-back']} h-1/3 sm:h-2/3`} />
                    </div>
                    <div className="relative max-w-7xl mx-auto">
                        <div className="text-left">
                            <h2 className={`${styles['info-header']} text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl`}>{moment(props.selectEvent.date).format('Do MMMM YYYY')}</h2>
                        </div>
                        <div className="mt-12 xl:max-w-lg mx-auto grid gap-5 lg:grid-cols lg:max-w-none">
                            {props.selectEvent.events.map((post) => (
                                <div key={post.projectName} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                    <div className="flex-shrink-0">
                                        <img className="h-48 w-full object-cover" src={post.bannerURL} alt="" />
                                    </div>
                                    <div className={`${styles['event-content']} flex-1 pt-3 pr-6 pl-6 pb-6 flex flex-col justify-between`}>
                                        <div className="flex-1">
                                            <div className="mt-3 flex items-center">
                                                <div className="flex-shrink-0">
                                                    <span className="sr-only">{post.projectName}</span>
                                                    <img className="h-10 w-10 rounded-full" src={post.profilePicURL} alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-xl font-semibold text-white-900">{post.projectName}</p>
                                                </div>
                                            </div>
                                            <p className="mt-3 text-base text-white-500">{post.description}</p>
                                        </div>
                                        <div className="mt-6 flex items-center">
                                            <div className={`${styles['event-info']} flex items-center justify-between space-x-1 text-m font-semibold text-white-900`}>
                                                <div>
                                                    <time dateTime={post.datetime}>{post.datetime}</time>
                                                    <span aria-hidden="true">&middot;</span>
                                                </div>
                                                <div className={'flex flex-row gap-3'}>
                                                    <a className={styles['social-links']} href={post.links.discordLink}>
                                                        <img className="h-10 w-10 rounded-full" src={'/discord.svg'} alt="" />
                                                    </a>
                                                    <a className={styles['social-links']} href={post.links.twitterLink}>
                                                        <img className="h-10 w-10 rounded-full" src={'/twitter.svg'} alt="" />
                                                    </a>
                                                    <a className={styles['social-links']} href={post.links.openSeaLink}>
                                                        <img className="h-10 w-10 rounded-full" src={'/opensea.svg'} alt="" />
                                                    </a>
                                                    <a className={styles['social-links']} href={post.links.etherscanLink}>
                                                        <img className="h-10 w-10 rounded-full" src={'/etherscan-logo-light-circle.svg'} alt="" />
                                                    </a>
                                                </div>
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