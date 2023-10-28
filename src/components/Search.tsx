import React from 'react';

interface Props {
  fetchArts: (searchQuery:string)=>void;
}

class Search extends React.Component<Props, {}> {
  render() {
    return (
      <>
        <form action="" onSubmit={(e) => {
          e.preventDefault();
          const searchQuery = e.currentTarget.query.value;
          this.props.fetchArts(searchQuery)
        }}>
          <input id="query"></input>
          <button type="submit">Search</button>
        </form>
      </>
    );
  }
}

export default Search;
