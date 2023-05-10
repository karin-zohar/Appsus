const { useParams, useNavigate, Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx";

export function MailList({mails}) {
    const navigate = useNavigate()

    function goToMailDetails(mailId) {
        navigate(`/mail/${mailId}`)
    }
    
    return (
        <section className="mail-list">
            
            <table>
                <tbody>
                    {mails.map(mail =>
                        <tr key={mail.id} className="mail-line" onClick={() => goToMailDetails(mail.id)}>
                            <td>☠</td>
                           <td>⭐</td>
                            <MailPreview mail={mail}/>
                        </tr>
                        )}
                </tbody>
            </table>

        </section>
    )
}
