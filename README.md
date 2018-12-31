# WithScrollDirection
Easily detect scroll direction changes. Useful to hide sticky elements when
scrolling down.

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

### Example
```javascript
import withScrollDirection, {
  SCROLL_DIRECTION_DOWN,
} from '@serafinomb/react-scroll-direction';

const HEADER_HEIGHT_PX = 200;

// 4. Set the height to be equal to the offsetThreshold and use the
//    scrollDirection value to hide/show our Header.
function headerStyle(scrollDirection) {
  return {
    height: HEADER_HEIGHT_PX,
    transform: scrollDirection === SCROLL_DIRECTION_DOWN ? 'translateY(-100%)' : null,
  };
}

// 3. With scrollDirection generate the Header styles
const Header = ({ scrollDirection, ...props }) => (
  <div style={headerStyle(scrollDirection)} {...props}>
    My website header
  </div>
);

// 2. Pass down the scrollDirection property to our Header component
const App = props => (
  <Header scrollDirection={props.scrollDirection} />
  ...
)

// 1. Pass the component to the withScrollDirection HOC and specify an
//    offsetThreshold
export default withScrollDirection(App, HEADER_HEIGHT_PX);
```

### 
`scrollDirection` can assume the following values:
* `null` when the scroll amount is less than or equal to `offsetThreshold`.
* SCROLL_DIRECTION_DOWN when scrolling down (and the scroll amount is greater
  than `offsetThreshold`);
* SCROLL_DIRECTION_UP when scrolling up (and the scroll amount is greater than
  `offsetThreshold`);

### Demo
A demo can be found at `/example`.

To run it locally, clone the repository and run the following commands:
* `cd example`
* `npm install`
* `npm run start`

or with docker:
* `docker run -it --rm -v $(pwd):/ws:delegated -w /ws/example serafinomb/node npm install`
* `cd example`
* `docker run -it --rm -v $(pwd):/ws:delegated -w /ws -p 3000:3000 serafinomb/node npm run start`

### Development
As of right now I've not found a convenient way to quickly test changes to the
`/src/index.js` file. Since I don't think there are going to be any new
developments in the near future, I'm going to leave it as is and invest some
time to find a better development workflow when needed.
