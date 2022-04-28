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
        isLoading: true,
        isError: false,
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
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
  }
}

const App = () => {
  const [searchTitle, setSearchTitle] = React.useState("");
  const [searchResults, dispatchSearchResults] = React.useReducer(
    searchReducer,
    {
      data: null,
      isLoading: false,
      isError: false,
    }
  )

  const handleSearchTitleInput = (e) => {
    setSearchTitle(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTitle.trim().length > 0) {
      dispatchSearchResults({ type: 'SEARCH_INIT' });

      const requestUrl = API_ENDPOINT + `s=${searchTitle}`;
      axios.get(requestUrl)
        .then((response) => {
          if (response.data.Error) {
            dispatchSearchResults({ type: 'SEARCH_NOT_FOUND' });
          } else if (response.data.Search) {
            dispatchSearchResults({ 
              type: 'SEARCH_SUCCESS',
              payload: response.data.Search,
            });
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

        <SearchResults searchResults={searchResults} />
      </main>
    </div>
  );
}

export default App;
