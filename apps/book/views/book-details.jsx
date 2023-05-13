const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { LongTxt } from "../cmps/long-txt.jsx"
import { ReviewList} from "../cmps/review-list.jsx"
import { bookService } from "../services/books.service.js"
import { utilService } from "../../../services/util.service.js"

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)
    const {bookId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
        loadPrevBookId()
        loadNextBookId()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Had issues in book details:', err);
                navigate('/book')
            })
    }

    function onBack() {
        navigate('/book')
    }

    function pageCount() {
        if (book.pageCount > 500) return 'Serious Reading'
        else if (book.pageCount > 200) return 'Descent Reading'
        else if (book.pageCount < 100) return 'Light Reading'
    }

    function publishedDate() {
        const date = new Date
        const currYear = date.getFullYear()
        const yearsPassed = currYear - book.publishedDate
        if (yearsPassed > 10) return 'Vintage'
        else if (yearsPassed <= 2) return 'New'
    }

    function getBookPrice() {
        let priceText = ''
        priceText += book.listPrice.amount
        priceText += utilService.getCurrencySymbol(book.listPrice.currencyCode)
        return priceText
    }

    function getBookColorClass() {
        if (book.listPrice.amount >= 150) return 'red'
        else if (book.listPrice.amount <= 20) return 'green'
    }

    function onRemoveReview(bookId, reviewId) {
        bookService.removeReview(bookId, reviewId)
        .then(()=>{
            const updatedReviews = book.reviews.filter(review => review.id !== reviewId)
            setBook({...book, reviews:updatedReviews})
            showSuccessMsg('Review saved')
        })
    }

    function loadNextBookId() {
        bookService.getNextBookId(bookId)
        .then(setNextBookId)
    }

    function loadPrevBookId() {
        bookService.getPrevBookId(bookId)
        .then(setPrevBookId)
    }

    function showStars(countStar) {
        return [...Array(5)].map((star, idx) => (
          <span key={idx} className={'star ' + (idx < countStar ? 'on' : 'off')}>
            &#9733;
          </span>
        ))
      }

    if (!book) return <div>Loading...</div>

    return (
        <section className="book-details">
            <h2>{book.title}</h2>
            <h3>Subtitle: {book.subtitle}</h3>
            {book.authors && <h3>Authors: {book.authors.join(', ')}</h3>}
            <h4>Price: <span className={getBookColorClass()}>{getBookPrice()}</span></h4>
            <h4>Page Count: {book.pageCount} | {pageCount()}</h4>
            {book.categories && <h4>Categories: {book.categories.join(', ')}</h4>}
            <h4>Language: {book.language}</h4>
            <img src={book.thumbnail ? book.thumbnail : `../assets/img/10.jpg`} alt="book image" />
            <h2>Description: <LongTxt txt={book.description} /> </h2>
            <h3>Published Date: {book.publishedDate} | {publishedDate()}</h3>
            <button><Link to={`/book/${book.id}/review`}>Add Review</Link></button>
            {book.reviews && book.reviews.length && <ReviewList reviews={book.reviews} showStars={showStars} onRemoveReview={onRemoveReview} bookId={book.id} />}
            <button onClick={onBack}>Back</button>
            <div>
            <button><Link to={`/book/${prevBookId}`}>Previous</Link></button>           
            <button><Link to={`/book/${nextBookId}`}>Next</Link></button>           
            </div>
        </section>
    )
}
