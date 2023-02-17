import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineShop } from 'react-icons/ai';

function Home(props) {
  const navigate = useNavigate();
  const id = '1234';
  // const goProduct = () => {
  //   navigate('/products');
  // };
  // const goProductDetail = () => {
  //   navigate(`/product/${id}`);
  // };
  // const goNewProduct = () => {
  //   navigate('/product/new');
  // };
  // const goCart = () => {
  //   navigate('/cart');
  // };
  // const goMyPage = () => {
  //   navigate('/myPage');
  // };
  return (
    <header className='flex justify-between border-b border-gray-700'>
      <Link to='/' className='flex items-center text-4xl'>
        <AiOutlineShop />
        <h1 className=''>Shoppy</h1>
      </Link>
      <nav className=''>
        <Link to='/products' className=''>
          Product
        </Link>
        {/* <Link to={`/product/${id}`}>ProductDetail</Link> */}
        <Link to='/product/new' className=''>
          <BsPencil />
        </Link>
        <Link to='/cart' className=''>
          Cart
        </Link>
        <Link to='/myPage' className=''>
          MyPage
        </Link>
        <span className='border-solid bg-white underline'></span>
      </nav>
    </header>
  );
}

export default Home;
