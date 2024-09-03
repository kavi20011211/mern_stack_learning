import React from 'react'
import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { logout,reset } from '../features/auth/authSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.auth);

    const onLogout=()=>{
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>GoalSetter</Link>
        </div>
        <ul>
        {user ? (
            <li>
                <button className='btn' onClick={onLogout}> Logout
                    <FaSignOutAlt/>
                </button>
            </li>
        ):(<>
            <li>
                <Link to='/login'> Login 
                    <FaSignInAlt/>
                </Link>
            </li>

            <li>
                <Link to='/register'> Register 
                    <FaUser/> 
                </Link>
            </li>
        </>)}
            
        </ul>
    </header>
  )
}

export default Header