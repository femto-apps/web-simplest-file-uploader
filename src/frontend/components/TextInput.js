export default function TextInput({ label, placeholder, value, setValue, iconLeft, style, onKeyDown }) {
    return (
        <>
            {label && <label className="label">{label}</label>}
            <div className={`control ${iconLeft ? 'has-icons-left' : ''}`} style={style}>
                <input onKeyDown={onKeyDown} className="input" type="text" placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} />
                {iconLeft && <span className="icon is-small is-left"><i className={`fas ${iconLeft}`}></i></span>}
            </div>
        </>
    )
}