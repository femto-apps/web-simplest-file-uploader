import { faEnvelope, faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import DashboardLayout from "../containers/DashboardLayout";
import Obfuscate from 'react-obfuscate';
import { useState } from "react";
import * as EmailValidator from 'email-validator'
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

function Contact() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [contactMethod, setContactMethod] = useState('discord')
    const [success, setSuccess] = useState('')

    let placeholder = 'none'
    if (contactMethod === 'discord') placeholder = 'user#0007'
    if (contactMethod === 'email') placeholder = 'hello@email.com'

    let emailError

    if (contactMethod === 'email' && email !== '' && !EmailValidator.validate(email)) {
        emailError = <p className="help is-danger">This email is invalid</p>
    }

    const onSubmit = async () => {
        const body = {
            method: contactMethod,
            message,
            address: email
        }

        const res = await axios.post('/api/contact', body)
        setSuccess('Your message has been sent.')
    }

    return (
        <>
            <Head>
                <title>Contact : Femto Uploader</title>
            </Head>
            <DashboardLayout active="contact">
                <div className="main">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href='/'><a>Femto</a></Link></li>
                            <li className="is-active"><a href="/contact" aria-current="page">Contact</a></li>
                        </ul>
                    </nav>
                    <h1 className="title">
                        Contact
                    </h1>

                    <br />

                    <p>The best way to contact us is via our <a href="https://discord.com/invite/e8keSUN">Discord server</a>.  You may also send your messages to <Obfuscate email="contact@femto.pw" /> or using the form below.</p>

                    <br />
                    <hr />
                    <br />

                    <p className="subtitle">
                        Form
                    </p>

                    <label className="label">Your Contact Details</label>
                    <div className="field has-addons has-addons-left">
                        <p className="control">
                            <span className="select">
                                <select value={contactMethod} onChange={e => setContactMethod(e.target.value)}>
                                    <option value="email">Email</option>
                                    <option value="discord">Discord</option>
                                    <option value="none">None</option>
                                </select>
                            </span>
                        </p>
                        <input type="text" className={`input ${emailError ? 'is-danger' : ''}`} placeholder={placeholder} value={email} onChange={(e) => setEmail(e.target.value)} disabled={contactMethod === 'none'} />
                    </div>
                    <p>{emailError}</p>

                    <div className="field">
                        <label className="label">Message</label>
                        <div className="control">
                            <textarea className="textarea" placeholder="Your message here..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                    </div>

                    {success && <p className="help is-success">{success}</p>}
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link" onClick={() => onSubmit()}>Submit</button>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Contact