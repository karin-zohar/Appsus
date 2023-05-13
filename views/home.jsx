const { NavLink } = ReactRouterDOM

export function Home() {
    return <section className="home">
        <h1>Welcome to Appsus.</h1>
        <h3>The only organisation app you'll ever need</h3>

        <section className="home-btns">
            <button><NavLink to="/mail">Mail</NavLink></button>
            <button><NavLink to="/note">Keepster</NavLink></button>
            <button><NavLink to="/book">Books</NavLink></button>
        </section>
    </section>
}