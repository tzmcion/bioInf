import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <div className='Header'>
        <h2 className='Title'>Bioinf Sequence Alignment and Similarity Searching</h2>
        <div className='Links'>
            <Link to='/Theory' className='Link'>Theory</Link>
            <Link to='/Local' className='Link'>Local Alignment</Link>
            <Link to='/Blast' className='Link'>Blast</Link>
        </div>
    </div>
  )
}
