import React from 'react';
import './Photo.css';

interface photoProps{
    src:string,
    description:string,
    className:string
}

export default function Photo({src,description,className}:photoProps) {
  return (
    <div className={`${className} PD`}>
        <img src={src} alt='probably' />
        <h5>{description}</h5>
    </div>
  )
}
