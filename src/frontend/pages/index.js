import { useCallback, useEffect } from 'react'

import Columns from '../components/Columns'
import Column from '../components/Column'
import { useState } from 'react'
import TextInput from '../components/TextInput'
import Tabs from '../components/Tabs'
import TextArea from '../components/TextArea'
import Button from '../components/Button'
import useWarnIfUnsavedChanges from '../containers/WarnIfUnsavedChanges'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faChartArea, faTachometerAlt, faFileUpload, faQuoteLeft, faLink, faCogs, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useDropzone } from 'react-dropzone'

import Link from 'next/link'
import FilesTab from '../containers/FilesTab'
import TextTab from '../containers/TextTab'
import ShortenTab from '../containers/ShortenTab'
import PeerTab from '../containers/PeerTab'
import ConfigTab from '../containers/ConfigTab'
import HeroContainer from '../containers/HeroContainer'
import FileList from '../containers/FileList'
import Links from '../containers/Links'
import FileState from '../modules/FileState'

import axios from 'axios';
import useSettings from '../data/useSettings'

function expiryOutputName(val) {
    const expiry = ['1 hour', '3 hours', '6 hours', '1 day', '3 days', '1 week', '2 weeks', '1 month', '3 months', '6 months', 'never']
    return expiry[Number(val)]
}

function useForceUpdate() {
    const [value, setValue] = useState(0)
    return () => setValue(value => value + 1)
}

function Home(props) {
    const [uploadTypeTab, setUploadTypeTab] = useState('Files')
    const [warnOnChangePage, setWarnOnChangePage] = useState(false)
    const [config, setConfig] = useSettings()

    const [files, setFiles] = useState([])
    const forceUpdate = useForceUpdate()

    useWarnIfUnsavedChanges(warnOnChangePage)

    const uploadFiles = async acceptedFiles => {
        console.log('uploading files', acceptedFiles)

        acceptedFiles.forEach(async (file) => {
            console.log('uploading file', file)

            setFiles((array) => [...array, file])

            console.log('updated set file array')

            const data = new FormData()

            console.log('file', file)

            data.append('upload', file)
            data.append('shortLength', config.shortLength)
            data.append('expirationTime', config.expirationTime)

            console.log('made new form data')

            axios.post('/upload', data, {
                onUploadProgress: (p) => {
                    file.progress = p.loaded / p.total
                    console.log('got progress report', file.progress)
                    forceUpdate()
                }
            })
                .then((req) => {
                    console.log('got post response')

                    file.short = req.data.short
                    forceUpdate()
                }).catch(err => {
                    file.error = err
                    forceUpdate()
                })
        })
    }

    const uploadFile = async file => {
        uploadFiles([file])
    }

    const onDrop = useCallback(async acceptedFiles => {
        console.log('accepting files', acceptedFiles)
        // Do something with the files
        uploadFiles(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        noClick: true
    })

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <HeroContainer className="has-text-centered">
                    <h1 className="title">femto.pw</h1>
                    <h2 className="subtitle">Upload and share files for free</h2>
                    <Columns>
                        <Column />
                        <Column>
                            <Tabs active={uploadTypeTab} setActive={setUploadTypeTab} tabs={[
                                { text: 'Files', icon: faFileUpload },
                                { text: 'Text', icon: faQuoteLeft },
                                { text: 'Shorten', icon: faLink },
                                // { text: 'P2P', icon: faUserFriends },
                                { text: 'Config', icon: faCogs }
                            ]} />
                            <div style={{ paddingBottom: '1.5rem' }}>
                                {uploadTypeTab === 'Files' && <FilesTab onClick={open} />}
                                {uploadTypeTab === 'Text' && <TextTab uploadFile={uploadFiles} />}
                                {uploadTypeTab === 'Shorten' && <ShortenTab files={files} setFiles={setFiles} forceUpdate={forceUpdate} />}
                                {uploadTypeTab === 'Config' && <ConfigTab />}
                                {uploadTypeTab === 'P2P' && <PeerTab />}
                                <FileList files={files} forceUpdate={forceUpdate} />
                            </div>
                            <Links />
                        </Column>
                        <Column />
                    </Columns>
                </HeroContainer>
            </div>
        </>
    )
}

export default Home;