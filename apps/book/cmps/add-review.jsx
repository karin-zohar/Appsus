const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/books.service.js"

export function AddReview() {
    const [newReview, setReviewToEdit] = useState(bookService.getEmptyReview())
    const [cmpType, setCmpType] = useState('By Stars')
    const navigate = useNavigate()
    const params = useParams()


    function onBack() {
        navigate((`/book/${params.bookId}`))
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setReviewToEdit(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.addReview(params.bookId, newReview)
        showSuccessMsg('Review saved')
    }

    function DynamicCmp(props) {
        switch (props.cmpType) {
            case 'By Select':
                return <RateBySelect {...props} />
            case 'By Text Box':
                return <RateByTextBox {...props} />
            case 'By Stars':
                return <RateByStars rating={rating} />
        }
    }

    function RateBySelect(props) {
        return (
            <select onChange={handleChange} id="rating" name="rating" value={rating}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        )
    }

    function RateByTextBox(props) {
        return (
            <input onChange={handleChange} value={rating}
                type="text" name="rating" id="rating" />
        )
    }

    function RateByStars({ rating }) {

            function onSetRating(idx) {
              const target = { name: 'rating', value: idx };
              handleChange({ target });
            };
          
            return (
              <div className="star-rating">
                {[...Array(5)].map((star, idx) => {
                  idx += 1;
                  return (
                    <button
                      type="button"
                      key={idx}
                      className={idx <= rating ? 'on' : 'off'}
                      onClick={() => onSetRating(idx)}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })}
              </div>
            );
          
          }

    const { fullname, rating, readAt, description } = newReview

    return (
        <section className="add-review">
            <button onClick={onBack}>X</button>
            <form onSubmit={onSaveReview} className="add-review-form flex flex-column justify-center">

                <label htmlFor="fullname">Full Name:</label>
                <input required onChange={handleChange} value={fullname}
                    type="text" name="fullname" id="fullname" />

                <label htmlFor="rating">Rating:</label>
                <section>
                    <select onChange={(ev) => { setCmpType(ev.target.value)}}>
                        <option value="By Select">Select</option>
                        <option value="By Text Box">Text Box</option>
                        <option value="By Stars">Stars</option>
                    </select>
                </section>
                <DynamicCmp cmpType={cmpType} />

                <label htmlFor="readAt">Read At:</label>
                <input onChange={handleChange} value={readAt} type="date"
                    name="readAt" id="readAt" />

                <label htmlFor="description">Share details of your own experience:</label>
                <textarea onChange={handleChange} value={description} type="text"
                    name="description" id="description" ></textarea>

                <button>Add Review</button>
            </form>
        </section>
    )
}