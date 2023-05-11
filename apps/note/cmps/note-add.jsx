const { useState } = React

import { noteService } from "../services/note.service.js"

export function NoteAdd() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    // const [selectedButton, setSelectedButton] = useState(null)
    const { info } = noteToEdit
    const { title, txt, url, todos } = info
    console.log(txt);

    // function handleButtonClick(buttonName) {
    //     setSelectedButton(buttonName)
    // }

    // function DynamicNewNote({ cmpType }) {
    //     switch (cmpType) {

    //         case 'NewTxt':
    //             console.log('Dynamic txt')
    //             return  <NewTxt />
    //         case 'NewImg':
    //             return <NewImg />
    //         case 'NewTodo':
    //             return <NewTodo />
    //         default:
    //             return null
    //     }
    // }

    // function NewTxt() {
    //     console.log('NewTxt')
    //     const { info } = noteToEdit
    //     const { txt } = info
    //     { console.log(info) }
    //     return (
    //         <form onSubmit={onSaveNote}>
    //             <label htmlFor="txt"></label>
    //             <input onChange={handleChange} type="text" name="txt" id="txt" />
    //         </form>
    //     )
    // }

    // function NewImg() {
    //     console.log('NewImg')
    // }

    // function NewTodo() {
    //     console.log('NewTodo')
    // }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        if (field === 'title') {
            setNoteToEdit(prevNote => ({ ...prevNote, info: { ...prevNote.info, title: value } }))
        } else {
            setNoteToEdit(prevNote => ({ ...prevNote, [field]: value }))
        }
       
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        if (!noteToEdit.info) {
            // inputRef.current.focus()
            return
        }

        console.log('Saving...');
        noteService.save(noteToEdit)
            .then(() => {
                // navigate('/note')
            })
            .catch(err => {
                console.log('Had issue to add note:', err);
                // showErrorMsg('Can not save car!')
            })
    }

    return (
        <section>
            <section>
                {/* <button onClick={() => handleButtonClick('NewTxt')}>Take a note...</button>
                <button className="material-symbols-outlined check-box" title="Add check box" onClick={() => handleButtonClick('NewTodo')}></button>
                <button className="material-symbols-outlined image" title="Add image" onClick={() => handleButtonClick('NewImg')}></button> */}
                <form onSubmit={onSaveNote}>
                    <label htmlFor="title"></label>
                    <input onChange={handleChange} type="text" name="title" id="txt" />
                    <button>Add</button>
                </form>
            </section>
            {/* <DynamicNewNote cmpType={selectedButton} /> */}
        </section>
    )
}