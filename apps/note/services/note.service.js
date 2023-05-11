const NOTE_KEY = 'noteDB'
const gNotes = [
    {
        id: '2bT5zw',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#B2C8DF'
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
            backgroundColor: '#FFB3B3'
        },
        info: {
            title: 'Not to forget!!!',
            todos: [
                { id: 'hid25g',txt: 'Short todo', doneAt: 187441111 },
                { id: 'h4d2n4',txt: 'Coding power a lot...', doneAt: 187111111 },
                { id: '11d2n4',txt: 'Driving license', doneAt: null },
                { id: 'hi3wn4',txt: 'Get this and that now', doneAt: 182563110 },
                { id: 'hid2n4',txt: 'Another tododododod', doneAt: 187111555 },
            ]
        }
    },
    {
        id: '2bzwT5',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#FFDBA4'
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
            backgroundColor: '#F2D388'
        },
        info: {
            title: 'New Note2',
            txt: 'sadf asdfFu asdl lst ac`dvfk Me Baby asdgf asdgf asdg asdgasdfga afg asdfg sdfg sdfg sdfg sdfg sdfg asdfg asd!'
        }
    },
    {
        id: '2bT2zw',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#AF7AB3'
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
            backgroundColor: '#C2DED1'
        },
        info: {
            title: 'New Note4',
            txt: 'asdf ck Ma sdf asdfe Baby!'
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
            backgroundColor: '#CDF0EA'
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
    backgroundColor: '#9AD0EC'
    }
    },
    {
        id: 'k423nT',
        type: 'NoteTodos',
        isPinned: false,
        style: {
            backgroundColor: '#EB6383'
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
            backgroundColor: '#F3D1F4'
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