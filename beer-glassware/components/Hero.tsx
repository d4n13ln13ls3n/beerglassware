'use client';

import Image from 'next/image'
import MyButton from './MyButton'
import { useState } from 'react';
import { CustomButtonProps } from '../types';
import SearchBar from './SearchBar';
import DropDown from './DropDown';

const Hero = () => {
  const [showSearchField, setShowSearchField] = useState(false)
  const [showDropDown,setShowDropDown] = useState(false);
  const[showInitialPic,setShowInitialPic] = useState(true);

  const handleSearchField = () => {
      setShowInitialPic(false)
      setShowSearchField(true);
      setShowDropDown(false);
  }

  const handleDropDown = () => {
    setShowInitialPic(false)
    setShowSearchField(false);
    setShowDropDown(true);
  }
    
  return (
    <div className="hero">
      <div className='flex-1 pt-36 padding-x'>
        <h1 className='hero__title'>
          Find the proper glasses to drink a specific beer or beer style
        </h1>
        <p className='hero__subtitle'>
          Type the beer in the search field below or select a style in the dropdown menu
        </p>
        <div className="inline-flex gap-5">
          <MyButton 
            title="Explore glasses by beer"
            className="bg-primary-blue text-white rounded-full mt-10 w-60 h-20"
            onClick={handleSearchField}
          >Explore glasses by beer
          </MyButton>
          <MyButton 
            title="Explore glasses by style"
            className="bg-primary-blue text-white rounded-full mt-10 w-60 h-20"
            onClick={handleDropDown}
          >
            Explore glasses by style
          </MyButton>
        </div>
      </div>
      <div className='hero__image-container'>
        <div className='hero__image'>
          {showInitialPic &&
            <Image src="/beerglasses.jpg" alt="hero" fill className='object-contain'/>
          }
          { showSearchField &&
            <SearchBar />
          }
          { showDropDown &&
            <DropDown beer={''} setBeer={function (beer: string): void {
            throw new Error('Function not implemented.');
          } } />
          }
        </div>
        <div className='hero__image-overlay overflow-hidden' />
      </div>
    </div>
  )
}

export default Hero