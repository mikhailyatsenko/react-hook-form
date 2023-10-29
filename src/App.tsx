import './App.css';
import React from 'react';
import ArtsLoader from './contatiners/ArtsLoader';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends React.Component<
  Record<string, never>,
  Record<string, never>
> {
  render() {
    return (
      <>
        <ErrorBoundary>
          <ArtsLoader />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
