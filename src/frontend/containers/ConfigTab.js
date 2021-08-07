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
import Router from 'next/router'

function ConfigTab({ }) {
    const [config, setConfig] = useSettings()

    const setSetting = (setting, value) => {
        setConfig(currentConfig => ({ ...currentConfig, [setting]: value }))
    }

    const setFocus = focus => {
        setSetting('focus', focus)

        if (focus === 'custom') {
            return
        }

        if (focus === 'security') {
            setSetting('shortLength', 14)
            setSetting('expirationTime', 604800)
        }

        if (focus === 'usability') {
            setSetting('shortLength', 4)
            setSetting('expirationTime', 0)
        }
    }

    const reload = () => {
        Router.reload(window.location.pathname);
    }

    return (
        <>
            <label className="label has-text-left">Focus</label>
            <div className="tabs is-toggle is-toggle-rounded">
                <ul>
                    <li className={config.focus === 'security' ? "is-active" : ""} onClick={() => setFocus('security')}>
                        <a>
                            <span className="icon is-small"><FontAwesomeIcon icon={faShieldAlt} /></span>
                            <span>Security</span>
                        </a>
                    </li>
                    <li className={config.focus === 'usability' ? "is-active" : ""} onClick={() => setFocus('usability')}>
                        <a>
                            <span className="icon is-small"><FontAwesomeIcon icon={faBed} /></span>
                            <span>Usability</span>
                        </a>
                    </li>
                    <li className={config.focus === 'custom' ? "is-active" : ""} onClick={() => setFocus('custom')}>
                        <a>
                            <span className="icon is-small"><FontAwesomeIcon icon={faCog} /></span>
                            <span>Custom</span>
                        </a>
                    </li>
                </ul>
            </div>

            <label className="label has-text-left">Password (Not Implemented)</label>
            <div className="field has-addons" style={{ marginBottom: '0px' }}>
                <div className="control has-icons-right is-expanded">
                    <input type="text" value={config.password} onChange={e => setSetting('password', e.target.value)} className={`input`} />
                </div>
                <p className="control">
                    <Button className="is-danger" onClick={() => setSetting('password', '')}>Clear</Button>
                </p>
            </div>
            <p class="help" style={{ marginBottom: '10px' }}>Files are not encrypted.  Don't use this service for sensitive data.</p>

            <label className="label has-text-left">Short Length (4 - 64)</label>
            <div className="field has-addons">
                <div className="control has-icons-right is-expanded">
                    <input type="text" value={config.shortLength} onChange={e => setSetting('shortLength', e.target.value)} className={`input`} />
                </div>
            </div>

            <label className="label has-text-left">Expiration Time</label>
            <div className="field select" style={{ width: '100%', marginBottom: '0px' }}>
                <select style={{ width: '100%' }} value={config.expirationTime} onChange={e => setSetting('expirationTime', Number(e.target.value))}>
                    <option value="">Permanent</option>
                    <option value="900">15 minutes</option>
                    <option value="1800">30 minutes</option>
                    <option value="3600">1 hour</option>
                    <option value="21600">6 hours</option>
                    <option value="43200">12 hours</option>
                    <option value="86400">1 day</option>
                    <option value="172800">2 days</option>
                    <option value="259200">3 days</option>
                    <option value="345600">4 days</option>
                    <option value="432000">5 days</option>
                    <option value="518400">6 days</option>
                    <option value="604800">7 days</option>
                    <option value="1209600">14 days</option>
                    <option value="2592000">30 days</option>
                </select>
            </div>
            <p class="help">The file may expire earlier, if the server is configured with a maximum time.</p>

            <br />

            <button style={{ width: '100%' }} className="button is-info" onClick={reload}>
                Apply Settings
            </button>
        </>
    )
}

export default ConfigTab;