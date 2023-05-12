const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { utilService} from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
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
        .then(setMail)
        .catch(err => {
            console.log('Had issued in mail details:', err);
            navigate('/mail')
        })
    }
    
    if (!mail) return (<h1>loading...</h1>)
    // console.log('mail.sentAt: ', mail.sentAt)
    const time = utilService.getTimeString(mail.sentAt)
    
    return (
        <section className="mail-details">
            <h2>{mail.subject}</h2>
            <article className="sender-info">
                <div className="sender-profile-img">
                    <img src="" alt="" />
                </div>

                <table>
                    <tbody>
                        <tr>
                            <td>{mail.sender.fullname}</td>
                            <td>{mail.sender.email}</td>
                            <td>{time}</td>
                            <td><MailStar mail={mail}/></td>
                            <td><div className="reply material-symbols-outlined icon-bg"></div></td>
                            
                        </tr>
                    </tbody>
                </table>
            </article>
            <article className="mail-body">
                {mail.body}
            </article>
        </section>
    )
}