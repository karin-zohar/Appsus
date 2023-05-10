const { useEffect, useState } = React

import { utilService } from "../../../services/util.service.js"
import { } from "../../../assets/img/honda.jpg"

export function NotePreview({ note }) {
    const [cmpType, setCmpType] = useState()

    function DynamicCmp(props) {
        console.log(props)
        switch (props.cmpType) {
            case 'NoteTxt':
                return <NoteTxt {...props} />
            case 'NoteImg':
                return <NoteImg {...props} />
            case 'NoteTodos':
                return <NoteTodos {...props} />
            // case 'NoteVideo':
            //     return <NoteVideo {...props} />
        }
    }

    function NoteTxt(props) {
        const { note: { info, style, createdAt } } = props
        return (
            <section>
                <h2>{note.info.title}</h2>
                <h3>{note.info.txt}</h3>
            </section>
        )
    }

    function NoteImg(props) {
        const { note: { info, style, createdAt } } = props
        console.log(note.info.url);
        return (
            <section>
                <h2>{note.info.title}</h2>
                <section>
                    <img src={`../../../assets/img/${note.info.url}.jpg`} alt="note image" />
                </section>
                {/* {`./img/${season}.png`} */}
            </section>
        )
    }

    function NoteTodos(props) {
        const { note: { info, style, createdAt } } = props
        return (
            <section className="note-container">
                <h2>{note.info.title}</h2>
                <section>
                    <TodosList todos={note.info.todos} />
                </section>
            </section>
        )
    }

    function TodosList({ todos }) {
        console.log(todos);
        return (
            <section className="todo-list">
                <div>
                    {todos.map(todo =>
                        <li key={todo.id}>
                            <div className="todo-item">
                                <input type="checkbox" />
                                <h3>{todo.txt}</h3>
                                <button>x</button>
                            </div>
                        </li>
                    )}
                </div>

            </section>
        )
    }

    return (
        <article className="note-preview">
            <span className="note-toolbar material-symbols-outlined pin-note"></span>
            <DynamicCmp cmpType={note.type} note={note} />
            <div className="note-toolbar">
                <span className="material-symbols-outlined trash"></span>
                <span className="material-symbols-outlined color"></span>
                <span className="material-symbols-outlined image"></span>
                <span className="material-symbols-outlined label"></span>
            </div>
        </article>
    )
}