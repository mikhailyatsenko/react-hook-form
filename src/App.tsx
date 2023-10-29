import './App.css';
import React from 'react';
import ArtsLoader from './contatiners/ArtsLoader';

class App extends React.Component<
  Record<string, never>,
  Record<string, never>
> {
  render() {
    return (
      <>
        <ArtsLoader />
      </>
    );
  }
}

export default App;
