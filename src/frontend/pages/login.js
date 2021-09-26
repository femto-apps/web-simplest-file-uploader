import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";
import { useRouter } from 'next/router'
import Link from "next/link";
import DashboardLayout from "../containers/DashboardLayout";
import { useState } from "react";
import { loginUser } from "../data/useLogin";

import { toast } from 'react-toastify';

function Login() {
    const [userId, setUserId] = useState("")
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

    async function login() {
        const { success, message } = await loginUser(userId, password)

        if (success) {
            notify("success", "Successfully logged in.")

            if (!router.query.redirect) {
                return router.push('/')
            }

            if (router.query.redirect.startsWith('/register') || router.query.redirect.startsWith('/login')) {
                return router.push('/')
            }

            if (isSameOriginRedirect(router.query.redirect, window.location.href)) {
                return router.push(router.query.redirect)
            }

            return router.push('/')
        } else {
            setError(message)
        }
    }

    return (
        <>
            <Head>
                <title>Login : Femto Uploader</title>
            </Head>
            <DashboardLayout active="register">
                <div className="main">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href='/'><a>Femto</a></Link></li>
                            <li className="is-active"><a href="/login" aria-current="page">Login</a></li>
                        </ul>
                    </nav>
                    <h1 className="title">
                        Login
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

                    <label class="label">Username / Email</label>
                    <p class="control">
                        <input class="input" type="text" onChange={e => setUserId(e.target.value)} value={userId} placeholder="femto" />
                    </p>


                    <div style={{ height: "1rem" }} />

                    <label class="label">Password</label>
                    <p class="control">
                        <input class="input" type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="password" />
                    </p>

                    <br />
                    <div style={{ height: "1rem" }} />
                    <br />

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link is-success" onClick={() => {
                                login()
                            }}>Login</button>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Login