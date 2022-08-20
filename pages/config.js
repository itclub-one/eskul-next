import clubs from "../data_eskul.json";
import {createAppAuth} from '@octokit/auth-app';

/*
Convert a string into an ArrayBuffer
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

const config = {
    clubs: clubs,
    site: {
        title: "ESKUL",
        site_name: "eskul-next",
        description: "Eskul is a platform to connect students with their teachers.",
        favicon: "https://github.com/itclub-one/web-eslul/raw/master/img/logo/smeaa.png"
    },
    github: {
        owner: "itclub-one",
        repo: "eskul-next",
        branch_name: "main",
        email: "",
        username: "",
        installation_id: "",
        client_id: "",
        app_id: "",
        client_secret: "",
        issue_installation_token: async function (private_key) {
            //https://github.com/octokit/auth-app.js/#installation-authentication
            const auth = createAppAuth({
                appId: this.app_id,
                privateKey: private_key,
                installationId: this.installation_id,
                clientId: this.client_id,
                clientSecret: this.client_secret,
            });
            return await auth({type: 'installation'});
        },
        save_to_local_storage: function () {
            if (localStorage !== undefined) {
                localStorage.setItem("github", JSON.stringify(config.github));
            }
        },
        load_from_local_storage: function () {
            try {
                if (!localStorage) return;
            } catch (e) {
                return;
            }
            const github = localStorage.getItem("github");
            const parsed = JSON.parse(github);
            if (github) {
                Object.assign(config.github, parsed);
            }
        }
    }
}
console.log(config.github)
//try load from local storage if empty
if (config.github.client_id === "") {
    console.log("loading from local storage");

    config.github.load_from_local_storage();
    console.log(config.github)
}

module.exports = global.config = config;


