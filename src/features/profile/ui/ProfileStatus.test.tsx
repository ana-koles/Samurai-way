import { ReactTestInstance, create } from "react-test-renderer"
import { updateStatusTC } from "../modal/profile-reducer";
import { ProfileStatus } from "./ProfileStatus";

interface ProfileStatusState {
  status: string
  editMode: boolean
}

type TestInstanceWithState = ReactTestInstance & {
  state: ProfileStatusState;
  deactivateEditMode: () => void;
};

describe('ProfileStatus component', ()=> {
  test('status from props should be in state', () => {
    const component = create(<ProfileStatus status="Test status" updateStatus={updateStatusTC}/>);
    const instance = component.getInstance() as TestInstanceWithState;

    if (instance) {
      expect(instance.state.status).toBe('Test status')
    }

  })

  test('componet should contain span tag after mounting', () => {
    const component = create(<ProfileStatus status="Test status" updateStatus={updateStatusTC}/>);
    const root = component.root;
    const span = root.findAllByType('span')
    expect(span).not.toBeNull();
    expect(span.length).toBe(1)
  })

  test('span tag in comoponent after its mount contains text from status from props', () => {
    const component = create(<ProfileStatus status="Test status" updateStatus={updateStatusTC}/>);
    const root = component.root;
    const span = root.findByType('span');
    expect(span.children[0]).toBe('Test status')
  })

  test('component should not contain input tag after mounting', () => {
    const component = create(<ProfileStatus status="Test status" updateStatus={updateStatusTC}/>);
    const root = component.root;
    const input = root.findAllByType('input');
    expect(input.length).toBe(0);
  })

  test('component should not contain input tag after mounting, 2nd test', () => {
    const component = create(<ProfileStatus status="Test status" updateStatus={updateStatusTC}/>);
    const root = component.root;
    expect(() => {
      const input = root.findByType('input');
    }).toThrow();
  })

  test('component should have input instead of span after doubleclicking on the span', ()=> {
    const component = create(<ProfileStatus status="Test status" updateStatus={updateStatusTC}/>);
    const root = component.root;
    // eslint-disable-next-line testing-library/await-async-query
    let span = root.findByType('span');
    span.props.onDoubleClick();
    // eslint-disable-next-line testing-library/await-async-query
    const input = root.findByType('input');
    expect(input.props.value).toBe('Test status');
    expect(() => {
      // eslint-disable-next-line testing-library/await-async-query
      root.findByType('span');
    }).toThrow();
  })

  test('callback in the components props was called', () =>{
    const mockcallback = jest.fn();
    const component = create(<ProfileStatus status="Test status" updateStatus={mockcallback}/>);
    const instance = component.getInstance() as TestInstanceWithState ;

    if (instance) {
      instance.deactivateEditMode();
    };
    expect(mockcallback.mock.calls.length).toBe(1);


  })
})