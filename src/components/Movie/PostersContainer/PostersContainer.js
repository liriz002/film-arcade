import React from 'react';
import MoviePoster from '../MoviePoster/MoviePoster';
import './PostersContainer.css';

const PostersContainer = ({ title, movies }) => {
    let moviesHTML;
    if ( movies && movies.length > 0 ) {
        moviesHTML = 
        <div className="Posters-Container">
      { movies.map(( movie, index ) => {
        return (
          <MoviePoster key={ movie.id } id={ movie.id } URL={ movie.posterURL } />
        )
      }) }
        </div>
    }

    return (
      <div>
        { movies && movies.length > 0 ? <h2 className="Posters-Container-Title">{ title }</h2> : '' }
        { moviesHTML }
      </div>
    )
};

export default PostersContainer;
