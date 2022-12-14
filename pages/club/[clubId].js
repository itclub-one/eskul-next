import Head from "next/head";
import Image from "next/image";
import {useRouter} from "next/router";
import clubs from "../../data_eskul.json";

export async function getStaticProps({ params }) {
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
    let club = clubs[params.clubId];
    if(!club) {
        throw new Error(`Club with id ${params.clubId} not found`);
    }
    return {
        props: {
            club
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: Object.keys(clubs).map(clubId => {
            return {
                params: {
                    clubId
                }
            }
        }).filter(({ params }) => !!params.clubId),
        fallback: false
    }
}

export default function ClubId({ club }) {
    return (
        <div>
            <Head>
                <title>{ club.organization_name }</title>
                <link rel="shortcut icon" href={club.logo} />
                <meta property="og:title" content={"Eskul - " + club.organization_name}/>
                <meta property="og:site_name" content="eskul-next"/>
                <meta property="og:description" content={ club.vision }/>
                <meta property="og:type" content="profile"/>
                <meta property="og:image" content={club.logo}/>
            </Head>
            <center>
            <Image src={club.logo} alt={club.organization_name} width="100" height="100" />
            </center>
            <div>
                <h1>{ club.organization_name }</h1>
                <p>Coach Name: { club.coach_name }</p>
                <p>Chairman Name: { club.chairman_name }</p>
                <p>Vice Chairman Name: { club.vice_chairman_name }</p>
                <p>Schedule: { club.schedule }</p>
                <p>Instagram Account: <a href={`https://www.instagram.com/${club.instagram_account}`} target="_blank" rel="noreferrer">{"@" + club.instagram_account }</a></p>
                <div>
                    <h2>Vision</h2>
                    { club.vision.split('\n').map((line, index) => <p key={index}>{line}</p>) }
                </div>
                <div>
                    <h2>Mission</h2>
                    { club.mission.split('\n').map((line, index) => <p key={index}>{line}</p>) }
                </div>
            </div>
        </div>
    )
}

