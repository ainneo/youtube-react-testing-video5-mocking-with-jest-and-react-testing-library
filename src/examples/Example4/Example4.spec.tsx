import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { MyDrawer } from '../Example3/Drawer';
import { Example4 } from './Example4';

//we are mocking what the jest.mocked module is returning by using mockImplementation
//so instead of returning its true vaule: 'Hello Drawer Component!'
//we are returning our mockImplementation: 'mocked: drawer'
jest.mock('../Example3/Drawer');
mocked(MyDrawer).mockImplementation(() => <div>mocked: drawer</div>);

describe('Example4', () => {
  it('renders MyDrawer', () => {
    render(<Example4 />);
    expect(
      screen.queryByText('Hello Drawer Component!')
    ).not.toBeInTheDocument();
    expect(screen.getByText('mocked: drawer')).toBeInTheDocument();
  });
});
