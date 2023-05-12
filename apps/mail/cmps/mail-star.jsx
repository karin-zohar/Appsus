const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"

export function MailStar({ mail}) {
    const [isStarred, setIsStarred] = useState(mail.isStarred)
    
    useEffect(() => {
        
      }, []);
 
    useEffect(() => {
        mailService.updateMailProperty(mail.id, 'isStarred', isStarred)
            
    }, [isStarred])

    function onStar() {
        setIsStarred(prevIsStarred => !prevIsStarred)
    }

  
    const starClass = isStarred ? ' icon-bg star starred' : ' icon-bg star'
    const starTitle = isStarred ? 'starred' : 'not starred'

    return (
        <div title={starTitle} className={starClass} onClick={() => onStar()}></div>
    )
}