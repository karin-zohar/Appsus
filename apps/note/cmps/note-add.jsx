const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function NoteAdd({ onAddNote }) {
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [selectedButton, setSelectedButton] = useState()
    const { title, txt, style } = noteToAdd
    
    useEffect(() => {

    }, [])

    // onChange={handleChange} value={title}
    function NewTxt() {
        console.log('NewTxt')
        { console.log(title) }
        return (
            <form onSubmit={onSaveNote}>
                <label htmlFor="title"></label>
                <input type="text" name="title" />
                <button>Add</button>
            </form>
        )
    }

    function NewImg() {
        console.log('NewImg')
    }

    function NewTodo() {
        console.log('NewTodo')
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        if (field === 'title' || field === 'txt') {
            setNoteToAdd(note => ({ ...note, info: { ...note.info, [field]: value } }))
        } else {
            setNoteToAdd(note => ({ ...note, [field]: value }))
        }
    }

    function onSaveNote(ev) {
        console.log('almost saving');
        ev.preventDefault()
        if (!noteToAdd.info) {
            // inputRef.current.focus()
            return
        }

        console.log('Saving...');
        noteService.save(noteToAdd)
            .then(() => {
                onAddNote()
            })
            .catch(err => {
                console.log('Had issue to add note:', err);
                // showErrorMsg('Can not save note!')
            })
    }

    return (
        <section className="note-add-container flex justify-center align-center">
            <ul className="note-add-form flex clean-list">
                <form onSubmit={onSaveNote} className="inputs-form">
                    <li className="inputs-li flex column">
                        <label htmlFor="title"></label>
                        <input className="input-title" value={title} onChange={handleChange} name="title" id="title" type="text" placeholder="Title" />
                        <textarea className="input-txt" required value={txt} onChange={handleChange} name="txt" id="text" type="text" placeholder="Take a note" rows="2"></textarea>
                    </li>
                    <li className="input-btns flex row align-center justify-center space-between">
                        <span className="material-symbols-outlined trash icon-bg transparent" onClick={() => onAddNote()} title="close"></span>
                        {/* <span className="material-symbols-outlined color icon-bg transparent" title="Background color"></span> */}
                        {/* <span className="material-symbols-outlined image icon-bg transparent" title="Add image"></span> */}
                    </li>
                </form>
            </ul>
            <section>
                
            </section>

        </section>
    )
}
