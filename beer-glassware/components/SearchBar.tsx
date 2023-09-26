"use client";

import React, { useState } from "react";

// import { SearchBeer } from './';

import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type="submit" className={`-ml-3 z-10 gap-5 ${otherClasses}`}>
        <Image 
            src="/magnifying-glass.svg"
            alt="magnifying glass"
            width={40}
            height={40}
            className="object-contain ml-5"
        />
    </button>
);

const SearchBar = ()=> {
    const [searchedBeer, setSearchedBeer] = useState('')
    
    const router = useRouter()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchedBeer.trim() === '') {
            return alert('Please type a beer name before searching')
        }

        updateSearchParams(searchedBeer.toLowerCase())
    } // 2:22:16

    const updateSearchParams = (searchedBeer: string) => {
        const searchParams = new URLSearchParams(window.location.search);

        if (searchedBeer) {
            searchParams.set('searchedBeer', searchedBeer)
        } else {
            searchParams.delete('searchedBeer')
        }

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`

        router.push(newPathname)
    }

    return (
        <form className="searchbar flex justify-center items-center" onSubmit={handleSearch}>
            <div className="searchbar__item">
                {/* <SearchBeer
                    beer={searchedBeer}
                    setSearchedBeer={setSearchedBeer}
                /> */}
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <div className="searchbar__item">
                <input
                    type="text"
                    name="beer"
                    value={searchedBeer}
                    onChange={(e) => setSearchedBeer(e.target.value)}
                    placeholder="Type the name of the beer you are looking for"
                    className="searchbar__input"
                />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    );
};

export default SearchBar;