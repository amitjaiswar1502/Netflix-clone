import React, { useEffect, useState } from 'react';
import "./Row.css";
import axios from './axios';


const Row = ({ title, fetchUrl, isLargeRow = false }) => {

  const baseURL = "https://image.tmdb.org/t/p/original";

const [movies, setMovies]= useState([]);

useEffect(()=>{
async function fetchData(){
  const request = await axios.get(fetchUrl);
  setMovies(request.data.results);
  return request;
}
fetchData();
},[fetchUrl]);

// console.log(movies);


  return (
    
    <div className='row'>    
      <h2>{title}</h2>
      
      <div className='row-posters'>
      {movies.map((movie)=>
      ((isLargeRow && movie.poster_path) ||
      (!isLargeRow && movie.backdrop_path)) && (

        <img className={`row-poster ${isLargeRow && "row-posterLarge"}`}
        key={movie.id}
        src={`${baseURL}${isLargeRow? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
      ))}

    </div>
    </div>
  )
}

export default Row;
