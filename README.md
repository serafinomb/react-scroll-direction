# WithScrollDirection
Easily detect scroll direction changes.

### Installation
`npm install @serafinomb/react-scroll-direction`

### Usage
```javascript
withScrollDirection(Component[, offsetThreshold = 0])
```

* **Component** Your React component;
* **offsetThreshold** Integer value. While the scroll amount (pixels from the top
  of the document) is below or equal to `offsetThreshold`, `scrollDirection` is
  going to be `null`.
    
Your component will receive the `scrollDirection` property which can assume the following values:
* `null` when the scroll amount is less than or equal to `offsetThreshold`.
* SCROLL_DIRECTION_DOWN when scrolling down (and the scroll amount is greater
  than `offsetThreshold`);
* SCROLL_DIRECTION_UP when scrolling up (and the scroll amount is greater than
  `offsetThreshold`);

### Example
```javascript
import withScrollDirection, {
  SCROLL_DIRECTION_DOWN,
} from '@serafinomb/react-scroll-direction';

// 2. With the scrollDirection property, apply the right className to
//    show or hide the header.
const App = ({ scrollDirection }) => (
  <div>
    <div className={`header ${scrollDirection === SCROLL_DIRECTION_DOWN ? 'is-hidden' : ''}`}>
      My website header
    </div>
    ...
  </div>
);

// 1. Pass the component to the withScrollDirection HOC and optionally
//    specify an `offsetThreshold`
export default withScrollDirection(App, 80);
```

### Demo
A demo can be found at `/example`.

To run it locally, clone the repository and run the following commands from the repository root:
* `npm install`
* `npm run build`
* `npm pack`
* `cd example`
* `npm install`
* `npm run start`

### Development
As of right now I've not found a convenient way (other than npm link) to
quickly test changes to the `/src/index.js` file. Since I don't think
there are going to be any new developments in the near future, I'm going
to leave it as is and invest some time to find a better development workflow
when needed.
