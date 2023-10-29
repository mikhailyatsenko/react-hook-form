import React from 'react';

class ErrorPage extends React.Component<
  Record<string, never>,
  Record<string, never>
> {
  render() {
    const reloadPage = () => {
      location.reload();
    };
    return (
      <div className="error-page">
        <h1>
          Something went wrong
          <button onClick={reloadPage}>Reload page</button>
        </h1>
      </div>
    );
  }
}

export default ErrorPage;
