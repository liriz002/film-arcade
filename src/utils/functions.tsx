// Returns the URL of a genre image
export const getGenreImageURL = ( name: string, isSelected: boolean ) => {
    return '/images/' + name + ' - ' + ( isSelected ? 'Colored' : 'Mono' ) + '.png';
}

// Returns a string with the number of hours and minutes from a total number of minutes
export const getHoursAndMinutesFromMinutes = ( totalMinutes: number ) => {
    if ( totalMinutes < 60 ) {
        return totalMinutes + "m";
    }

    let hours = Math.floor( totalMinutes / 60 );
    let minutes = totalMinutes % 60; 
    let str = "";

    str += hours + "h";

    // If the minutes are not 0, we add them to the return string
    if ( minutes != 0 ) {
        str += " " + minutes + "m";
    }

    return str;
};

// Returns a string that contains the proper HTML for showing genres
export const buildGenresHTML = ( genre1: String, genre2: String, genre3: String, genre4: String ) => {
    let genresHTML = "";

    if ( genre1 ) {
        genresHTML += genre1;
    }

    if ( genre2 ) {
        genresHTML += '<span className="Genre-Divider"></span>' + genre2;
    }

    if ( genre3 ) {
        genresHTML += '<span className="Genre-Divider"></span>' + genre3;
    }

    if ( genre4 ) {
        genresHTML += '<span className="Genre-Divider"></span>' + genre4;
    }

    return genresHTML;
}

export const getGenresArray = ( genre1: string, genre2: string, genre3: string, genre4: string ) => {
    let genresArr = [];

    if ( genre1 ) {
        genresArr.push( genre1 );
    }    

    if ( genre2 ) {
        genresArr.push( genre2 );
    }

    if ( genre3 ) {
        genresArr.push( genre3 );
    }

    if ( genre4 ) {
        genresArr.push( genre4 );
    }

    return genresArr;
};