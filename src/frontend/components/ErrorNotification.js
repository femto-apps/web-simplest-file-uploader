export default function ErrorNotification({ text }) {
    return (
        <div className="notification is-danger" style={{ padding: '0.5rem 2.5rem 0.5rem 1.5rem' }}>
            {text}
        </div>
    )
}