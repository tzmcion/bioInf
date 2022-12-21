import React from 'react';
import Header from '../Header/Header';
import Definitions from '../../utils/Definitions.json';
import { Link } from 'react-router-dom';
import './Theory.css';

interface Params{
    title:string,
    link?:string,
    children:any
}

function Definition({title,children,link}:Params){
    return<div className='Definition'>
        <h2>{title}</h2>
        <h5>{children}</h5>
        {link && <Link to={link}>{link}</Link>}
    </div>
}

export default function Theory() {

    const renderDefinitions = () =>{
        return Definitions.map(def =><li>
            <Definition title={def.title} link={def.link}>{def.definition}</Definition>
        </li>)
    }

  return (
    <div>
        <Header />
        <div className='Theory-Main'>
            <h4>Similarity searches are an essential component of most bioinformatics applications.
                They form the bases of structulal motif identyfication, gene identyfication, and insights into functional associations.
            </h4>
            <h2>Różne Definicje</h2>
            <h3 style={{color:'darkmagenta'}}>Bardzo polecam jeszcza tą stronke na definicje: <a href='http://dictybase.org/db/html/help/glossary.html'>stronka</a></h3>
            <ul>
                {renderDefinitions()}
            </ul>
        </div>
    </div>
  )
}
