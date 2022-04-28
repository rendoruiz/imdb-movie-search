const MovieDetailsModal = ({
  movieDetailReducer,
  onToggleVisibility,
}) => {
  const handleModalClick = (e) => e.stopPropagation();

  return movieDetailReducer.isOpen && (  
    <div 
      className='grid place-items-center fixed inset-0 z-50 p-4 bg-black/50 backdrop-blur sm:p-5 overflow-y-auto overflow-x-hidden'
      onClick={onToggleVisibility}
    >
      <div 
        className='rounded mx-auto p-4 w-full max-w-screen-lg bg-black/80 text-white lg:p-10'
        onClick={handleModalClick}
      >
        {movieDetailReducer.isLoading ? (
          <p className='text-center'>Loading...</p>
        ) : movieDetailReducer.isError ? (
          <p className='text-lg lg:text-xl'>Something went wrong. Please try again later.</p>
        ) : (
          <div className="">
            <img 
              src={movieDetailReducer.data.Poster} 
              alt={'Movie Poster for ' + movieDetailReducer.data.Title}
              className='w-full max-w-[320px]'
            />
            <p className='mt-2 text-3xl'>
              {movieDetailReducer.data.Title}
            </p>
            <p className='font-mono text-lg'>{movieDetailReducer.data.Year}</p>
            <p className='mt-3'>
              {movieDetailReducer.data.Plot}
            </p>
            <div className="mt-5">
              <button
                type='button'
                className='border-2 border-yellow-500 rounded-md px-5 py-2 w-full uppercase tracking-wide leading-none hover:bg-yellow-500 hover:text-black active:outline active:outline-2 active:outline-offset-2 active:outline-yellow-500'
                onClick={onToggleVisibility}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default MovieDetailsModal;