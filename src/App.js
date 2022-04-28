import * as React from 'react';
import './App.css';
import TitleSearchBox from './components/TitleSearchBox';

const api = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
  const [searchTitle, setSearchTitle] = React.useState("");

  const handleSearchTitleInput = (e) => {
    setSearchTitle(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
  }

  return (
    <div className='min-h-screen bg-black/90 text-white/90'>
      <header className='bg-yellow-500 text-black'>
        <div className='mx-auto px-4 py-2 w-full max-w-screen-lg'>
          <h1 className='font-bold text-2xl'>
            IMDb Search
          </h1>
          <p className='text-sm uppercase tracking-wider'>
            Powered by&nbsp;
            <a href="http://www.omdbapi.com/" target='_blank'>OMDb</a>
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

        {searchTitle && (
          <section className='mx-auto px-4 py-2 w-full max-w-screen-lg'>
            <p className='text-lg'>
              Search results for "{searchTitle}"
            </p>
          </section>
        )}
      </main>
    </div>
  );
}



export default App;
