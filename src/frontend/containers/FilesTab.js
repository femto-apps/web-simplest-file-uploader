import Button from "../components/Button";

function FilesTab({ ...params }) {
    return (
        <>
            <Button {...params} style={{ width: '100%' }}>Upload Files</Button>

            {/* <br />
            <div class="columns">
                <div class="column">
                    <Button {...params} style={{ width: '100%' }}>Upload Files</Button>
                </div>
                <div class="divider is-vertical">OR</div>
                <div class="column">
                    <Button style={{ width: '100%' }}>Start P2P Session</Button>
                </div>
            </div> */}

            {/* <Button {...params} style={{ width: '100%' }}>Upload Files</Button>
            <div>
                <div class="divider">OR</div>
            </div>
            <Button style={{ width: '100%' }}>Start P2P Session</Button> */}

        </>
    )
}

export default FilesTab;