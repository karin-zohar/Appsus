const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { MailStar } from "../cmps/mail-star.jsx"

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()

    }, [mailId])


    function loadMail() {
        mailService.get(mailId)
            .then(mail => mailService.updateMailProperty(mail.id, 'isRead', true))
            .then(setMail)
            .catch(err => {
                console.log('Had issued in mail details:', err);
                navigate('/mail')
            })
    }

    function onRemoveMail(mail, ev) {
        ev.stopPropagation()
        const mailId = mail.id
        if (mail.state !== 'bin') {
            mailService.updateMailProperty(mailId, 'state', 'bin')
                .then(updatedMail => {
                    mail.state = updatedMail.state
                    showSuccessMsg(`Moved to recycle bin`)
                })
                .catch(() => showErrorMsg('Unable to move this mail to recycle bin'))
        }
        else {
            mailService.remove(mailId).then(() => {
                const updatedMails = mails.filter(mail => mail.id !== mailId)
                setMails(updatedMails)
                showSuccessMsg(`The email has been successfully removed.`)
            })
        }
        navigate('/mail')
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return (<h1>loading...</h1>)
    const time = utilService.getTimeString(mail.sentAt)

    return (
        <section className="mail-details">
            <h2>{mail.subject}</h2>
            <article className="sender-info">
                <div className="sender-profile-img">
                    <img src="../../../assets/img/user-img/user-img.png" alt="user profile image" />
                </div>

                <table>
                    <tbody>
                        <tr>
                            <td className="bold" >{mail.sender.fullname}</td>
                            <td className="sender-email">{mail.sender.email}</td>
                            <td className="auto-space"></td>
                            <td className="time">{time}</td>
                            <td><MailStar mail={mail} /></td>
                            <td><div className="reply material-symbols-outlined icon-bg"></div></td>
                            <td>
                                <button onClick={(event) => onRemoveMail(mail, event)} className="material-symbols-outlined delete-btn icon-bg"></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </article>
            <article className="mail-body">
                {mail.body}
            </article>
            <button className="btn" onClick={onBack}>Back</button>
        </section>
    )
}