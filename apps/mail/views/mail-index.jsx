import { mailService } from '../../../services/mail-service.js'

const {useEffect } = React

export function MailIndex() {
    mailService.printAll()


    return (
        <div>
            
        </div>
    )
}

