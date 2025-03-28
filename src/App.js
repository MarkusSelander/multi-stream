import React, { useState, useEffect, useRef } from 'react';

function Stream({ stream, index, onRemove, onDragStart, onDragOver, onDrop }) {
  const [error, setError] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const streamRef = useRef(null);

  const handleError = () => {
    setError(true);
  };

  // Fullskjerm ved dobbeltklikk
  const handleDoubleClick = () => {
    if (streamRef.current && streamRef.current.requestFullscreen) {
      streamRef.current.requestFullscreen();
    }
  };

  // For mobil: klikk for å toggle synlighet på fjern-knappen
  const handleClick = () => {
    setShowRemove((prev) => !prev);
  };

  return (
    <div
      ref={streamRef}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      onMouseEnter={() => setShowRemove(true)}
      onMouseLeave={() => setShowRemove(false)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      {showRemove && (
        <button
          onClick={() => onRemove(index)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(255, 0, 0, 0.8)',
            border: 'none',
            color: '#fff',
            padding: '0.4rem 0.8rem',
            cursor: 'pointer',
            borderRadius: '4px',
            zIndex: 10,
          }}
        >
          X
        </button>
      )}
      {error ? (
        <div style={{ color: 'red', textAlign: 'center', paddingTop: '40%' }}>
          Feil ved lasting av stream.
        </div>
      ) : (
        <iframe
          title={stream.url}
          src={stream.url}
          style={{ width: '100%', height: '100%', border: 'none' }}
          onError={handleError}
          scrolling="no"
        />
      )}
    </div>
  );
}

function App() {
  const [streams, setStreams] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' eller 'list'
  const [numColumns, setNumColumns] = useState(2);

  // Refs for drag & drop
  const dragItem = useRef();
  const dragOverItem = useRef();

  // Last inn data fra localStorage ved oppstart
  useEffect(() => {
    const storedStreams = JSON.parse(localStorage.getItem('streams') || '[]');
    if (storedStreams.length > 0) {
      setStreams(storedStreams);
    }
    const storedLayout = localStorage.getItem('layoutMode');
    if (storedLayout) setLayoutMode(storedLayout);
    const storedColumns = localStorage.getItem('numColumns');
    if (storedColumns) setNumColumns(parseInt(storedColumns, 10));
  }, []);

  // Lagre endringer til localStorage
  useEffect(() => {
    localStorage.setItem('streams', JSON.stringify(streams));
  }, [streams]);

  useEffect(() => {
    localStorage.setItem('layoutMode', layoutMode);
  }, [layoutMode]);

  useEffect(() => {
    localStorage.setItem('numColumns', numColumns);
  }, [numColumns]);

  const addStream = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const newStream = {
      id: Date.now(),
      url: trimmed,
    };
    setStreams((prev) => [...prev, newStream]);
    setInputValue('');
  };

  const removeStream = (index) => {
    setStreams((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  // Drag & drop-håndtering
  const handleDragStart = (e, index) => {
    dragItem.current = index;
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const copyList = [...streams];
    const dragItemContent = copyList[dragItem.current];
    copyList.splice(dragItem.current, 1);
    copyList.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setStreams(copyList);
  };

  // Bestem container-stil basert på layout-modus
  const containerStyle =
    layoutMode === 'grid'
      ? {
          flex: 1,
          display: 'grid',
          gap: '10px',
          padding: '10px',
          background: '#1a1a1a',
          gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
        }
      : {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '10px',
          background: '#1a1a1a',
        };

  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    margin: 0,
    background: '#121212',
    fontFamily: '"Roboto", sans-serif',
    color: '#fff',
  };

  // Mindre header
  const headerStyle = {
    background: 'linear-gradient(135deg, #1f1f1f, #333)',
    color: '#fff',
    padding: '0.5rem', // mindre padding
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)', // litt mindre skygge
    fontSize: '1.1rem', // mindre fontstørrelse
  };

  const controlsStyle = {
    background: '#222',
    padding: '0.5rem', // mindre padding
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  };

  const inputStyle = {
    padding: '0.3rem',
    width: '250px',
    borderRadius: '4px',
    border: 'none',
    outline: 'none',
    fontSize: '0.9rem',
  };

  const buttonStyle = {
    padding: '0.4rem 0.8rem',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
    background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
    color: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    fontSize: '0.9rem',
  };

  const sliderStyle = {
    margin: '0 10px',
  };

  return (
    <div style={appStyle}>
      <header style={headerStyle}>
        <h1 style={{ margin: 0 }}>Multi Stream Viewer</h1>
      </header>
      <section style={controlsStyle}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Lim inn iframe-URL her"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button style={buttonStyle} onClick={addStream}>
          Legg til stream
        </button>
        <div>
          <label htmlFor="layoutSelect" style={{ fontSize: '0.9rem', marginRight: '5px' }}>Layout:</label>
          <select
            id="layoutSelect"
            value={layoutMode}
            onChange={(e) => setLayoutMode(e.target.value)}
            style={{
              padding: '0.3rem',
              borderRadius: '4px',
              border: 'none',
              fontSize: '0.9rem',
            }}
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </div>
        {layoutMode === 'grid' && (
          <div>
            <label htmlFor="columnsSlider" style={{ fontSize: '0.9rem', marginRight: '5px' }}>
              Antall kolonner: {numColumns}
            </label>
            <input
              id="columnsSlider"
              type="range"
              min="1"
              max="6"
              value={numColumns}
              onChange={(e) => setNumColumns(parseInt(e.target.value))}
              style={sliderStyle}
            />
          </div>
        )}
      </section>
      <section style={containerStyle}>
        {streams.map((stream, idx) => (
          <Stream
            key={stream.id}
            stream={stream}
            index={idx}
            onRemove={removeStream}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
