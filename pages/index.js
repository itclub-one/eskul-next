import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import Link from "next/link";
import {useRouter} from "next/router";
import clubs from "../data_eskul.json";

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
                <title>ESKUL</title>
                <meta name="description" content="ESKUL"/>
                <link rel="shortcut icon" href="https://github.com/itclub-one/web-eslul/raw/master/img/logo/smeaa.png" />
                <meta property="og:title" content="Web Eskul SMKN 1"/>
                <meta property="og:site_name" content="eskul-next"/>
                <meta property="og:description" content="Description"/>
                <meta property="og:type" content="profile"/>
                <meta property="og:image" content="https://github.com/itclub-one/web-eslul/raw/master/img/logo/smeaa.png"/>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    ESKUL
                </h1>
                <p className={styles.description}>
                    ESKUL is a platform to connect students with their teachers.
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
