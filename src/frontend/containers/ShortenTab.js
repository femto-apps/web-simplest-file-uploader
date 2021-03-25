import Button from "../components/Button";
import TextInput from "../components/TextInput";
import ErrorNotification from "../components/ErrorNotification"
import { useState } from "react";
import validUrl from 'valid-url';
import axios from 'axios';
import normalizeUrl from 'normalize-url';

function ShortenTab({ setFiles, forceUpdate }) {
    const [error, setError] = useState('')
    const [value, setValue] = useState('')

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

        const file = {
            name: url,
            size: url.length,
            progress: 0
        }

        setFiles((array) => [...array, file])

        const { data } = await axios.post('/upload/url', {
            url
        })

        file.short = data.short
        file.progress = 1

        forceUpdate()
    }

    return (
        <>
            {error && <ErrorNotification text={error} onClose={() => { setError('') }} hasBottomPadding={false} />}
            <div className="field has-addons">
                <div className="control has-icons-right is-expanded">
                    <TextInput value={value} setValue={setValue} placeholder={'Link to shorten'} style={{ marginBottom: '0.5em' }} />
                </div>
                <p className="control">
                    <Button className="is-info" onClick={() => shorten()}>Shorten URL</Button>
                </p>
            </div>
        </>
    )
}

export default ShortenTab;