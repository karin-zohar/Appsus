
export function MailCompose() {

    return (
        <section className="mail-compose">
            <section className="compose-title">
                <h2>New Message</h2>
                <div>
                    <button className="close-btn material-symbols-outlined"></button>
                </div>
            </section>
            <section>
                <form >
                    <article className="compose-to">
                        <label htmlFor="to">To:</label>
                        <input type="text" name="to" id="to" />
                    </article>

                    <article className="compose-subject">
                        <label htmlFor="subject">Subject:</label>
                        <input type="text" name="subject" id="subject" />
                    </article>

                    <textarea className="mail-body" name="mail-body"></textarea>

                    <button className="send-btn">Send</button>
                    <button className="delete-btn">Delete</button>

            </form>
        </section>
        </section >
    )
}