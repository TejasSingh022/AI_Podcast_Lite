import {Link, useLocation} from 'react-router-dom';

const Navbar =()=>{
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path ? 'text-black' : 'text-gray-500 hover:text-black';
    }

    return(
        <nav className='flex justify-between shadow-md p-4'>
            <div>
                <Link to="/" className='text-2xl font-bold'>Podcast Generator</Link>
            </div>
            <div className='flex gap-40 mr-10'>
                <Link to="/" className={isActive('/')}>Home</Link>
                
            </div>
        </nav>
    )
}

export default Navbar;