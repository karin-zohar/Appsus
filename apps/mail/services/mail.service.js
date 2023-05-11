import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { MailList } from '../cmps/mail-list.jsx'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Alex Stone'
}

const demoUsers = [{
    email: 'alissa@appsus.com',
    fullname: 'Alissa Smith'
},
{
    email: 'ellen@netflix.com',
    fullname: 'Netflix'
},
]

const labels = ['critical', 'family', 'work', 'friends', 'spam', 'memories', 'romantic']

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    updateMailProperty,
    addMail
}

function query(filterBy = {}) {
    // console.log('filterBy service:', filterBy)
    return storageService.query(MAIL_KEY)
        .then(mails => filterMails(mails, filterBy))
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function filterMails(mails, filterBy) {
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail =>
            regExp.test(mail.subject) ||
            regExp.test(mail.body) ||
            regExp.test(mail.sender))
    }

    if (filterBy.isRead) {
        mails = mails.filter(mail => mail.isRead === filter.isRead)
    }

    if (filterBy.isStarred) {
        mails = mails.filter(mail => mail.isStarred === filter.isStarred)
    }

    return mails
}

function updateMailProperty(mailId, field, newValue) {
    // console.log('mailId: ', mailId)
    // console.log('field: ', field)
    // console.log('newValue: ', newValue)
    // const mail = get(mailId)
    // console.log('mail: ', mail)
    // mail[field] = newValue
    // save(mail)
    console.log('update mail property')
}

function addMail(mail) {
    mail.sentAt = new Date
    console.log('mail.sentAt: ', mail.sentAt)
    mail.state = 'sent'
    mail.sender = loggedinUser
    console.log('mail: ', mail)
    console.log('mail.id: ', mail.id)
    save(mail)
}


function getEmptyMail(subject = '', body = '', sender = '', receiver = '') {
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
        state: 'draft',
        labels: []
    }
}

function getDefaultFilter(searchParams = { get: () => { } }) {
    return {
        txt: searchParams.get('txt') || '',
        isRead: searchParams.get('isRead') || '',
        isStarred: searchParams.get('isStarred') || '',
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('hi Alex!',
            'I am writing to tell you about something interesting that happened today. You are not going to believe it!', demoUsers[0], loggedinUser, ['friends', 'memories']))
        mails.push(_createMail('Good news!', `I hope you've been doing well! can we meet up soon? I have somehtingto tell you`, demoUsers[0], loggedinUser, ['work']))
        mails.push(_createMail(`Don't miss out on our exclusive offer!`, `Hey there,

        We wanted to remind you that our exclusive offer is ending soon. This is your last chance to take advantage of our special discount and get 20% off your next purchase. Don't miss out!
        
        Visit our website and use the promo code SAVE20 at checkout to claim your discount. We hope to see you soon!
        
        Best,
        The Sales Team`, demoUsers[1], loggedinUser, ['spam']))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, sender, receiver, labels = []) {
    const mail = getEmptyMail(subject, body, sender, receiver)
    mail.id = utilService.makeId()
    mail.labels = labels
    mail.sentAt = new Date
    return mail
}


