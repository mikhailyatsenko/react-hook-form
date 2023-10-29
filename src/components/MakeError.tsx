import React from 'react';

interface State {
  error: boolean;
}

class MakeError extends React.Component<Record<string, never>, State> {
  render() {
    const throwError = () => {
      this.setState({
        error: true,
      });
    };
    if (this.state) {
      throw Error();
    }
    return (
      <button className="error-button" onClick={throwError}>
        Throw Error
      </button>
    );
  }
}

export default MakeError;
