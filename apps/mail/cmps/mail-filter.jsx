
const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilter }) {
    
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
    const { txt, isStarred, isRead } = filterByToEdit

    return (
        <section className="mail-filter">
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange} name="txt" id="txt" type="search" placeholder="Search mail" />

            </form>
        </section>
    )
}