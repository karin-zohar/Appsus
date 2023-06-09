// #fdcfe880
// #d7aefb80
// #aecbfa80
// #a7ffeb80
// #cbf0f880
// #ccff9080
// #fff47580
// #FDBC1C80
// #f28b8280
const NOTE_KEY = 'noteDB'
const gNotes = [
    {
        id: '2bT5zw',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#f28b8280'
        },
        info: {
            title: 'Fullstack Me Baby!',
            txt: 'Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby!'
        }
    },
    {
        id: 'krr3wT',
        type: 'NoteTodos',
        isPinned: false,
        style: {
            backgroundColor: '#FDBC1C80'
        },
        info: {
            title: 'Not to forget!!!',
            todos: [
                { id: 'hid25g', txt: 'Short todo', doneAt: 187441111 },
                { id: 'h4d2n4', txt: 'Coding power a lot...', doneAt: 187111111 },
                { id: '11d2n4', txt: 'Driving license', doneAt: null },
                { id: 'hi3wn4', txt: 'Get this and that now', doneAt: 182563110 },
                { id: 'hid2n4', txt: 'Another tododododod', doneAt: 187111555 },
            ]
        }
    },
    {
        id: '2bzwT5',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#fff47580'
        },
        info: {
            title: 'Shortcuts ',
            txt: ` 🍎🍏The apple version: (Thanks Alex Knobbe)Shortcut Action
            Command-A Select All
            Command-B Bold selected text or toggle bold on or off
            Command-C Copy
            Command-F Find
            Command-H Hide windows of currently running application
            Command-I Italicize selected text or toggle italic on or off
            Command-M Minimize
            `
        }
    },
    {
        id: '2g55zw',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#ccff9080'
        },
        info: {
            title: 'Trip to Norway',
            txt: 'Set dates and make sure it works with the car etc.'
        }
    },
    {
        id: '2bT2zw',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#cbf0f880'
        },
        info: {
            title: 'School-',
            txt: 'The teacher will decide about class location, it will be 20/80%'
        }
    },
    {
        id: '2btfzw',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#a7ffeb80'
        },
        info: {
            title: 'Toyota',
            txt: 'Last service 22/7/2022: 182,037km, oil, air filter and brakes. Total 738₪'
        }
    },
    {
        id: '34U3wQ',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXLBoiwVkhYPD_hrDfLt_hOkfdxIFM2lAhtA&usqp=CAU',
            title: 'Memories'
        },
        style: {
            backgroundColor: '#aecbfa80'
        }
    },
    {
        id: '34Udn2Q',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://paradepets.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkxMzY1Nzg4NjczMzIwNTQ2/cutest-dog-breeds-jpg.jpg',
            title: 'New Born'
        },
        style: {
            backgroundColor: '#9AD0EC80'
        }
    },
    {
        id: 'k423nT',
        type: 'NoteTodos',
        isPinned: false,
        style: {
            backgroundColor: '#d7aefb80'
        },
        info: {
            title: 'Get my stuff together',
            todos: [
                { id: 'hihh5g', txt: 'Driving license', doneAt: null },
                { id: 'hg525g', txt: 'Coding power a lot...', doneAt: 187111111 },
                { id: '44d25g', txt: 'Short todo', doneAt: 187441111 },
                { id: 'j865vr', txt: 'Another tododododod', doneAt: 187111555 },
                { id: '32sreQ', txt: 'Get this and that now', doneAt: 182563110 }
            ]
        }
    },
    {
        id: '22g3wQ',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToy_IKw-gmdmTfNu_DqwxO6DaHOE7kvyFLtg&usqp=CAU',
            title: 'Joni and Me'
        },
        style: {
            backgroundColor: '#fdcfe880'
        }
    }
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
    return storageService.query(NOTE_KEY)
        .then(notes => {
            // _filterNotes(notes, filterBy)
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => 
                    regExp.test(note.info.title) ||
                    regExp.test(note.info.txt)
                )
            }

            return notes
        })
}

function _filterNotes(notes, filterBy) {
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        notes = notes.filter(note =>
            regExp.test(note.info.title) ||
            regExp.test(note.info.txt)
            )
    }
    return notes
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
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#ccff9080'
        },
        info: {
            txt: '',
            title: '',
            url: '',
            todos: [],
        }
    }
}

function getDefaultFilter(searchParams = { get: () => {} }) {
    return { 
        txt: searchParams.get('txt') || '',
     }
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