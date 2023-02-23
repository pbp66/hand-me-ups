import { NavLink } from "react-router-dom"
import styled from 'styled-components'
import Auth from '../../utils/auth'
import '../../styles/Navbar.css'

const Title = styled.nav`
    color: #414535;
`
const MainDiv = styled.div`
    background-color: #F7FFF6;
`
const NavTitle = styled.nav`
    color: #618985;
    padding: 10px;
    &:hover {
        color: #96BBBB;
    }
    
`
const SearchButton = styled.button `
    background-color: #394648;
    color: #F8E9E9;
`



const Navbar = () => {


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <MainDiv className="container-fluid">
                <NavLink className="navbar-brand" to="/"><Title>Hand Me Ups</Title></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/ShoppingCart"><NavTitle>Cart</NavTitle></NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><NavTitle>
                                Account</NavTitle>
                            </a>
                        </li>
                    </ul>
                            {Auth.loggedIn() ? (<>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Cart">Cart</NavLink>
                            </li>
                        <form className="d-flex justify-content-end" role="search">
                        <input className="form-control me-2 w-50" type="search" placeholder="Search" aria-label="Search" />
                        <SearchButton className="btn btn-outline-success" type="submit">Search</SearchButton>
                    </form>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="/SavedItems"><NavTitle>Saved Items</NavTitle></NavLink></li>
                                <li><NavLink className="dropdown-item" to={`/MyListings/${Auth.getProfile()?.data?._id}`}>My Listings</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/PurchaseHistory"><NavTitle>Purchase History</NavTitle></NavLink></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button
                                        onClick={() => { Auth.logout() }}
                                        className="dropdown-item"
                                    >Logout</button></li>
                            </ul>
                    </>
                    ) :
                    (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/Login"><NavTitle>Login</NavTitle></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/Signup"><NavTitle>Signup</NavTitle></NavLink>
                            </li>
                        </> 
                    )
                }
                </div>
            </MainDiv>
        </nav>

        )
        }


                

                        

                            

export default Navbar