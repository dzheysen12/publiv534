import React, { Component } from 'react';
import Item from './component/Item';




class History extends Component {

  render() {
      return (
        <ul className={"history__list"}>
          <Item/>
          <Item/>
          <Item/>
        </ul>
      );
    }
}

export default History;