const {useEffect , useState } = React
const { Link, useSearchParams, Outlet, NavLink  } = ReactRouterDOM

import { mailService } from '../../mail/services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'


export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState({txt: ''})
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
    }, [filterBy, mails])

    function loadMails() {
        mailService.query(filterBy)
        .then(mails => setMails(mails))
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }


    return (
       <section className="mail-index">
        <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <MailList mails={mails}/>
        <NavLink to="/mail/compose" >Compose</NavLink>
        <Outlet />
       </section>
    )
}

