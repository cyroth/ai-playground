import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('# Hello, world!');

  return (
    <div className="app">
      <textarea 
        className="textarea"
        value={markdown} 
        onChange={(e) => setMarkdown(e.target.value)} 
      />
      <div className="preview">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
