import Field from '../components/Field'
import TextInput from '../components/TextInput'
import RangeInput from '../components/RangeInput'
import CheckboxInput from '../components/CheckboxInput'
import Button from '../components/Button'
import Link from 'next/link'

function PeerTab({ }) {
    return (
        <>
            <label className="label has-text-left">Share this code...</label>
            <div className="field has-addons">
                <div className="control has-icons-right is-expanded">
                    <input type="text" value='http://127.0.0.1:8080/d8fn' className={`input`} disabled />
                </div>
                <p className="control">
                    <Button className="is-info">Copy</Button>
                </p>
            </div>
            <div>
                <div class="divider">OR</div>
            </div>
            <label className="label has-text-left">Enter existing code...</label>
            <div className="control has-icons-right is-expanded">
                <input type="text" className={`input`} />
            </div>
            <br />
            <Link href="/faq#p2p">What is P2P?</Link>
        </>
    )
}

export default PeerTab;