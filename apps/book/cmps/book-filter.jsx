import { bookService } from "../services/books.service.js"

const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter}) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        // switch (target.type) {
        //     case 'number' :
        //         value = +target.value || ''
        //         break
        //         case 'checkbox':
        //             value = target.value ? 'on sale' : ''
        // }
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }
    const { title, language, maxPageCount, maxPrice} = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter books to meet your desire</h2>

            <form onSubmit={onSubmitFilter}>
                <label htmlFor='title'>Title</label>
                <input value={title} onChange={handleChange} name='title' id='title' type='text' placeholder='By Title' />

                <label htmlFor='language'>Language</label>
                <input value={language} onChange={handleChange} name='language' id='language' type='text' placeholder='By Language' />

                <label htmlFor='maxPageCount'>Max. Page Count</label>
                <input value={maxPageCount} onChange={handleChange} name='maxPageCount' id='maxPageCount' type='number' placeholder='By Max. Page Count' />

                <label htmlFor='maxPrice'>Max. Price</label>
                <input value={maxPrice} onChange={handleChange} name='maxPrice' id='maxPrice' type='number' placeholder='By Max. Price' />

                <button>Apply filters</button>
            </form>
        </section>
    )
}