const MoviePoster = ({ 
  poster, 
  title,
  className,
}) => {
  return (  
    poster !== "N/A" ? (
      <img
        src={poster}
        alt={`Movie Poster for ${title}`}
        className={className}
      />
    ) : (
      <span className="text-center lg:text-lg">
        Image Not Available
      </span>
    )
  );
}
 
export default MoviePoster;