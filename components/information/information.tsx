import styles from '../../styles/information.module.css';

const posts = [
    {
        projectName: 'Dobies',
        websiteURL: 'htts://dobiesnft.io',
        description: 'No roadmap, No promises, Just vibes. Free Mint, Minting Wednesday, June 8, 3:00PM EST.',
        datetime: '2020-03-16T12:00:00Z',
        bannerURL: 'https://pbs.twimg.com/profile_banners/1514297054754914316/1649872947/1500x500',
        profilePicURL: 'https://pbs.twimg.com/profile_images/1530040202739257346/T9JiQ_fg_400x400.jpg',
        links: {
            twitterLink: 'https://twitter.com/DobiesNFT',
            instagramLink: 'https://discord.gg/Mrr9Q5d3NS',
            etherscanLink: 'https://etherscan.io/address/0x9f001721bb087fbbcd6fef2c140ed6892760e71b',
            discordLink: 'https://discord.gg/Mrr9Q5d3NS',
            openSeaLink: 'https://opensea.io/collection/dobies-collection',
        }
    },
];

function Information() {
    return (
        <div className={`${styles['info-container']} relative bg-gray-50 pb-20 px-4 sm:px-6 lg:pb-10 lg:px-8`}>
            <div className="absolute inset-0">
                <div className={`${styles['info-back']} h-1/3 sm:h-2/3`} />
            </div>
            <div className="relative max-w-7xl mx-auto">
                <div className="text-left">
                    <h2 className={`${styles['info-header']} text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl`}>16th June 2022</h2>
                </div>
                <div className="mt-12 xl:max-w-lg mx-auto grid gap-5 lg:grid-cols lg:max-w-none">
                    {posts.map((post) => (
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
    );
}

export default Information;