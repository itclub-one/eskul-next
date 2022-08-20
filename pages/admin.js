import Head from "next/head";
import {useState} from "react";
import './config.js';
export default function Admin({}) {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
            username: "user1",
            password: "pass1"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];




    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (<div className="error">{errorMessages.message}</div>);

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        const {target} = event;

        const {app_id, client_id, client_secret, installation_id, uname} = target;
        const reader = new FileReader();
        reader.onload = function(e) {
            let contents = e.target.result;
            console.log(contents);
            global.config.github.issue_installation_token(contents).then(jwt => {
                console.log(jwt);
                sessionStorage.setItem("jwt", JSON.stringify(jwt));
                global.config.github_jwt = jwt;
                global.config.github.save_to_local_storage();
                //go to admin/dashboard
            });
        }
        reader.readAsText(uname.files[0]);
        global.config.github.installation_id = installation_id.value.trim();
        global.config.github.client_id = client_id.value.trim();
        global.config.github.client_secret = client_secret.value.trim();
        global.config.github.app_id = app_id.value.trim();

    };
    // JSX code for login form
    const renderForm = (
        <center>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>App ID</label>
                        <input type="text" name="app_id" defaultValue={config.github.app_id}/>
                        {renderErrorMessage("app_id")}
                    </div>
                    <div className="input-container">
                        <label>Client ID</label>
                        <input type="text" name="client_id" defaultValue={config.github.client_id}/>
                        {renderErrorMessage("client_id")}
                    </div>
                    <div className="input-container">
                        <label>Client Secret</label>
                        <input type="text" name="client_secret" defaultValue={config.github.client_secret}/>
                        {renderErrorMessage("client_secret")}
                    </div>
                    <div className="input-container">
                        <label>Installation ID</label>
                        <input type="text" name="installation_id" defaultValue={config.github.installation_id} />
                        {renderErrorMessage("installation_id")}
                    </div>
                    <div className="input-container">
                        <label>Private Key </label>
                        <input type="file" name="uname"/>
                        {renderErrorMessage("uname")}
                    </div>
                    <div className="button-container">
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        </center>
    );


    return (
        <div className="app">
            <Head>
                <title>Admin</title>
                <meta name="description" content="Admin page for the club website"/>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <meta property="og:title" content="Admin"/>
                <meta property="og:site_name" content="Club Website"/>
                <meta property="og:description" content="Admin page for the club website"/>
                <meta property="og:type" content="profile"/>
                <meta property="og:image" content="/favicon.ico"/>
            </Head>
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
}