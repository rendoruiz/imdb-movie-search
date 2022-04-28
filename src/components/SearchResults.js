const SearchResults = ({ 
  searchResults, 
  onNextPage,
  onViewDetails,
}) => (  
  <section className='mx-auto px-4 py-2 w-full max-w-screen-lg lg:py-5'>
    {searchResults.data === null && !searchResults.isLoading && (
      <p className="pt-20 font-light text-xl text-white/70 tracking-wide text-center sm:text-2xl lg:text-3xl">Start searching your favourite movie using the search box above.</p>
    )}

    {searchResults.isError ? (
      <p className='text-lg lg:text-xl'>Something went wrong. Please try again later.</p>
    ) : searchResults.isLoading ? (
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
            <SearchResultItem
              key={movie.imdbID}
              movie={movie}
              onSummaryClick={onViewDetails}
            />
          ))}
        </ul>

        {(searchResults.data.length < searchResults.itemCount) && (
          <div className='px-2 w-full'>
            <button
              type='button' 
              className='rounded mt-3 px-5 py-2 w-full bg-yellow-500 font-bold text-black uppercase tracking-wide transition-opacity hover:opacity-80 active:opacity-70 lg:mt-6'
              onClick={onNextPage}
            >
              {searchResults.isPagerLoading ? (
                "Loading..."
              ) : searchResults.isError ?(
                "Server error occured"
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}
      </>
    )}
  </section>
);

const SearchResultItem = ({ 
  movie,
  onSummaryClick,
}) => (
  <li className="flex px-2 py-3 transition-colors hover:bg-yellow-200/5 hover:outline hover:outline-yellow-500 sm:rounded-md sm:bg-black/50 lg:py-2">
    <div className='shrink-0 grid place-items-center rounded-md border-2 mr-3 p-1 w-24 border-yellow-500 lg:w-40'>
      {movie.Poster !== "N/A" ? (
        <img
          src={movie.Poster}
          alt={`Movie Poster for ${movie.Title}`}
          className='rounded'
        />
      ) : (
        <span className="text-center lg:text-lg">
          Image Not Available
        </span>
      )}
    </div>

    <div className='flex flex-col flex-1'>
      <h2 className='text-lg break-words leading-tight lg:text-xl lg:leading-snug'>
        {movie.Title}
      </h2>
      <p className='mt-1 font-mono text-sm lg:text-lg '>
        ({movie.Year})
      </p>

      <div className='grid grid-cols-2 gap-3 mt-auto text-xs sm:text-sm lg:text-base'>
        <a 
          href={'https://www.imdb.com/title/' + movie.imdbID}
          target='_blank'
          rel='noreferrer'
          title='Open IMDb page'
          className="rounded px-2 py-1 bg-yellow-500 text-black leading-tight text-center hover:opacity-90 active:outline active:outline-2 active:outline-offset-2 active:outline-yellow-500 md:py-2"
        >
          IMDb page
        </a>
        <button
          type="button"
          className='rounded px-2 py-1 bg-yellow-500 text-black leading-tight hover:opacity-90 active:outline active:outline-2 active:outline-offset-2 active:outline-yellow-500 md:py-2'
          onClick={() => onSummaryClick(movie.imdbID)}
        >
          Summary
        </button>
      </div>
    </div>
  </li>
);
 
export default SearchResults;