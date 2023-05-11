const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx"


export function NoteList({ notes, onRemoveNote }) {

    return (
        <section className="note-list">
            <ul>
                {notes.map(note => 
                    <li key={note.id} >
                        <NotePreview note={note} />
                    </li>
                )}
            </ul>
        </section>
    )
}

