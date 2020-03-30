// Returns the URL of a genre image
export const getGenreImageURL = ( name: string, isSelected: boolean ) => {
    return '/images/' + name + ' - ' + ( isSelected ? 'Colored' : 'Mono' ) + '.png';
}