import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineShop } from 'react-icons/ai';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {};

// Initialize Firebase
window.localStorage.clear();
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
let user;
let Luser = JSON.parse(localStorage.getItem('user'));
let Ltoken = JSON.parse(localStorage.getItem('token'));

function Home(props) {
  const [logined, setLoinged] = useState(false);
  if (Ltoken) {
    user = Luser;
    setLoinged(true);
  }
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        user = result.user;
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log('successfully token!', token);
        console.log('successfully user!', user);

        setLoinged(true);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleLogout = () => {
    window.localStorage.clear();
  };

  return (
    <header className='flex p-2 justify-between border-b border-gray-700'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <AiOutlineShop />
        <h1 className='px-3'>Shoppy</h1>
      </Link>
      <nav className='flex gap-4 items-end font-semibold'>
        <Link to='/products' className=''>
          Product
        </Link>
        {/* <Link to={`/product/${id}`}>ProductDetail</Link> */}
        <Link to='/product/new' className='text-2xl'>
          <BsPencil />
        </Link>
        <Link to='/cart' className=''>
          Cart
        </Link>
        <Link to='/myPage' className=''>
          MyPage
        </Link>
        {logined ? (
          <>
            <img className='rounded-full text-2xl' src={user.photoURL} alt='userface'></img>
            <span className='hover:cursor-pointer' onClick={handleLogout}>
              Logout
            </span>
          </>
        ) : (
          <span className='hover:cursor-pointer' onClick={handleLogin}>
            Login
          </span>
        )}

        <span className='border-solid bg-white underline'></span>
      </nav>
    </header>
  );
}

export default Home;
