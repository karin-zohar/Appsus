const { useState, useEffect} = React

export function NoteFilter({filterBy, onSetFilter}) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { type} = filterByToEdit
    return (
        <section>
            <form onSubmit={onSubmitFilter}>
                <button>🔍</button>
                <input value={type} onChange={handleChange}type="text" placeholder="Search" />
                <button>X</button>
            </form>
        </section>
    )
}

