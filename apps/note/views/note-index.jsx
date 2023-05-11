const { useState, useEffect} = React
const { Link, useSearchParams  } = ReactRouterDOM

import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService} from "../services/note.service.js"

export function NoteIndex() {


    const [searchParams, setSearchParams] = useSearchParams()
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter(searchParams))

    useEffect(() => {
        // console.log('mount')
        loadNotes()
        setSearchParams(filterBy)
    }, [filterBy])

    function loadNotes() {
        // console.log('loading...')
        noteService.query(filterBy).then(setNotes)
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({...prevFilterBy, ...filterBy}))
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedBooks = books.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
            // showSuccessMsg(`Book (${NoteId}) removed!`)
        })    
    }

    return (
       <section className="note-app">
        <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy}/>
        <NoteList notes={notes} onRemoveNote={onRemoveNote} />
       </section>
    )
}
