import SearchIcon from "./Icons/SearchIcon";

const TitleSearchBox = ({
  searchTitle,
  onSearchTitleInput,
  onSubmit,
}) => (
  <form 
    className='grid grid-cols-[1fr,auto] rounded bg-white text-black'
    onSubmit={onSubmit}
  >
    <input 
      type='text' 
      placeholder='Enter movie title'
      className='px-3 py-1 bg-transparent text-lg'
      value={searchTitle}
      onChange={onSearchTitleInput}
    />
    <button
      type='submit'
      title='search movie title'
    >
      <SearchIcon
        className='w-9 h-5 px-2'
      />
    </button>
  </form>
)
 
export default TitleSearchBox;