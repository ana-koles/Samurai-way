import { create } from 'react-test-renderer'
import { Pagination } from './Pagination'


describe('Pagination component', () => {
  test('there are 11 pages with 1 item per page, but should be 10 elements in the pagination line', () => {
    const component = create(<Pagination totalItemsCount={11}
                                          pageCount={1}
                                          currentPage={1}
                                          portionSize={10}
                                          setCurrentPage={() => {}}/>)
    const root = component.root;
    const spans = root.findAllByType('span');
    expect(spans.length).toBe(10);
  })

  test('if there are more than 10 pages with 1 page per page, button next should appear', () => {
    const component = create(<Pagination totalItemsCount={11}
                            pageCount={1}
                            currentPage={1}
                            portionSize={10}
                            setCurrentPage={() => {}}/>)
    const root = component.root;
    const button = root.findByType('button');
    expect(button.children[0]).toBe('Next');
  })
})