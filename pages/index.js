import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import Link from "next/link";
import {useRouter} from "next/router";
import './config.js';
const clubs = global.config.clubs;
export async function getStaticProps() {
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
    const router = useRouter();
    const getLink = (path) => `${router.basePath}${path}`;
    return (
        <div className={styles.container}>
            <Head>
                <title>{ global.config.site.title }</title>
                <meta name="description" content={global.config.site.description}/>
                <link rel="shortcut icon" href={global.config.site.favicon} />
                <meta property="og:title" content={global.config.site.title}/>
                <meta property="og:site_name" content={global.config.site.site_name}/>
                <meta property="og:description" content={global.config.site.description}/>
                <meta property="og:type" content="profile"/>
                <meta property="og:image" content={global.config.site.favicon}/>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    { global.config.site.title }
                </h1>
                <p className={styles.description}>
                    { global.config.site.description }
                </p>

                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        {Object.values(clubs).map(club => (

                            <Grid item xs={12} sm={6} md={4} key={club.id}>
                                <a href={getLink(`/club/${club.id}`)} >
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt={club.organization_name}
                                            image={club.logo}
                                            title={club.organization_name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {club.organization_name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {club.vision.split('\n').map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        <br/>
                                                    </span>
                                                ))}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                </a>
                            </Grid>

                        ))}
                    </Grid>
                </Container>
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
