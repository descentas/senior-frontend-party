// react and react dependencies
import * as React from 'react';
// components
import InnerHeader from '../components/InnerHeader';
import List from '../components/List';

class ListPage extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="page">
        <InnerHeader />
        <List />
      </div>
    );
  }
}

export default ListPage;
