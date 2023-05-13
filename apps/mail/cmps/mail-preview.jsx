const { Fragment } = React

import { utilService } from "../../../services/util.service.js"


export function MailPreview({ mail }) {
    const time = utilService.getTimeString(mail.sentAt)
    const isBold = (mail.isRead) ? '' : 'bold' 

    return (
        <Fragment>
           
            <td className={isBold}>{mail.sender.fullname}</td>
            <td className={isBold}>
                <span className=" short-text">
                    {mail.subject}
                </span>
            </td>
            <td className='mail-body-preview short-text' >
                {mail.body}
            </td>
            <td className={isBold}>{time}</td>
        </Fragment>

    )
}