const {useState, useEffect} = React
const { Link, NavLink, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailSidebar({filterBy, onSetFilter}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const navigate = useNavigate()
    const loggedInUser = mailService.getLoggedInUser()

    useEffect(() => {
        onSetFilter(filterByToEdit)
    },[filterByToEdit])

    function handleLinkClick({target}) {
        navigate('/mail?txt=&isRead=&isStarred=&sent=&bin=')
        const field = target.name
        const value = target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    return (
        <section className="mail-sidebar">
            <button><NavLink to="/mail/compose" >Compose</NavLink></button>

            <section className="filtering-links">
                <button onClick={handleLinkClick} name="sent" value={false}>Inbox</button>
                <button onClick={handleLinkClick} name="sent" value={true}>Sent</button>
                <button onClick={handleLinkClick} name="isStarred" value={true}>Starred</button>
                <button onClick={handleLinkClick} name="isRead" value={true}>Read</button>
                <button onClick={handleLinkClick} name="isRead" value={false}>Unread</button>
                <button onClick={handleLinkClick} name="bin" value={true}>Recycling Bin</button>
            </section>
        </section>
    )
}