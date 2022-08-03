import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link";

const dataURL = process.env.NEXT_PUBLIC_DATA_URL || 'https://raw.githubusercontent.com/itclub-one/list-eskul/main/data_eskul.json';

export async function getStaticProps() {
    const clubs = await fetch(dataURL).then(res => res.json());
    /**
     * {
     *     "it-club": {
     *         "timestamp": "6/16/2022 20:24:25",
     *         "organization_name": "CLUB",
     *         "coach_name": "",
     *         "chairman_name": "",
     *         "vice_chairman_name": "",
     *         "schedule": "senin",
     *         "vision": "-",
     *         "mission": "-",
     *         "work_program": "-",
     *         "logo": "assets/images/club.png",
     *         "instagram_account": "@club",
     *         "id": "club"
     *     },
     *  }
     **/
    return {
        props: {
            clubs
        }
    }
}

export default function Home({clubs}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>ESKUL</title>
                <meta name="description" content="ESKUL"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    ESKUL
                </h1>
                <p className={styles.description}>
                    ESKUL is a platform to connect students with their teachers.
                </p>

                <div className={styles.grid}>
                    {Object.keys(clubs).map(clubId => {
                        const club = clubs[clubId];
                        return (
                            <Link key={clubId} href="/club/[id]" as={`/club/${clubId}`}>
                                <a>
                                    <div className={styles.card}>
                                        <h2>{club.organization_name}</h2>
                                        <img src={club.logo}/>
                                    </div>
                                </a>
                            </Link>
                        )
                    })}
                </div>
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
    </span>
                </a>
            </footer>
        </div>

    )
}
