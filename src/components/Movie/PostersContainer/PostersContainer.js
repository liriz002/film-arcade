import React, { useState, useEffect } from 'react';
import MoviePoster from '../MoviePoster/MoviePoster';
import { useTransition, animated as a } from "react-spring";
import './PostersContainer.css';

const PostersContainer = ({ title, movies }) => {
    let moviesHTML;
    if ( movies && movies.length > 0 ) {
        moviesHTML = 
        <div className="Posters-Container">
          { movies.map(( movie, index ) => {
            return (
              <MoviePoster id={ movie.id } URL={ movie.posterURL } />
            )
          }) }
        </div>
    }

    return (
      <div>
        <h2 className="Posters-Container-Title">{ title }</h2>
        { moviesHTML }
      </div>
    )
};

export default PostersContainer;

/*

      const [ movies, setMovies ] = useState( [ ] );
  const [ title, setTitle ] = useState( "" );

    transition = useTransition( movies, movie => movie.runtime, {
      from: { opacity: 0, marginLeft: -50 },
      enter: { opacity: 1, marginLeft: 0 }
    });


          {transition.map(( { item, key, props  }) => {
            return (
              <a.div key={ item.id } style={ props }>
                <MoviePoster id={ item.id } URL={ item.posterURL } />
              </a.div>
            )
          })}


*/