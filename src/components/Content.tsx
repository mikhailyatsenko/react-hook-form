import React from 'react';

interface Props {
  imageLinks: string[]
}

class Content extends React.Component<Props, {}> {
  render() {
    return <>
    <img src={this.props.imageLinks[0]} alt="" />
    </>;
  }
}

export default Content;
