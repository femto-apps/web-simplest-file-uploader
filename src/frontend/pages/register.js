import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";
import { useRouter } from 'next/router'
import Link from "next/link";
import DashboardLayout from "../containers/DashboardLayout";
import { useState } from "react";
import Button from "../components/Button";
import { registerUser } from "../data/useRegister";

import { toast } from 'react-toastify';

import { CopyToClipboard } from 'react-copy-to-clipboard'

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const notify = React.useCallback((type, message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }, []);

    const [error, setError] = useState("")

    const router = useRouter()

    async function register() {
        const { success, message } = await registerUser(username, email, password)

        if (success) {
            // return (
            //     <div style="width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;right:0;top:0;text-align:right;align-items:flex-end;">
            //         <div class="notification is-success animate__animated animate__fadeIn animate__faster animate__fadeOut" style="width:auto;pointer-events:auto;display:inline-flex;white-space:pre-wrap;opacity:1;">
            //             <button class="delete"></button>Successfully registered an account.
            //         </div>
            //     </div>
            // )

            notify("success", "Successfully registered an account.")

            // bulmaToast.toast({
            //     message: 'Successfully registered an account.',
            //     type: 'is-success',
            //     dismissible: true,
            //     duration: 2000
            // })

            router.push(router.query.redirect || '/')
        } else {
            setError(message)
        }
    }

    return (
        <>
            <Head>
                <title>Register : Femto Uploader</title>
            </Head>
            <DashboardLayout active="register">
                <div className="main">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href='/'><a>Femto</a></Link></li>
                            <li className="is-active"><a href="/register" aria-current="page">Register</a></li>
                        </ul>
                    </nav>
                    <h1 className="title">
                        Register
                    </h1>

                    <div style={{ height: "1rem" }} />

                    <div class="level">
                        <Link href={`/auth/github?redirect=/`}><a>
                            <button class="button">
                                <FontAwesomeIcon icon={faGithub} style={{ marginRight: "1rem" }} />GitHub
                            </button>
                        </a></Link>
                        {/* <button class="button" style={{ width: "100%" }}>
                            <FontAwesomeIcon icon={faGithub} />
                        </button>
                        <button class="button" style={{ width: "100%" }}>
                            <FontAwesomeIcon icon={faGithub} />
                        </button> */}
                    </div>

                    {error && <div className="notification is-danger" style={{ padding: '0.5rem 2.5rem 0.5rem 1.5rem' }}>
                        {error}
                    </div>}

                    <label class="label">Username*</label>
                    <p class="control">
                        <input class="input" type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="femto" />
                    </p>

                    <div style={{ height: "1rem" }} />

                    <label class="label">Email</label>
                    <p class="control">
                        Registration using email is optional and will only be used for account recovery.
                        <input class="input" type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="contact@femto.dev" />
                    </p>


                    <div style={{ height: "1rem" }} />

                    <label class="label">Password*</label>
                    <p class="control">
                        <input class="input" type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="password" />
                    </p>

                    <br />
                    <div style={{ height: "1rem" }} />
                    <br />

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link is-success" onClick={() => {
                                register()
                            }}>Register</button>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Register