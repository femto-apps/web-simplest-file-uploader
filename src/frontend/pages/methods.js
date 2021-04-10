import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'

import ErrorNotification from "../components/ErrorNotification";
import DashboardLayout from "../containers/DashboardLayout";
import useUser from "../data/useUser";

function FAQ() {
    if (!process.browser) {
        return <span />
    }

    const { loading, user } = useUser()
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Ways to Upload : Femto Uploader</title>
            </Head>
            <DashboardLayout active="methods">
                <div className="main">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href='/'><a>Femto</a></Link></li>
                            <li className="is-active"><a href="/methods" aria-current="page">Ways to Upload</a></li>
                        </ul>
                    </nav>
                    <h1 className="title">
                        Ways to Upload
                    </h1>

                    <div className="content">
                        <h4>From a Web Browser</h4>
                        <p>You can upload files in four ways using from <Link href="/">the homepage</Link>.  These can be swapped between by clicking the tabs at the top.  These ways are:</p>
                        <ul>
                            <li><b>File: </b>Click the 'Upload Files' button and select any files you want to upload.</li>
                            <li><b>Text: </b>Enter text within the box, click the 'upload' button.</li>
                            <li><b>Shorten: </b>Enter a link within the box and click 'Shorten URL' to create a shortlink.</li>
                            <li><b>P2P: </b>Share the generated URL with another user and wait for them to connect, then you can upload files and they will receive them.</li>
                        </ul>

                        <br />

                        <h4>From a Terminal?</h4>
                        <p>
                            Using CURL, replace 'UPLOAD_PATH' with the path to your file.
                            <pre>
                                <code>
                                    curl -F "upload=@'UPLOAD_PATH'" {window.origin}/upload
                                </code>
                            </pre>
                            You can include options as further form fields, for example, to set the expiry to 60 seconds:
                            <pre>
                                <code>
                                    curl -F "expiry=60" -F "upload=@'UPLOAD_PATH'" {window.origin}/upload
                                </code>
                            </pre>
                            Include an API Key under the 'apikey' header:
                            <pre>
                                <code>
                                    curl -F "apikey=API_KEY" -F "upload=@'UPLOAD_PATH'" {window.origin}/upload
                                </code>
                            </pre>
                        </p>

                        <br />

                        <h4>From ShareX?</h4>
                        <p>This uploader provides generated templates for use with ShareX.  It comes preformatted with data from your current web configuration.</p>
                        {!user && <ErrorNotification text="Watch out, you're not logged in and so this will be an anonymous profile." />}

                        <div className="buttons">
                            <a href="/sharex/uploader" className="button is-link">File / Text Upload</a>
                            <a href="/sharex/shortener" className="button is-link">URL Shortener</a>
                        </div>

                        <p>
                            Download the files and open them in order to load them into ShareX.  Alternatively, open ShareX -> Destinations -> Custom Uploader Settings -> Import -> From File... and select the files from the file explorer.
                        </p>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default FAQ