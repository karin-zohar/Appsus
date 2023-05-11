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
            <section>
                <h2>{note.info.title}</h2>
                <h3>{note.info.txt}</h3>
            </section>
        )
    }

    function NoteImg(props) {
        const { note: { info, style, createdAt } } = props
        return (
            <section>
                <h2>{note.info.title}</h2>
                <section>
                    <img src={`${note.info.url}`} alt="note image" />
                </section>
                {/* {`../../../assets/img/${note.info.url}.jpg`} */}
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
        <article>
            <DynamicCmp cmpType={note.type} note={note} />
        </article>
    )
}