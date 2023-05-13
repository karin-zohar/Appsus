import { utilService } from "../../../services/util.service.js"

export function BookPreview({ book }) {

    function pageCount() {
        if (book.pageCount > 500) return 'Serious Reading'
        else if (book.pageCount > 200) return 'Descent Reading'
        else if (book.pageCount < 100) return 'Light Reading'
    }

    function publishedDate() {
        const date = new Date
        const currYear = date.getFullYear()
        const yearsPassed = currYear - book.publishedDate
        if (yearsPassed > 10) return ' -Vintage'
        else if (yearsPassed <= 2) return ' -New'
    }

    const listPrice = book.listPrice
    return (
        <article className="book-preview">
            <h2>Book Title: {book.title}</h2>
            <h4>Published Date: {book.publishedDate}{publishedDate()}</h4>
            <div className="img-container">
                <img src={book.thumbnail} alt="book image" />
                {/* {book.listPrice.isOnSale && (
                    <img className="on-sale" src="../assets/img/sale.png" alt="sale img" />
                )} */}
            </div>
            <h4>{pageCount()}</h4>
            <h4>Book Price: {listPrice.amount}{` [${listPrice.currencyCode}]`}</h4>
        </article>
    )
}