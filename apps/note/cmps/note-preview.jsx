const { useEffect, useState } = React

import { utilService } from "../../../services/util.service.js"

export function NotePreview({ note }) {
    const [cmpType, setCmpType] = useState()

    function DynamicCmp(props) {
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
            <section className="note-container">
                <h3>{note.info.title}</h3>
                <h4>{note.info.txt}</h4>
            </section>
        )
    }

    function NoteImg(props) {
        const { note: { info, style, createdAt } } = props
        return (
            <section className="note-container">
                <h3>{note.info.title}</h3>
                <section>
                    <img src={`${note.info.url}`} alt="note image" />
                </section>
            </section>
        )
    }

    function NoteTodos(props) {
        const { note: { info, style, createdAt } } = props
        return (
            <section className="note-container">
                <h3>{note.info.title}</h3>
                <section>
                    <TodosList todos={note.info.todos} />
                </section>
            </section>
        )
    }

    function TodosList({ todos }) {
        return (
            <section className="todo-list">
                <div>
                    {todos.map(todo =>
                        <li key={todo.id}>
                            <div className="todo-item">
                                <input type="checkbox" />
                                <h4>{todo.txt}</h4>
                                {/* <button>x</button> */}
                            </div>
                        </li>
                    )}
                </div>

            </section>
        )
    }

    return (
        <article>
            <DynamicCmp cmpType={note.type} note={note} />
        </article>
    )
}
