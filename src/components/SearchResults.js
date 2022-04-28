import { data } from "autoprefixer";

const SearchResults = ({ 
  searchResults, 
  onNextPage,
}) => (  
  <section className='mx-auto px-4 py-2 w-full max-w-screen-lg lg:py-5'>
    {searchResults.isError && (
      <p>Something went wrong. Please try again later.</p>
    )}

    {searchResults.isLoading ? (
      <p>Loading...</p>
    ) : (searchResults.data && searchResults.data.length === 0) ? (
      <p className='text-lg lg:text-xl'>No movies found.</p>
    ) : (searchResults.data && searchResults.data.length > 0) && (
      <>
        <p className='text-lg lg:text-xl'>
          ({searchResults.data.length}) movie{searchResults.data.length > 1 && 's'} found.
        </p>
        <ul className='mt-2 divide-y-[1px] divide-yellow-500/30 sm:grid sm:content-start sm:grid-cols-2 sm:justify-evenly sm:gap-x-5 sm:gap-y-2 sm:divide-none lg:mt-3 lg:gap-y-3'>
          {searchResults.data.map((movie) => (
            <li 
              key={movie.imdbID}
              className="grid" 
            >
              <a 
                href={'https://www.imdb.com/title/' + movie.imdbID}
                target='_blank'
                rel='noreferrer'
                className="flex px-2 py-3 transition-colors hover:bg-yellow-500/20 active:bg-yellow-500/50 lg:rounded lg:py-2"
              >
                <div className='shrink-0 grid place-items-center rounded-md border-2 mr-3 p-1 w-24 border-yellow-500 lg:w-40'>
                  {movie.Poster !== "N/A" ? (
                    <img
                      src={movie.Poster}
                      alt={`Poster image for ${movie.Title}`}
                      className='rounded'
                    />
                  ) : (
                    <span className="text-center lg:text-lg">Image Not Available</span>
                  )}
                </div>

                <div className='flex-1'>
                  <h2 className='text-lg break-words leading-tight lg:text-xl lg:leading-snug'>
                    {movie.Title}
                  </h2>
                  <p className='mt-1 font-mono text-sm lg:text-lg '>
                    ({movie.Year})
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {(searchResults.data.length < searchResults.itemCount) && (
          <button
            type='button' 
            className='rounded mt-3 px-5 py-2 w-full bg-yellow-500 font-bold text-black uppercase tracking-wide transition-opacity hover:opacity-80 active:opacity-70 lg:mt-6'
            onClick={onNextPage}
          >
            Load More
          </button>
        )}
      </>
    )}
  </section>
);
 
export default SearchResults;