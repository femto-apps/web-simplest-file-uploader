import Columns from '../components/Columns'
import Column from '../components/Column'
import Link from 'next/link'
import useUser from '../data/useUser'

function DashboardLayout({ children, active }) {
    const { loading, user } = useUser()

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Femto Uploader</h1>
                <p className="subtitle">Upload and share any file for free, instantly from anywhere.</p>
                <hr />
                <Columns>
                    <Column size="is-one-quarter">
                        <aside className="menu sidebar-nav">
                            <p className="menu-label">
                                General
  </p>
                            <ul className="menu-list">
                                <li><Link href="/"><a className={active === 'frontpage' ? 'is-active' : ''}>Frontpage</a></Link></li>
                                <li><Link href="/faq"><a className={active === 'faq' ? 'is-active' : ''}>FAQ</a></Link></li>
                                <li><Link href="/contact"><a className={active === 'contact' ? 'is-active' : ''}>Contact Us</a></Link></li>
                                <li><Link href="/methods"><a className={active === 'methods' ? 'is-active' : ''}>Ways to Upload</a></Link></li>
                            </ul>
                            {
                                !loading && user ? <>
                                    <p className="menu-label">
                                        Uploads
  </p>
                                    <ul className="menu-list">
                                        <li><Link href="/uploads"><a className={active === 'uploads' ? 'is-active' : ''}>List Uploads</a></Link></li>
                                    </ul>

                                    <p className="menu-label">
                                        Account
  </p>
                                    <ul className="menu-list">
                                        <li><Link href="/token"><a className={active === 'token' ? 'is-active' : ''}>Manage Token</a></Link></li>
                                        <li><Link href="/logout"><a>Logout</a></Link></li>
                                    </ul>
                                </> : null
                            }
                            {
                                !loading && !user ? <>
                                    <p className="menu-label">
                                        Account
  </p>
                                    <ul className="menu-list">
                                        <li><Link href={`/auth/github?redirect=/${active}`}><a>Register</a></Link></li>
                                        <li><Link href={`/auth/github?redirect=/${active}`}><a>Login</a></Link></li>
                                    </ul>
                                </> : null
                            }

                        </aside>
                    </Column>
                    <Column size="is-third-quarters">
                        {children}
                    </Column>
                </Columns>
            </div>
        </section>
    )
}

export default DashboardLayout