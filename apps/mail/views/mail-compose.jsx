const { useNavigate } = ReactRouterDOM
const { useState, useRef, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailCompose() {
    const navigate = useNavigate()
    const [mail, setMail] = useState(mailService.getEmptyMail())
    const inputRef = useRef()

    function handleChange({ target }) {
        const field = target.name
        const value = target.value || ''
        setMail(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSend(ev) {
        ev.preventDefault()
        mailService.addMail(mail)
        closeCompose()
    }


    function closeCompose() {
        navigate('/mail')
    }



    return (
        <section className="mail-compose">
            <section className="compose-title">
                <h2>New Message</h2>
                <div>
                    <button className="close-btn material-symbols-outlined icon-bg" onClick={() => closeCompose()}></button>
                </div>
            </section>
            <section>
                <form >
                    <article className="compose-to comp-field ">
                        <label htmlFor="receiver" >Recipients:</label>
                        <input required ref={inputRef} type="text" name="receiver" id="receiver" autoFocus onChange={handleChange} />
                    </article>

                    <article className="compose-subject comp-field ">
                        <label htmlFor="subject">Subject:</label>
                        <input type="text" name="subject" id="subject" onChange={handleChange} />
                    </article>

                    <textarea className="mail-body" name="body" id="body" onChange={handleChange}></textarea>

                    <button className="send-btn" type="submit" onClick={(event) => onSend(event)}>Send</button>
                    <button className="delete-btn material-symbols-outlined icon-bg"></button>

                </form>
            </section>
        </section >
    )
}