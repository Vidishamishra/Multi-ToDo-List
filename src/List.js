import React from 'react';

const List = props => (
  <ul>
    {
      props.items.map((item, index) => <li id="li-style" key={index}>{item}</li>)
    }
  </ul>
);

export default List;