import { Example2, rows } from './Example2';
import { fireEvent, render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { DataGrid } from '@material-ui/data-grid';

//this is how we mock modules:
//jest.mock(module we want to mock, callback)
//if we want to mock other things from the module we can use ...jest.requireActual()
//in the callnack return the mocked modules
jest.mock('@material-ui/data-grid', () => ({
  ...jest.requireActual('@material-ui/data-grid'),
  DataGrid: jest.fn(() => <div>Table</div>),
}));

//initalize our mocked module for use:
//in order to use our new mocked DataGrid, we need to
//import mocked from ts-jest-utils and pass in our DataGrid...
const mockedDataGrid = mocked(DataGrid);

describe('MyComponent', () => {
  beforeEach(() => {
    mockedDataGrid.mockClear();
  });

  it('renders Material-UI grid with columnDefs and rowData', () => {
    const myOnMoney = jest.fn();
    render(<Example2 onMoney={myOnMoney} />);
    fireEvent.click(screen.getByRole('button', { name: 'Give me 33 dollars' }));
    expect(myOnMoney).toHaveBeenCalledTimes(1);
    expect(myOnMoney).toHaveBeenCalledWith(33);
  });

  //only import props that you have in your component
  it('renders table passing the expected props', () => {
    render(<Example2 onMoney={jest.fn()} />);
    expect(mockedDataGrid).toHaveBeenCalledTimes(1);
    expect(mockedDataGrid).toHaveBeenLastCalledWith(
      {
        rows: rows,
        columns: [
          expect.objectContaining({ field: 'id' }),
          expect.objectContaining({ field: 'firstName' }),
          expect.objectContaining({ field: 'lastName' }),
          expect.objectContaining({ field: 'age' }),
        ],
        pageSize: 5,
        checkboxSelection: true,
      },
      {}
    );
  });
});
