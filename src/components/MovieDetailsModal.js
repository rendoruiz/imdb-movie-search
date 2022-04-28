const MovieDetailsModal = (
  movieDetailReducer,
  onToggleVisibility,
) => {
  const handleModalClick = (e) => e.stopPropagation();

  return movieDetailReducer.isOpen && (  
    <div 
      className='grid place-items-center fixed inset-0 p-4 bg-black/50 backdrop-blur sm:p-5'
      onClick={onToggleVisibility}
    >
      <div 
        className='rounded mx-auto p-4 w-full max-w-screen-lg bg-black/80 text-white'
        onClick={handleModalClick}
      >
        hello
      </div>
    </div>
  );
}
 
export default MovieDetailsModal;