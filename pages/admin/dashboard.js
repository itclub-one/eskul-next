import styles from '../../styles/Home.module.css'
import '../config.js';
import * as CSV from 'csv-string';
import {useState} from "react";
import {Button} from "@mui/material";


function CSVToArray(strData, strDelimiter) {
    return CSV.parse(strData, {
        delimiter: strDelimiter || ','
    });
}

function getTimestamp() {
    const d = new Date,
        dformat = [d.getMonth() + 1,
                d.getDate(),
                d.getFullYear()].join('/') + ' ' +
            [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');
    return dformat;
}


function toCSV(tableId){
    const csv = [];
    const rows = document.querySelectorAll("#" + tableId + " tr");
    for (let i = 0; i < rows.length; i++) {
        const row = [], cols = rows[i].querySelectorAll("td, th");
        for (let j = 0; j < cols.length; j++) {
            //check if contain children textarea
            let con = cols[j].innerText;
            if(cols[j].children.length > 0){
                con = cols[j].children[0].textContent;
                con = con + "";
            }
            row.push(con);
        }
        csv.push(row);
    }
    return CSV.stringify(csv);
}
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
/*
0: (11) ['Timestamp', 'nama ekstrakurikuler & organisasi', 'nama lengkap pembina beserta gelar', 'nama lengkap ketua', 'nama lengkap wakil ketua', 'jadwal kumpulan eskul & organisasi', 'visi eskul & organisasi', 'misi eskul & organisasi', 'program kerja', 'logo ekstrakurikuler & organisasi', 'nama akun instagram eskul & organisasi']
1: (11) ['6/16/2022 20:24:25', 'IT CLUB', 'andriansyah maulana', 'naufal rabani', 'yusuf sekhan alfath', 'senin', '-', '-', '-', 'itc.png', '@itclubsmkn1garut']

 */
export default function AdminDashboard({}) {
    // React States
    const [csvData, setCsvData] = useState([]);
    let content = <a>Loading</a>
    if (csvData.length > 0) {
        console.log(csvData);
        content = (   <table id="csvTable" className={styles.table}>
            <thead>
            <tr>
                {csvData[0].map((item, index) => {
                    return <th key={index}>{item}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {csvData.slice(1).map((item, index) => {
                return <tr key={index}>
                    {item.map((item, index) => {
                        return <td key={index}>
                            <textarea className={styles.textarea} defaultValue={    item}></textarea>
                        </td>
                    })}
                </tr>
            })}
            </tbody>
        </table>)
    }else{
        global.config.github.fetch_content_metadata().then(metadata => {
            console.log(metadata);
            global.config.github.fetch_content_data(metadata).then(str => {
                console.log("Hash: " + str.hashCode());
                console.log("Length: " + str.length);
                const data = CSVToArray(str, ",");
                setCsvData(data);
            });
        })
    }
    console.log(csvData[0]);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div>
                    <Button variant="contained" color="primary" onClick={() => {
                        const csv = toCSV("csvTable");
                        console.log(csv);
                        //hash
                        const hash = csv.hashCode();
                        console.log("Hash: " + hash);
                        console.log("Length: " + csv.length);

                    } }> Save to Github </Button>
                </div>
                <div>
                    {content}
                </div>
            </main>
        </div>
    )
}