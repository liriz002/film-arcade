// Returns the URL of a genre image
export const getGenreImageURL = ( name, isSelected ) => {
    return '/images/' + name + ' - ' + ( isSelected ? 'Colored' : 'Mono' ) + '.png';
}