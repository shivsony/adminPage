
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';


import TextInput from '../TextInput';



test('render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextInput id="textinput" />, div);
});

test('matchs snapshot', () => {
    const tree = renderer.create(<TextInput id="textinput" />).toJSON();
    expect(tree).toMatchSnapshot();
});
