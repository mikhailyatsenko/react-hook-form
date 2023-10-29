import React from 'react';

interface State {
  error: boolean;
}

class MakeError extends React.Component<Record<string, never>, State> {
  throwError = () => {
    this.setState({
      error: true,
    });
  };
  render() {
    if (this.state) {
      throw Error();
    }
    return (
      <button className="error-button" onClick={this.throwError}>
        Throw Error
      </button>
    );
  }
}

export default MakeError;
