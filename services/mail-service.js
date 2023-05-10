import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Alex Stone'
    }

const demoUser = {
    email: 'alissa@appsus.com',
    fullname: 'Alissa Smith'
}

const labels = ['critical', 'family', 'work', 'friends', 'spam', 'memories', 'romantic']

console.log('hello mail service')
_createMails()

export const mailService = {
    
}



function getEmptyMail(subject='', body='', sender='',receiver='') {
    return {
        id: '',
        subject,
        body,
        isRead: false,
        isStarred: false,
        sentAt: null,
        removedAt: null,
        sender,
        receiver,
        labels: []
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('hi Alex!', 'I am writing to tell you about something interesting that happened today...', demoUser, loggedinUser, ['friends', 'memories']))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
    console.log('mails: ', mails)

}

function _createMail(subject, body, sender, receiver,labels=[]) {
    const mail = getEmptyMail(subject, body, sender, receiver)
    mail.id = utilService.makeId()
    mail.labels = labels
    return mail
}


