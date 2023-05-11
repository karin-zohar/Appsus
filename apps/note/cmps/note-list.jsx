const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx"


export function NoteList({ notes, onRemoveNote }) {

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
                                    <span className="material-symbols-outlined color icon-bg transparent" title="Background color"></span>
                                    <span className="material-symbols-outlined image icon-bg transparent" title="Add image"></span>
                                    <span className="material-symbols-outlined label icon-bg transparent" title="Add label"></span>
                                    <span className="material-symbols-outlined copy icon-bg transparent" title="Duplicate"></span>
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

