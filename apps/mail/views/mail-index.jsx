const {useEffect , useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from '../../mail/services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'


export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState({txt: ''})
    const [mails, setMailss] = useState([])

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then(mails => setMails(mails))
        
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }


    return (
       <section className="mail-index">
        {/* <MailFilter /> */}
        <MailList onSetFilter={onSetFilter} filterBy={filterBy}/>
       </section>
    )
}

