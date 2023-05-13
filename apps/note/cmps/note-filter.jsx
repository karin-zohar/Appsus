const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilter }) {
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

    const { txt } = filterByToEdit
    return (
        <section className="filter-container">
            <form onSubmit={onSubmitFilter} className="filter-form flex justify-center align-center">
                <span className="material-symbols-outlined magnifier icon-bg transparent"></span>
                <input className="filter-input" onChange={handleChange} name="txt" id ="txt" type="text" placeholder="Search" value={txt}/>
                <button className="btn-filter-cancel" >X</button>
            </form>
        </section>
    )
}

