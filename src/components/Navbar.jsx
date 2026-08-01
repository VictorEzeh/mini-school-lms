import { NavLink } from 'react-router-dom'
import Logout from './Logout'

function Navbar({user}) {
  return (
    <nav className='navbar'>
        <div className="logo">
            Mini School LMS
        </div>

        <div className="nav-links">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/assignments">Assignments</NavLink>
        </div>

        <div className="nav-right">
            <Logout/>
        </div>
    </nav>
  )
}

export default Navbar