
export function MailCompose() {

    return (
        <section className="mail-compose">
            <section>
                <h2>New Message</h2>
                <div>
                    <button className="close-btn material-symbols-outlined"></button>
                </div>
            </section>
            <section>
                <form >
                    <article>
                    <label htmlFor="to">To:</label>
                    <input type="text" name="to" id="to"/>
                    </article>
                    
                    <article>
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" name="subject" id="subject"/>
                    </article>

                    {/* <article className="test" contentEditable="true" name="mail-body"></article> */}
                    {/* <textarea name="mail-body" id="mail-body" cols="30" rows="10"></textarea> */}

                </form>
            </section>
        </section>
    )
}