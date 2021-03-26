import Field from '../components/Field'
import TextInput from '../components/TextInput'
import RangeInput from '../components/RangeInput'
import CheckboxInput from '../components/CheckboxInput'
import { useState } from 'react'
import Button from '../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCog, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import useStickyState from '../data/useStickyState.js'
import useSettings from '../data/useSettings'

function ConfigTab({ }) {
    const [config, setConfig] = useSettings()
    const [focusTab, setFocusTab] = useState('usability')


    const setSetting = (setting, value) => {
        setConfig(currentConfig => ({ ...currentConfig, [setting]: value }))
    }

    const setFocus = focus => {
        setFocusTab(focus)

        if (focus === 'custom') {
            return
        }

        if (focus === 'security') {
            setSetting('shortLength', 14)
        }

        if (focus === 'usability') {
            setSetting('shortLength', 4)
        }
    }

    return (
        <>
            <label className="label has-text-left">Focus</label>
            <div class="tabs is-toggle is-toggle-rounded">
                <ul>
                    <li className={focusTab === 'security' ? "is-active" : ""} onClick={() => setFocus('security')}>
                        <a>
                            <span className="icon is-small"><FontAwesomeIcon icon={faShieldAlt} /></span>
                            <span>Security</span>
                        </a>
                    </li>
                    <li className={focusTab === 'usability' ? "is-active" : ""} onClick={() => setFocus('usability')}>
                        <a>
                            <span className="icon is-small"><FontAwesomeIcon icon={faBed} /></span>
                            <span>Usability</span>
                        </a>
                    </li>
                    <li className={focusTab === 'custom' ? "is-active" : ""} onClick={() => setFocus('custom')}>
                        <a>
                            <span className="icon is-small"><FontAwesomeIcon icon={faCog} /></span>
                            <span>Custom</span>
                        </a>
                    </li>
                </ul>
            </div>

            <label className="label has-text-left">Password (Not Implemented)</label>
            <div className="field has-addons">
                <div className="control has-icons-right is-expanded">
                    <input type="text" value={config.password} onChange={e => setSetting('password', e.target.value)} className={`input`} />
                </div>
                <p className="control">
                    <Button className="is-danger" onClick={() => setPassword('')}>Clear</Button>
                </p>
            </div>

            <label className="label has-text-left">Short Length (4 - 64)</label>
            <div className="field has-addons">
                <div className="control has-icons-right is-expanded">
                    <input type="text" value={config.shortLength} onChange={e => setSetting('shortLength', e.target.value)} className={`input`} />
                </div>
            </div>
        </>
    )
}

export default ConfigTab;