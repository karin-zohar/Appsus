const { useParams, useNavigate, Link } = ReactRouterDOM

// import { MailStar } from "./mail-star.jsx"
import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onRemoveMail }) {
    const navigate = useNavigate()

    function handleMailLineClick(mailId) {
        navigate(`/mail/${mailId}`)
    }


    return (
        <section className="mail-list">

            <table>
                <tbody>
                    {mails.map(mail => 
                        <tr key={mail.id} className={`mail-line ${mail.isRead ? 'read' : ''}`} onClick={() => handleMailLineClick(mail.id)}>
                            {/* <td><MailStar mail={mail} /></td>  */}
                            <td>
                                <button onClick={(event) => onRemoveMail(mail, event)} className="material-symbols-outlined delete-btn icon-bg"></button>
                            </td>
                            <MailPreview mail={mail} />
                        </tr>
                    )}
                </tbody>
            </table>

        </section>
    )
}
