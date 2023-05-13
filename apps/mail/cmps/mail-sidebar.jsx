const { useState, useEffect } = React
const { Link, NavLink, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailSidebar({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [activeFilter, setActiveFilter] = useState('inbox')
    const navigate = useNavigate()
    const loggedInUser = mailService.getLoggedInUser()

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleLinkClick({ target }) {
        resetFilter()
        const field = target.name
        const value = target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
        setActiveFilter(target.dataset.filter)
    }

    function resetFilter() {
        const emptyFilter = {
            txt: '',
            isRead: '',
            isStarred: '',
            sent: '',
            inbox:'',
            bin: ''
        }
        setFilterByToEdit(prevFilterBy => ({...prevFilterBy, ...emptyFilter}))
    }


    function isActive(filter) {
        return filter === activeFilter ? 'active' : ''
    }

    return (
        <section className="mail-sidebar">
            <button className="compose-btn">
                <span className="compose-btn-icon material-symbols-outlined"></span>
                <NavLink to="/mail/compose" >Compose</NavLink>
            </button>

            <section className="filtering-links">
                <button onClick={handleLinkClick} data-filter="inbox" name="inbox" value={true} className={isActive('inbox')}>Inbox</button>
                <button onClick={handleLinkClick} data-filter="sent" name="sent" value={true} className={isActive('sent')}>Sent</button>
                <button onClick={handleLinkClick} data-filter="starred" name="isStarred" value={true} className={isActive('starred')}>Starred</button>
                <button onClick={handleLinkClick} data-filter="read" name="isRead" value={true} className={isActive('read')}>Read</button>
                <button onClick={handleLinkClick} data-filter="unread" name="isRead" value={false} className={isActive('unread')}>Unread</button>
                <button onClick={handleLinkClick} data-filter="bin" name="bin" value={true} className={isActive('bin')}>Recycling Bin</button>
            </section>
        </section>
    )
}