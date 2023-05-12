const { useState } = React

import { noteService } from "../services/note.service.js"

export function NoteAdd() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [selectedButton, setSelectedButton] = useState()
    const [inputField, setInputField] = useState()
    // const { info } = noteToEdit
    const { info: { title } } = noteToEdit
    
    function handleButtonClick(buttonName) {
        setSelectedButton(buttonName)
      }

    function DynamicNewNote(props) {
        console.log(props.cmpType);
        switch (props.cmpType) {
            case 'Txt':
                console.log('Dynamic txt')
                return <NewTxt />
            case 'NewImg':
                return <NewImg />
            case 'NewTodo':
                return <NewTodo />

        }
    }

    // onChange={handleChange} value={title}
    function NewTxt() {
        console.log('NewTxt')
        { console.log(title) }
        return (
            <form onSubmit={onSaveNote}>
                <label htmlFor="title"></label>
                <input type="text" name="title"  />
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
        console.log(target.value);
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        if (field === 'title') {
            setNoteToEdit(prevNote => ({ ...prevNote, info: { ...prevNote.info, title: value } }))
        } else {
            setNoteToEdit(prevNote => ({ ...prevNote, [field]: value }))
        }
    }

    function onSaveNote(ev) {
        console.log('almost saving');
        ev.preventDefault()
        if (!noteToEdit.info) {
            // inputRef.current.focus()
            return
        }

        console.log('Saving...');
        noteService.save(noteToEdit)
            .then(() => {
                return
            })
            .catch(err => {
                console.log('Had issue to add note:', err);
                // showErrorMsg('Can not save car!')
            })
    }

    return (
        <section>
            <section>
                {/* <button onClick={() => handleButtonClick('Txt')} >Take a note...</button>
                <button className="material-symbols-outlined check-box" title="Add check box" onClick={() => handleButtonClick('NewTodo')}></button>
                <button className="material-symbols-outlined image" title="Add image" onClick={() => handleButtonClick('NewImg')}></button> */}
            </section>
            <DynamicNewNote cmpType={'Txt'} />
        </section>
    )
}
