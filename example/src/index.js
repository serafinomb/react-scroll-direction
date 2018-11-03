import React from 'react';
import ReactDOM from 'react-dom';

import withScrollDirection, { SCROLL_DIRECTION_DOWN, SCROLL_DIRECTION_UP } from '@serafinomb/react-scroll-direction';

const OFFSET_THRESHOLD = 200;

function directionToText(direction) {
  switch (direction) {
    case SCROLL_DIRECTION_DOWN:
      return 'down';

    case SCROLL_DIRECTION_UP:
      return 'up';

    default:
      return `inside the threshold area (${OFFSET_THRESHOLD}px from top)`;
  }
}

class MyComponent extends React.Component {
    render() {
      return (
        <>
          <div style={{ position: 'fixed', top: 0, right: 0, left: 0 }}>
            You are scrolling {directionToText(this.props.scrollDirection)}.
          </div>
          <div style={{ paddingBottom: '20rem', backgroundColor: 'yellow', }} />
          <div style={{ paddingBottom: '20rem', backgroundColor: 'pink', }} />
          <div style={{ paddingBottom: '20rem', backgroundColor: 'orange', }} />
          <div style={{ paddingBottom: '20rem', backgroundColor: 'red', }} />
        </>
      );
    }
}

const App = withScrollDirection(MyComponent, OFFSET_THRESHOLD);

ReactDOM.render(<App />, document.getElementById('root'));
