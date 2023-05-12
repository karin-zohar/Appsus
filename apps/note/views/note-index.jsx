const { useState, useEffect, useRef } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"

export function NoteIndex() {


    const [notes, setNotes] = useState([])
    const [addNoteMode, setAddNoteMode] = useState(false)
    const inputRef = useRef(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter(searchParams))

    useEffect(() => {
        // console.log('mount')
        loadNotes()
        setSearchParams(filterBy)
    }, [filterBy, addNoteMode])

    function loadNotes() {
        noteService.query(filterBy).then(setNotes)
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
            // showSuccessMsg(`Book (${NoteId}) removed!`)
        })
    }
    function onAddNote() {
        onChangeMode()
        // loadNotes()    // note sure it is needed
    }

    function onChangeMode() {
        setAddNoteMode(prevIsVisible => !prevIsVisible)
    }

    return (
        <section className="note-app">
            <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <section className="note-index">
                {!addNoteMode &&
                    <ul onClick={() => onChangeMode()} className="note-input clean-list flex align-center justify-center" >
                        <div className="add-note-bar">
                            <li>
                                <input ref={inputRef} type="text" name="" id="" placeholder="Take a note..." />
                            </li>
                        </div>
                    </ul>
                }
                {addNoteMode &&
                    <NoteAdd onAddNote={onAddNote} />
                }
            </section>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section>
    )
}
