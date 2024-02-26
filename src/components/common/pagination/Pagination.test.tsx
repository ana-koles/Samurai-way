import { create } from 'react-test-renderer'
import { Pagination } from './Pagination'


describe('Pagination component', () => {
  test('there are 11 pages with 1 item per page, but should be 10 elements in the pagination line', () => {
    const component = create(<Pagination totalItemsCount={11}
                                          pageCount={1}
                                          currentPage={1}
                                          setCurrentPage={() => {}}/>)
    const root = component.root;
    const button = root.findAllByType('button');
    expect(button.length).toBe(1);
  })
})