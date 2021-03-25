import Head from "next/head";
import Link from "next/link";
import DashboardLayout from "../containers/DashboardLayout";

function FAQ() {
    return (
        <>
            <Head>
                <title>FAQ : Femto Uploader</title>
            </Head>
            <DashboardLayout active="faq">
                <div className="main">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href='/'><a>Femto</a></Link></li>
                            <li className="is-active"><a href="/faq" aria-current="page">FAQ</a></li>
                        </ul>
                    </nav>
                    <h1 className="title">
                        FAQ
                    </h1>

                    <div className="content">
                        <b>What is this?</b>
                        <p>Femto Uploader is a free service that allows people to share files and shorten URLs.  It's meant to be 'no fuss' with no invasive tracking.  The source code is openly available <a href="https://github.com/femto-apps/web-simple-file-uploader">here.</a></p>

                        <br />

                        <b>What should I not do?</b>
                        <p>Femto Uploader is <b>not</b> intended to be a bastion of free speech and will restrict content that is illegal.  We've tried to make it simple (no external dependencies) to host your own version of this site if you disagree with our decisions.  Specifically, the following items are prohibited:</p>
                        <ul>
                            <li>child pornography</li>
                            <li>malware, including "potentially unwanted applications"</li>
                            <li>botnet command and control schemes involving this service</li>
                            <li>piracy</li>
                            <li>extremist content</li>
                        </ul>
                        <p>We also recommend that you do not upload a substantial number of files (e.g. CI build artifacts, backups) or you may be asked to stop / blocked from this service.</p>

                        <br />

                        <b>What laws apply to Femto?</b>
                        <p>This site is governed by British laws.  We may also take into account laws from the Netherlands / France.  Contact us if you are worried <Link href="/contact">here</Link>.</p>

                        <br />

                        <b>What limits apply to Femto?</b>
                        <p>Uploads should be less than 8GB in size.  Uploads may be removed if inactive and larger than 1GB.</p>

                        <br />

                        <b>How stable is this service?</b>
                        <p>It varies.  Over the life time of this service being public we have had an uptime of 99.4%.  0.4% of this downtime was intentional (v1 -> v2 migration) with 0.2% being unplanned.  We expect our uptime to increase over time as bugs are fixed.  As more people use the service we are taking further steps to improve stability.</p>

                        <br />
                        <b>What is P2P?</b>
                        <p>P2P stands for 'Peer to Peer'.  It's a way of sending files directly to an individual, without any data passing through the host. Typically:</p>
                        <ol>
                            <li>Person A wishes to send a file to person B, so generates a unique code.</li>
                            <li>Person B enters this code into the tab.</li>
                            <li>Person A drops files onto the uploader and they get transferred to person B.</li>
                        </ol>
                        <p>There are limitations, specifically, person B won't be able to download the file at a later point in time.  However, the transfer speed will likely be significantly increased.</p>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default FAQ