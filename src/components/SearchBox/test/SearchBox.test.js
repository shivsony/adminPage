
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';


import SearchBox from '../SearchBox';


test('render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchBox id="user-search" placeholder="search" />, div);
});

test('matchs snapshot', () => {
    const tree = renderer.create(<SearchBox id="user-search" placeholder="search" value="shiv" onChange={()=>{}} />).toJSON();
    expect(tree).toMatchSnapshot();
});
