import Button from "../components/Button";

function FilesTab({ ...params }) {
    return (
        <>
            <Button {...params} style={{ width: '100%' }}>Upload Files</Button>

            {/* <br />
            <div className="columns">
                <div className="column">
                    <Button {...params} style={{ width: '100%' }}>Upload Files</Button>
                </div>
                <div className="divider is-vertical">OR</div>
                <div className="column">
                    <Button style={{ width: '100%' }}>Start P2P Session</Button>
                </div>
            </div> */}

            {/* <Button {...params} style={{ width: '100%' }}>Upload Files</Button>
            <div>
                <div className="divider">OR</div>
            </div>
            <Button style={{ width: '100%' }}>Start P2P Session</Button> */}

        </>
    )
}

export default FilesTab;