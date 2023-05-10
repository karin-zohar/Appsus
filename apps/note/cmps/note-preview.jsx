const { useEffect, useState } = React

import { utilService } from "../../../services/util.service.js"

export function NotePreview({ note }) {
    const [cmpType, setCmpType] = useState()

    function DynamicCmp(props) {
        console.log(props)
        switch (props.cmpType) {
            case 'NoteTxt':
                return <NoteTxt {...props} />
            // case 'NoteTodo':
            //     return <NoteTodo {...props} />
            // case 'NoteImg':
            //     return <NoteImg {...props} />
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

    return (
        <article className="note-preview">
            <DynamicCmp cmpType={note.type} note={note} />
        </article>
    )
}