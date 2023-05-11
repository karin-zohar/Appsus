const { Fragment } = React

export function MailPreview({ mail }) {

    // const bodyPreview = mail.body.substring(0, 150)

    return (
        <Fragment>
            
            <td>{mail.sender.email}</td>
            <td>
                <span className=" short-text">
                    {mail.subject}
                </span>
            </td>
            <td className='mail-body-preview short-text' >
            {/* {bodyPreview} */}
            {mail.body}
                {/* <span className="short-text">
                    
                </span> */}
            </td>
            <td>{mail.sentAt}</td>
        </Fragment>

    )
}