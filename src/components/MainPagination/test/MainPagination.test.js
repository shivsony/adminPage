
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';


import MainPagination from '../MainPaginatio';


test('render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainPagination count={2} rowsPerPage={10} onPageChange={()=>{}} />, div);
});

test('matchs snapshot', () => {
    const tree = renderer.create(<MainPagination count={2} rowsPerPage={10} onPageChange={()=>{}} />).toJSON();
    expect(tree).toMatchSnapshot();
});
