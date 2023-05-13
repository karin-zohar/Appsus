import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { MailList } from '../cmps/mail-list.jsx'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Alex Stone'
}


const labels = ['critical', 'family', 'work', 'friends', 'spam', 'memories', 'romantic', 'shopping']

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    updateMailProperty,
    addMail,
    getLoggedInUser
}

function query(filterBy = {}) {
    console.log('filterBy service:', filterBy)
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

function getLoggedInUser() {
    return loggedinUser
}

function filterMails(mails, filterBy) {
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail =>
            regExp.test(mail.subject) ||
            regExp.test(mail.body) ||
            regExp.test(mail.sender.fullname) ||
            regExp.test(mail.sender.email)) 
    }

    if (filterBy.isStarred === 'true') {
        mails = mails.filter(mail => mail.isStarred === true)
    }
    
    if (filterBy.isRead === 'true') {
        mails = mails.filter(mail => mail.isRead === true)
    }

    if (filterBy.isRead === 'false') {
        mails = mails.filter(mail => !mail.isRead)
    }

    if (filterBy.inbox === 'true') {
        mails = mails.filter(mail => mail.sender.email !== loggedinUser.email)
    }
    
    if (filterBy.sent === 'true') {
        mails = mails.filter(mail => mail.sender.email === loggedinUser.email)
    }
    
    if (filterBy.bin === 'true') {
        mails = mails.filter(mail => mail.state === 'bin')
    }

    return mails
}

function updateMailProperty(mailId, field, newValue) {
    return get(mailId)
        .then(mail => {
            mail[field] = newValue
            return save(mail)
        })
}

function addMail(mail) {
    mail.sentAt = (new Date()).toISOString()
    mail.state = 'sent'
    mail.sender = loggedinUser
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
        sent: searchParams.get('sent') || '',
        inbox: searchParams.get('inbox') || '',
        bin: searchParams.get('bin') || ''
    }
}

// demo data
function _createMails() {
    const demoUsers = [{
        email: 'alissa@appsus.com',
        fullname: 'Alissa Smith'
    },
    {
        email: 'newsletter@laudible.com',
        fullname: 'Laudible.com'
    },
    {
        email: 'MichaelCo@Koogle.com',
        fullname: 'Michael Cohen'
    },
    {
        email: 'Leah@placebook.com',
        fullname: 'Leah Aharon'
    },
    {
        email: 'marketing@petflix.com',
        fullname: 'Petflix'
    },
    {
        email: 'logistics@lammazon.com',
        fullname: 'Lammazon'
    },
    {
        email: 'marketing@scotify.com',
        fullname: 'Scotify'
    },
    {
        email: 'ordering@Baliexpress.com',
        fullname: 'Bali Express'
    },
    {
        email: 'moo@moolingo.com',
        fullname: 'Moolingo'
    },
    {
        email: 'updates@winstagram.com',
        fullname: 'Winstagram'
    },
    {
        email: 'updates@twistcord.com',
        fullname: 'Twistcord'
    },

    ]
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []

        mails.push(_createMail('2023-05-17T03:24:00',
            'Super exciting news',
            'How are you? Let me know when we can meet up. Something VERY interesting that happened today. You are not going to believe it!',
            demoUsers[0],
            loggedinUser,
            ['friends', 'memories']))

        mails.push(_createMail('2023-05-17T03:24:00',
            'Reminder: Upcoming Meeting with John',
            `Dear Alex,
        
        I just wanted to remind you about our upcoming meeting with John tomorrow at 10am in Conference Room A. We'll be discussing the latest project updates and timelines, so please come prepared with any questions or concerns you may have.
        
        Looking forward to seeing you there.
        
        Best regards,
        Michael`,
            demoUsers[2],
            loggedinUser,
            ['work']))

        mails.push(_createMail('2023-05-17T03:24:00',
            'Job Interview Invitation',
            `Thank you for submitting your application for the Marketing Manager position at our company. We were impressed with your qualifications and experience, and would like to invite you for an interview at our office next week.
            Our hiring assistant will reach out to you soon to coordinate a date and time for the interview.
            We look forward to meeting you in person and learning more about your skills and background.
            
            Best regards,
            The Hiring Team`,
            demoUsers[3],
            loggedinUser,
            ['work', 'critical']))

        mails.push(_createMail('2023-05-14T03:08:00',
            'New deals arrive every month!',
            `We have an amazing deal for you! Shop this month's fresh selection.`,
            demoUsers[1],
            loggedinUser,
            ['spam']))

        mails.push(_createMail('2023-05-13T08:24:00',
            'Discover our most watched shows',
            `Breaking Bird, Orangutan is the New Black and Wooflyn 99 are already waiting for your next petflix & cheetah session. So what are you waiting for?
             Grab some popcorn and enjoy the show!`,
            demoUsers[4],
            loggedinUser,
            ['spam'])) 

        mails.push(_createMail('2023-05-09T14:34:00',
            'Your order is on its way',
            `This email is to inform you that your order has been dispatched and will reach your destination soon.
                It will arrive by drone within 5 business hours. You are advised to stay indoors to avoid getting hit on the head by a heavy package.`,
            demoUsers[5],
            loggedinUser,
            ['shopping']))

        mails.push(_createMail('2023-04-30T15:21:00',
            'Playlists made just for you.',
            `Meet your personalized playlists. We made them just for you, full of songs we think you'll love.`,
            demoUsers[6],
            loggedinUser,
            ['spam']))

        mails.push(_createMail('2023-04-28T10:14:00',
            'Order 3021704758 has shipped.',
            `Your order has shipped! You can click below to check your delivery status or see more details.`,
            demoUsers[7],
            loggedinUser,
            ['spam']))

        mails.push(_createMail('2023-04-27T03:16:00',
            '2023 is the year you learn a language',
            `Are you ready to get back to your awesome language studies? 
            Unlock a year full of adventure, opportunities, and self-improvement by spending 5 minutes a day on Moolingo!`,
            demoUsers[8],
            loggedinUser,
            ['spam']))

        mails.push(_createMail('2023-04-26T08:45:00',
            `See what's been happening on Winstagram`,
            `You have 39 notifications you may have not seen. 
            12 of your friends have posted on Winstagram today. See what they are up to! `,
            demoUsers[9],
            loggedinUser,
            ['spam']))

        mails.push(_createMail('2023-04-23T18:08:00',
            `You have 5 unread messages`,
            `Hi Alex,
            Your friends are messaging you on Twistcord. Don't leave them lonely! 
            Log in to Twistcord and hop on a call whenever you're ready. `,
            demoUsers[10],
            loggedinUser,
            ['friends']))

        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(date, subject, body, sender, receiver, labels = []) {
    const mail = getEmptyMail(subject, body, sender, receiver)
    mail.id = utilService.makeId()
    mail.labels = labels
    mail.sentAt = (new Date(date)).toISOString()
    mail.isRead = false
    return mail
}


