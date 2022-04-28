import axios from 'axios';
import * as React from 'react';
import './App.css';
import SearchResults from './components/SearchResults';
import SearchBox from './components/SearchBox';

// http://www.omdbapi.com/
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const API_ENDPOINT = `http://www.omdbapi.com/?apikey=${API_KEY}&type=movie&y&`;

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_INIT':
      return {
        ...state,
        data: null,
        currentPage: 1,
        itemCount: null,
        isLoading: true,
        isError: false,
        isPagerLoading: false,
        isPagerError: false,
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        data: action.payload.data,
        itemCount: action.payload.itemCount,
        isLoading: false,
        isError: false,
      };
    case 'SEARCH_NOT_FOUND':
      return {
        ...state,
        data: [],
        isLoading: false,
        isError: false,
      }
    case 'SEARCH_ERROR':
      return {
        ...state,
        data: [],
        isLoading: false,
        isError: true,
      }
    case 'SEARCH_PAGER_INIT':
      return { 
        ...state,
        isPagerLoading: true,
        isPagerError: false,
      }
    case 'SEARCH_PAGER_SUCCESS':
      return { 
        ...state,
        data: [...state.data, ...action.payload.data],
        currentPage: state.currentPage += 1,
        itemCount: action.payload.itemCount,
        isPagerLoading: false,
        isPagerError: false,
      }
    case 'SEARCH_PAGER_ERROR':
      return { 
        ...state,
        isPagerLoading: false,
        isPagerError: true,
      }
    default:
      throw new Error();
  }
}

const movieDetailReducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_DETAIL_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'FETCH_DETAIL_SUCCESS':
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        isLoading: false,
        isError: false,
      }
    case 'FETCH_DETAIL_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      throw new Error();
  }
}

const App = () => {
  const [searchTitle, setSearchTitle] = React.useState("");
  const [searchResults, dispatchSearchResults] = React.useReducer(
    searchReducer,
    {
      data: null,
      currentPage: 1,
      itemCount: null,
      isLoading: false,
      isError: false,
      isPagerLoading: false,
      isPagerError: false,
    }
  );

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);

  }
  const handleSearchTitleReset = () => {
    setSearchTitle("");
  }

  React.useEffect(() => {
    if (searchTitle.trim().length > 0) {
      dispatchSearchResults({ type: 'SEARCH_INIT' });

      const requestUrl = API_ENDPOINT + `s=${searchTitle}`;
      axios.get(requestUrl)
        .then((response) => {
          const { Error: isError, Search: searchItems, totalResults: itemCount } = response.data;
          if (isError) {
            dispatchSearchResults({ type: 'SEARCH_NOT_FOUND' });
          } else if (searchItems && itemCount) {
            dispatchSearchResults({ 
              type: 'SEARCH_SUCCESS',
              payload: {
                data: searchItems,
                itemCount: itemCount
              },
            });
          } else {
            throw new Error();
          }
        })
        .catch((error) => {
          console.error(error);
          dispatchSearchResults({ type: 'SEARCH_ERROR' });
        }); 
    }
  }, [searchTitle]);

  const handleNextPage = () => {
    if (searchResults.data.length < searchResults.itemCount) {
      dispatchSearchResults({ type: 'SEARCH_PAGER_INIT' });

      const requestUrl = API_ENDPOINT + `s=${searchTitle}&page=${searchResults.currentPage+1}`;
      axios.get(requestUrl)
        .then((response) => {
          const { Error: isError, Search: searchItems, totalResults: itemCount } = response.data;
          if (isError) {
            dispatchSearchResults({ type: 'SEARCH_PAGER_ERROR' });
          } else if (searchItems && itemCount) {
            dispatchSearchResults({ 
              type: 'SEARCH_PAGER_SUCCESS',
              payload: {
                data: searchItems,
                itemCount: itemCount
              },
            });
          } else {
            throw new Error();
          }
        })
        .catch((error) => {
          console.error(error);
          dispatchSearchResults({ type: 'SEARCH_ERROR' });
        }); 
    }
  }

  return (
    <div className='grid min-h-screen grid-rows-[auto,1fr,auto]'>
      <header className='bg-yellow-500 text-black'>
        <div className='mx-auto px-4 py-2 w-full max-w-screen-lg'>
          <h1 className='font-bold text-2xl'>
            IMDb Search
          </h1>
          <p className='text-sm uppercase tracking-wider leading-none'>
            Powered by&nbsp;
            <a 
              href="http://www.omdbapi.com/" 
              target='_blank'
              rel="noreferrer"
            >
              OMDb
            </a>
          </p>
        </div>
      </header>

      <main className='relative grid content-start'>
        <section className='sticky top-0 bg-black/50 backdrop-blur-sm'>
          <div className='mx-auto px-4 py-3 w-full max-w-screen-lg'>
            <SearchBox 
              value={searchTitle}
              placeholder='Enter movie title'
              onChange={handleSearchTitleChange}
              onReset={handleSearchTitleReset}
            />
          </div>
        </section>

        <SearchResults 
          searchResults={searchResults} 
          onNextPage={handleNextPage}
        />
      </main>

      <footer className='grid'>
        <div className='grid place-items-center mx-auto p-5 w-full max-w-screen-lg'>
          <p className='font-light text-stone-100'>
            <span className='opacity-50'>
              &copy; 2022&nbsp;
            </span>
            <a 
              href='https://rendo.ca'
              target='_blank'
              rel='noreferrer'
              className='font-normal opacity-50 transition-opacity hover:opacity-100'
            >
              Rendo Ruiz
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
