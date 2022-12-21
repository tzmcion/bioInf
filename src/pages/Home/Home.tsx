import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div>
        <Header/>
        <div className='Main-Home'>
            <h2>O czym chcesz się teraz dowiedzieć ?</h2>
            <ul>
                <li><Link to="/Theory" className="Link-Home">Teoria / definicje</Link></li>
                <li><Link to="/Local" className="Link-Home">Local Alignment / Lokalnie działające dopasowania</Link></li>
                <li><Link to="/Blosum" className="Link-Home">Macierze Pam i Blosum, korzystanie i działanie Blasta</Link></li>
            </ul>
        </div>
    </div>
  )
}
