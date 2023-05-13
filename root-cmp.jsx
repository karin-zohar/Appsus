const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { MailCompose } from "./apps/mail/views/mail-compose.jsx"

import { UserMsg } from "./apps/book/cmps/user-msg.jsx"
import { BookDetails } from "./apps/book/views/book-details.jsx"
import { AddReview } from "./apps/book/cmps/add-review.jsx"
import { BookEdit } from "./apps/book/views/book-edit.jsx"
import { BookIndex } from "./apps/book/views/book-index.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="compose" element={<MailCompose />} />
                </Route>
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/note" element={<NoteIndex />} />

                <Route path="/book/:bookId" element={<BookDetails />} />
                <Route path="/book/edit/:bookId" element={<BookEdit />} />
                <Route path="/book/edit" element={<BookEdit />} />
                <Route path="/book" element={<BookIndex />} />
                <Route path="/book/:bookId/review" element={<AddReview />} />

            </Routes>
        </section>
        <UserMsg />
    </Router>
}
