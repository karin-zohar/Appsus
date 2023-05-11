const { useNavigate } = ReactRouterDOM
export function MailCompose() {
    const navigate = useNavigate()
    
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
                        <label htmlFor="to">Recipients:</label>
                        <input type="text" name="to" id="to" />
                    </article>

                    <article className="compose-subject comp-field ">
                        <label htmlFor="subject">Subject:</label>
                        <input type="text" name="subject" id="subject" />
                    </article>

                    <textarea className="mail-body" name="mail-body"></textarea>

                    <button className="send-btn">Send</button>
                    <button className="delete-btn material-symbols-outlined icon-bg"></button>

                </form>
            </section>
        </section >
    )
}