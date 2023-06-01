import React from 'react';
import "./HomeScreen.css";
import Banner from '../Banner';
import Nav from '../Nav';
import Row from '../Row';
import requests from '../Request';


const HomeScreen = () => {
  return (
    <div className='homeScreen'>
      <Nav />
      <Banner />
      <Row
        title='Netflix Originals'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />

      <Row title='Trending Now' fetchUrl={requests.fetchTrending} />
      <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
      <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
      <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
      <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
      <Row title='Comedy Movies' fetchUrl={requests.fetchTComedyMovies} />
      <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />


    </div>
  )
}

export default HomeScreen;
