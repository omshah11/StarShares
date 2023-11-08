import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../user/userSlice'

// import { authActions } from '_store';

export { Nav };

function Nav() {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(logout());

    // only show nav when logged in
    if (!auth) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink to="/" className="nav-item nav-link">Star Shares</NavLink>
                <NavLink to="/aboutus" className="nav-item nav-link">About Us</NavLink>
                <NavLink to="/trending" className="nav-item nav-link">Trending</NavLink>
                <NavLink to="/watchlist" className="nav-item nav-link">Watchlist</NavLink>
                <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
    );
}