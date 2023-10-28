import React from 'react';

import Search from '../components/Search';
import Content from '../components/Content';

interface State {
  isLoading: boolean;
  arts: {};
  page: number;
  searchQuery: string;
  imageLinks: string[];
}

class ArtsLoader extends React.Component<{}, State> {
  state = {
    isLoading: true,
    arts: {},
    page: 1,
    searchQuery: '',
    imageLinks: []
  };

  fetchArts = async (query: string = this.state.searchQuery) => {
    this.setState({
      searchQuery: query  
    });
    const url =
      `https://api.artic.edu/api/v1/artworks/search?q=${this.state.searchQuery}&limit=5&page=${this.state.page}&fields=id,title,image_id`;

    let response = await fetch(url);
    let arts = await response.json();

    let tesstImageLink =`https://www.artic.edu/iiif/2/${arts.data[0].image_id}/full/843,/0/default.jpg`

    this.setState({
      arts: { ...this.state.arts, arts },
      imageLinks: [tesstImageLink],
      isLoading: false,
    });
  };

  render() {
    console.log("ArtsLoader",this.state);

    return (
      <>
        <Search fetchArts={this.fetchArts} />
        {/* <div onClick={this.fetchArts}>search</div> */}
        <Content imageLinks={this.state.imageLinks} />
      </>
    );
  }
}

export default ArtsLoader;
