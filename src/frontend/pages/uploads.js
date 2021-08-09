import { faEdit, faPencilAlt, faTachometerAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import DashboardLayout from "../containers/DashboardLayout";
import useUploads, { deleteUpload } from "../data/useUploads";

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ErrorNotification from "../components/ErrorNotification";
import errors from "../data/errors";
import { useCallback, useState } from "react";
dayjs.extend(relativeTime)

function Uploads() {
    const { loading: uploadsLoading, data: uploadsData, error: uploadsError, mutate: uploadsMutate } = useUploads()
    const [checkRemove, setCheckRemove] = useState()
    let modal

    if (checkRemove) {
        modal = (
            <div className={`modal ${checkRemove ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Are you sure?</p>
                        <button className="delete" onClick={() => setCheckRemove(false)}></button>
                    </header>
                    <section className="modal-card-body">
                        Are you sure you wish to delete this item?
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-danger" onClick={() => { deleteUpload(checkRemove); setCheckRemove(false) }}>Delete</button>
                        <button className="button" onClick={() => setCheckRemove(false)}>Cancel</button>
                    </footer>
                </div>
            </div>
        )
    }

    return (
        <div className={checkRemove ? 'is-clipped' : ''}>
            <Head>
                <title>Manage Uploads : Femto Uploader</title>
            </Head>
            {modal}
            <DashboardLayout active="uploads">
                <div className="main">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href='/'><a>Femto</a></Link></li>
                            <li className="is-active"><a href="/contact" aria-current="page">List Uploads</a></li>
                        </ul>
                    </nav>
                    <h1 className="title">
                        Your Uploads
                    </h1>
                    {uploadsError && <ErrorNotification text={errors(uploadsError)} />}
                    {!uploadsError && uploadsLoading && <p>Loading...</p>}
                    {!uploadsError && !uploadsLoading &&
                        <table className="table is-hoverable is-fullwidth">
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Uploaded</th>
                                    <th>Views</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {uploadsData.items.map((item, index) =>
                                    <tr key={index}>
                                        <td><a href={`/${item.short}`}>{item.name || item.url}</a></td>
                                        <td>{dayjs().to(item.createdAt)}</td>
                                        <td>{item.views || 0}</td>
                                        <td>
                                            <a title="Remove" onClick={() => setCheckRemove(item)} style={{ display: 'inline-block', width: '2em' }}>
                                                <FontAwesomeIcon style={{ fontSize: '1.25em' }} icon={faTrash} />
                                            </a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                </div>
            </DashboardLayout>
        </div>
    )
}

export default Uploads