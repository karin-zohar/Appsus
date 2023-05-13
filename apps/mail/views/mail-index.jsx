const { useEffect, useState } = React
const { Link, useSearchParams, Outlet, NavLink } = ReactRouterDOM

import { mailService } from '../../mail/services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { MailSidebar } from '../cmps/mail-sidebar.jsx'

export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(searchParams))
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
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
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }


    return (
        <section className="mail-index">
            <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <MailSidebar onSetFilter={onSetFilter} filterBy={filterBy}/>
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
            
            <Outlet />
        </section>
    )
}

