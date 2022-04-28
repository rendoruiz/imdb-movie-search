import axios from 'axios';
import * as React from 'react';
import './App.css';
import SearchResults from './components/SearchResults';
import TitleSearchBox from './components/TitleSearchBox';

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

  const handleSearchTitleInput = (e) => {
    setSearchTitle(e.target.value);
  }

  const handleSubmit = (e) => {
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
    e.preventDefault();
  }

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
    <div className='grid content-start'>
      <header className='bg-yellow-500 text-black'>
        <div className='mx-auto px-4 py-2 w-full max-w-screen-lg'>
          <h1 className='font-bold text-2xl'>
            IMDb Search
          </h1>
          <p className='text-sm uppercase tracking-wider'>
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

      <main className='grid content-start'>
        <section className='bg-black/80'>
          <div className='mx-auto px-4 py-3 w-full max-w-screen-lg'>
            <TitleSearchBox 
              searchTitle={searchTitle}
              onSearchTitleInput={handleSearchTitleInput}
              onSubmit={handleSubmit}
            />
          </div>
        </section>

        <SearchResults 
          searchResults={searchResults} 
          onNextPage={handleNextPage}
        />
      </main>
    </div>
  );
}

export default App;
