export default function ErrorNotification({ text, onClose, hasBottomPadding = true }) {
    const padding = `0.5rem 2.5rem 0.5rem 1.5rem`

    return (
        <div className="notification is-danger" style={{ padding, marginBottom: hasBottomPadding ? '1.5em' : '0em' }}>
            {onClose && <button className="delete" onClick={() => onClose()}></button>}
            {text}
        </div>
    )
}