import CrossIcon from "./Icons/CrossIcon";
import SearchIcon from "./Icons/SearchIcon";

const SearchBox = ({
  value,
  placeholder,
  onInput,
  onSubmit,
  onReset,
}) => (
  <form 
    className='flex rounded bg-white text-black'
    onSubmit={onSubmit}
    onReset={onReset}
  >
    <input 
      type='text' 
      placeholder={placeholder}
      className='flex-1 pl-3 pr-2 py-1 w-full bg-transparent text-lg'
      value={value}
      onChange={onInput}
    />
    <button
      type='reset'
      title='reset text'
      className='shrink-0'
    >
      <CrossIcon
        className='w-10 h-5 px-2'
      />
    </button>
    <button
      type='submit'
      title='search text'
      className='shrink-0'
    >
      <SearchIcon
        className='w-10 h-5 px-2'
      />
    </button>
  </form>
)
 
export default SearchBox;