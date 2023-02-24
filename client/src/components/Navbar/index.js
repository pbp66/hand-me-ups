import { NavLink } from "react-router-dom"
import Auth from '../../utils/auth'
import '../../styles/Navbar.css'


const Navbar = () => {


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Hand Me Ups</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {Auth.loggedIn() ? (<>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Cart">Cart</NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/Favorites">Favorites</NavLink></li>
                                    <li><NavLink className="dropdown-item" to={`/MyListings/${Auth.getProfile()?.data?._id}`}>My Listings</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/PurchaseHistory">Purchase History</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button
                                        onClick={() => { Auth.logout() }}
                                        className="dropdown-item"
                                    >Logout</button></li>
                                </ul>
                            </li>
                        </>
                        )
                            : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to="/Login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to="/Signup">Signup</NavLink>
                                    </li>
                                </>

                            )



                        }



                    </ul>
                    <form className="d-flex justify-content-end" role="search">
                        <input
                            className="form-control me-2 w-50"
                            type="search"
                            placeholder="Search"
                            aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div >
            </div >
        </nav >

    )
}

export default Navbar