import Button from "../components/Button";
import TextInput from "../components/TextInput";
import ErrorNotification from "../components/ErrorNotification"
import { useState } from "react";
import validUrl from 'valid-url';
import axios from 'axios';
import normalizeUrl from 'normalize-url';
import useSettings from "../data/useSettings";

function ShortenTab({ files, setFiles, forceUpdate }) {
    const [error, setError] = useState('')
    const [value, setValue] = useState('')
    const [config, setConfig] = useSettings()

    const shorten = async () => {
        setError('')


        let url
        try {
            url = normalizeUrl(value)
        } catch (e) {
            console.log(e)
            return setError('Not a valid URI')
        }

        if (!validUrl.isUri(url)) {
            return setError('Not a valid URI')
        }

        const existing = files.find(e => e.type === 'url' && e.name === url)

        if (existing) {
            return setError('Already shortened this URI')
        }

        const file = {
            name: url,
            size: url.length,
            progress: 0.01,
            type: 'url'
        }

        setFiles((array) => [...array, file])

        const { data } = await axios.post('/upload/url', {
            url,
            shortLength: config.shortLength,
            expirationTime: config.expirationTime
        })

        file.short = data.short
        file.progress = 1

        forceUpdate()
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            shorten()
        }
    }

    return (
        <>
            {error && <ErrorNotification text={error} onClose={() => { setError('') }} hasBottomPadding={false} />}
            <div className="field has-addons">
                <div className="control has-icons-right is-expanded">
                    <TextInput
                        value={value}
                        setValue={setValue}
                        placeholder={'Link to shorten'}
                        style={{ marginBottom: '0.5em' }}
                        onKeyDown={onKeyDown}
                    />
                </div>
                <p className="control">
                    <Button className="is-info" onClick={() => shorten()}>Shorten URL</Button>
                </p>
            </div>
        </>
    )
}

export default ShortenTab;