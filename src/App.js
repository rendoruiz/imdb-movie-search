import * as React from 'react';
import './App.css';

const api = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {


  return (
    <div className='min-h-screen bg-black/80 text-white/90'>
      <header className='px-4 py-2 bg-yellow-500 text-black'>
        <h1 className='font-bold text-2xl'>
          IMDb Search
        </h1>
        <p className='text-sm uppercase tracking-wider'>
          Powered by&nbsp;
          <a href="http://www.omdbapi.com/" target='_blank'>OMDb</a>
        </p>
      </header>

      <main>

      </main>
    </div>
  );
}

export default App;
