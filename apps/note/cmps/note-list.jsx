const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NotePreview } from "./note-preview.jsx"
import { BackgroundColor } from "./background-color.jsx"

export function NoteList({ notes, onRemoveNote }) {
    const [noteToBeEdited, setNoteToBeEdited] = useState(null)
    const [noteStyle, setNoteStyle] = useState()
    const [colorPaletteVisible, setColorPaletteVisible] = useState(false)
    const noteColor = 'color'

    function onSetNoteStyle(newStyle) {
        console.log(newStyle);
        setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
        setNoteToBeEdited(prevNote => ({ ...prevNote, style: { ...newStyle } }))
        const newNote = { ...noteToBeEdited, style: { ...newStyle } }
        noteService.save(newNote)
    }

    function toggleColorPalette(noteId) {
        console.log(noteId);
        if (!noteId) setColorPaletteVisible((prevVisible) => !prevVisible)
        else {
        noteService.get(noteId)
        .then(setNoteToBeEdited)
        setColorPaletteVisible((prevVisible) => !prevVisible)
    }
    }

    return (
        <section className="note-list">
            <ul>
                {notes.map(note => {

                    const noteBgC = { backgroundColor: `${note.style.backgroundColor}` }

                    return (
                        <li key={note.id} >
                            <section style={noteBgC} className="note-preview">
                                <span className="note-toolbar material-symbols-outlined pin-note icon-bg transparent"></span>
                                <NotePreview note={note} />
                                <div className="note-toolbar">
                                    <span className="material-symbols-outlined trash icon-bg transparent" onClick={() => onRemoveNote(note.id)} title="Delete note"></span>
                                    <span onClick={() => toggleColorPalette(note.id)} className="material-symbols-outlined color icon-bg transparent" title="Background color"></span>
                                    {!!colorPaletteVisible && <BackgroundColor toggleColorPalette={toggleColorPalette} noteColor={noteColor} onSetNoteStyle={onSetNoteStyle} />}
                                    <span className="material-symbols-outlined image icon-bg transparent" title="Add image"></span>
                                    {/* <span className="material-symbols-outlined label icon-bg transparent" title="Add label"></span> */}
                                    {/* <span className="material-symbols-outlined copy icon-bg transparent" title="Duplicate"></span> */}
                                </div>
                            </section>
                        </li>
                    )
                }
                )}
            </ul>
        </section>
    )
}

