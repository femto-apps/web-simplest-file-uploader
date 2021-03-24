import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons"
import { faChartArea, faQuestionCircle, faTachometerAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

function Links({ }) {
    return (
        <>
            <Link href='/faq'>
                <a title="FAQ" style={{ display: 'inline-block', width: '2em' }}>
                    <FontAwesomeIcon style={{ fontSize: '1.25em' }} icon={faQuestionCircle} />
                </a>
            </Link>
            <a title="Stats" style={{ display: 'inline-block', width: '2em' }}>
                <FontAwesomeIcon style={{ fontSize: '1.25em' }} icon={faChartArea} />
            </a>
            <a href="https://github.com/femto-apps/web-simple-file-uploader" title="GitHub" style={{ display: 'inline-block', width: '2em' }}>
                <FontAwesomeIcon style={{ fontSize: '1.25em' }} icon={faGithub} />
            </a>
            <a href="https://discord.com/invite/e8keSUN" title="Discord" style={{ display: 'inline-block', width: '2em' }}>
                <FontAwesomeIcon style={{ fontSize: '1.25em' }} icon={faDiscord} />
            </a>
            <Link href='/uploads'>
                <a title="List Uploads" style={{ display: 'inline-block', width: '2em' }}>
                    <FontAwesomeIcon style={{ fontSize: '1.25em' }} icon={faTachometerAlt} />
                </a>
            </Link>
        </>
    )
}

export default Links