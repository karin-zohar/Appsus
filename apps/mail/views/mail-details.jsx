const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

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

    return (
        <section className="mail-details">
            <h2>hello details</h2>
        </section>
    )
}