import React from 'react';

interface Props {
  searchByQuery: (searchQuery: string) => void;
  query: string;
}

class Search extends React.Component<Props, Record<string, never>> {
  render() {
    const { query } = this.props;
    return (
      <>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            const searchQuery = e.currentTarget.query.value;
            this.props.searchByQuery(searchQuery);
          }}
        >
          <input defaultValue={query} id="query"></input>
          <button type="submit">Search</button>
        </form>
      </>
    );
  }
}

export default Search;
