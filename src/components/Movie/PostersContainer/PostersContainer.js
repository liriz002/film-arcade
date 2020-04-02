import React, { useState } from 'react';
import MoviePoster from '../MoviePoster/MoviePoster';
import { useTransition, animated as a } from "react-spring";
import './PostersContainer.css';

const PostersContainer = ({ title, movies }) => {
  const transition = useTransition( movies, movies => movies.tmdbID, {
    from: { opacity: 0, marginLeft: -100 },
    enter: { opacity: 1, marginLeft: 0 }
  });

  console.log(transition);

    let moviesHTML;

    if ( movies && movies.length > 0 ) {
        moviesHTML = <div className="Posters-Container">
          {transition.map(( { item, key, props  } ) => {
            return (
              <a.div key={ key } style={ props }>
                <MoviePoster URL={ item.posterURL } />
              </a.div>
            )
          })}
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

{ movies.map(( movie ) => {
          return (
            <a.div >
            </a.div>
          )
        }) }

            <MoviePoster posterURL={ movie.posterURL } />




*/