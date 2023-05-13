const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/book-list.jsx"
import { bookService } from "../services/books.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { BookDetails } from "./book-details.jsx"


export function BookIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter(searchParams))

    useEffect(() => {
        // console.log('mount')
        loadBooks()
        // showSuccessMsg('Welcome to the book index!')
        setSearchParams(filterBy)
    }, [filterBy])

    function loadBooks() {
        // console.log('loading...')
        bookService.query(filterBy).then(setBooks)
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            showSuccessMsg(`Book (${bookId}) removed!`)
        })
    }

    // console.log('render')
    return (
        <section className="main-layout">
            <section className="book-index">
                <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                <div className="btn-add-book">
                <Link to="/book/edit">Add book</Link>
                </div>
                <BookList books={books} onRemoveBook={onRemoveBook} />
            </section>
        </section>
    )
}