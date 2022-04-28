const SearchResults = ({ searchResults }) => {
  return (  
    <section className='mx-auto px-4 py-2 w-full max-w-screen-lg lg:py-5'>
      {searchResults.isError && (
        <p>Something went wrong. Please try again later.</p>
      )}

      {searchResults.isLoading ? (
        <p>Loading...</p>
      ) : !searchResults.data ? (
        <p className='text-lg lg:text-xl'>No movies found."</p>
      ) : (
        <>
          <p className='text-lg lg:text-xl'>
            ({searchResults.data.length}) movie{searchResults.data.length > 1 && 's'} found.
          </p>
          <ul className='mt-2 divide-y-[1px] divide-yellow-500/30 sm:grid sm:content-start sm:grid-cols-2 sm:justify-evenly sm:gap-x-5 sm:gap-y-2 sm:divide-none lg:mt-3 lg:gap-y-3'>
            {searchResults.data.map((movie) => (
              <li 
                key={movie.imdbID}
                className='flex py-3'
              >
                <div className='grid place-items-center shrink-0 rounded-md border-2 mr-3 p-1 w-24 border-yellow-500 lg:w-40'>
                  <img
                    src={movie.Poster}
                    alt={`Poster image for ${movie.Title}`}
                    className='rounded'
                  />
                </div>
                <div className='flex-1'>
                  <h2 className='text-lg break-words leading-tight lg:text-xl lg:leading-snug'>
                    {movie.Title}
                  </h2>
                  <p className='mt-1 font-mono text-sm lg:text-lg '>
                    ({movie.Year})
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
 
export default SearchResults;