import Head from "next/head";
import Image from "next/image";

const dataURL = process.env.NEXT_PUBLIC_DATA_URL || 'https://raw.githubusercontent.com/itclub-one/list-eskul/main/data_eskul.json';
export async function getStaticProps({ params }) {
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
    const clubs = await fetch(dataURL).then(res => res.json());
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
                <p>Instagram Account: { club.instagram_account }</p>
            </div>
        </div>
    )
}

