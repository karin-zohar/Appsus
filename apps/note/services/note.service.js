const NOTE_KEY = 'noteDB'
const gNotes = [
    {
        id: '2bT5zw',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: 'Bobi and Me',
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: '2bzwT5',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: 'New Note1',
            txt: 'Fullsasdf asdfa asdf dfa asdf a asdfasdf!'
        }
    },
    {
        id: '2g55zw',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: 'New Note2',
            txt: 'sadf asdfFu asdl lst ack Me Baby asd!'
        }
    },
    {
        id: '2bT2zw',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: 'New Note3',
            txt: 'Full sadstaas asdf aadf adf!'
        }
    },
    {
        id: '2btfzw',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: 'New Note4',
            txt: 'asdf ck Ma sdf asdfe Baby!'
        }
    },
    // {
    // id: '34Udn2Q',
    // type: 'NoteImg',
    // isPinned: false,
    // info: {
    // url: 'http://some-img/me',
    // title: 'Bobi and Me'
    // },
    // style: {
    // backgroundColor: '#00d'
    // }
    // },
    // {
    // id: 'k423nT',
    // type: 'NoteTodos',
    // isPinned: false,
    // info: {
    // title: 'Get my stuff together',
    // todos: [
    // { txt: 'Driving license', doneAt: null },
    // { txt: 'Coding power', doneAt: 187111111 }
    // ]
    // }
    // }
]

import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter
}

function query(filterBy = {}) {
    // console.log('filterBy service:', filterBy)
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.type) {
                const regExp = new RegExp(filterBy.title, 'i')
                notes = notes.filter(note => regExp.test(note.title))
            }

            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote() {
    return {
        id: '',
        createdAt: new Date().getTime,
        type: '',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: ''
        }
    }
}

function getDefaultFilter() {
    return { type: '' }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = gNotes
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote() {
    const note = getEmptyNote()
    note.id = utilService.makeId()
    return note
}