import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark main-color py-2 sticky-top'>
        <div className='container-fluid'>
          <span className='navbar-brand'>The Knowledge Divers</span>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse'
            data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown'
            aria-expanded='false' aria-label='Toggle Navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='nav-item'><NavLink className='nav-link' to='/home'>Home</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link' to='/search'>Search Books</NavLink></li>
            </ul>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item m-1'><a type='button' className='btn btn-outline-light' href='#'>Sign In</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-light bg-dark p-0">
        <div className="container-fluid">
          <span className="navbar-brand text-white marquee fs-6">
            The information provided in this Website is intended for educational purposes only!!!
          </span>
        </div>
      </nav>
    </>
  );
}