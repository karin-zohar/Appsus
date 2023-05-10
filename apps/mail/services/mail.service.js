import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

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
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter
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
        mails.push(_createMail('hi Alex!', 'I am writing to tell you about something interesting that happened today...', demoUser, loggedinUser, ['friends', 'memories']))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
    console.log('mails: ', mails)

}

function _createMail(subject, body, sender, receiver, labels = []) {
    const mail = getEmptyMail(subject, body, sender, receiver)
    mail.id = utilService.makeId()
    mail.labels = labels
    return mail
}


