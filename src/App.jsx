import React, { useState } from 'react';
import Group6Image from './assets/logo.jpg';
import shareImage from './assets/share.png';
import Content from './Content';
import Heading from './Heading';
import searchImg from './assets/search.png';
import './index.css';

function App() {
  const [word, setWord] = useState('');
  const [results, setResults] = useState(null);
  const [selectedTab, setSelectedTab] = useState('noun'); // Initialize with "noun"

  const searchWord = async () => {
    const response = await fetch(
      'https://api.dictionaryapi.dev/api/v2/entries/en/' + word
    );

    const data = await response.json();

    setResults(data[0]);
  };

  const heading = () => {
    const audio = results?.phonetics.find((phone) => phone.audio !== '')?.audio;
    return {
      audioUrl: audio,
      word: results?.word,
      phonetic: results?.phonetic,
    };
  };

  return (
    <div className="container mx-auto px-10 relative">
      <nav className="my-2 h-14 flex flex-row items-center">
        <div className="logo-container">
          <img
            src={Group6Image}
            alt="Logo"
            className="logo"
            style={{ width: '50px', height: '50px' }}
          />
          <h2 className="text-black-600 font-bold text-2xl">Suave Dictionary</h2>
        </div>
      </nav>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="w-full bg-gray-100 border-none outline-none rounded-lg px-3 py-4 shadow-sm"
      />
      <button className="-mx-14 px-3 py-4 rounded-lg" onClick={searchWord}>
        <img src={searchImg} width={18} alt="Search" />
      </button>

      {/* The tab container with the specified styles */}
      <div
        style={{
          width: '100%',
          margin: '0 auto',
          marginTop: '20px', // Add margin-top to space it from the search bar
          overflowX: 'hidden',
          overflowY: 'hidden',
        }}
      >
        <div
          style={{
            boxSizing: 'border-box',
            width: '100%',
            height: 'auto',
            background: '#FFFFFF',
            border: '3px solid #CED9E3',
            boxShadow: '0px 2px 0px #CED9E3',
            borderRadius: '35px',
            padding: '20px',
          }}
        >
          {/* Tab selection */}
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <button
              className={`tab-button ${selectedTab === 'noun' ? 'active' : ''}`}
              onClick={() => setSelectedTab('noun')}
            >
              Noun
            </button>
            <button
              className={`tab-button ${selectedTab === 'verb' ? 'active' : ''}`}
              onClick={() => setSelectedTab('verb')}
            >
              Verb
            </button>
          </div>

          {/* Display content based on the selected tab */}
          {results?.meanings?.length > 0 && (
            <>
              <Heading {...heading()} />
              {results.meanings.map((content, index) => {
                return (
                  selectedTab === content.partOfSpeech.toLowerCase() && (
                    <Content {...content} key={index} />
                  )
                );
              })}
            </>
          )}
        </div>
      </div>

      <img
        src={shareImage}
        alt="Share"
        style={{
          width: '100%',
          height: 'auto',
          marginTop: '20px', // Add margin-top to space it from the tab content
        }}
      />
    </div>
  );
}

export default App;
