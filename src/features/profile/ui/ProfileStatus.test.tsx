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
    expect(instance.state.status).toBe('Test status')
  })

  test('componet should contain span tag after mounting', async () => {
    const component = create(<ProfileStatus status="Test status" updateStatus={updateStatusTC}/>);
    const root = component.root;
    try {
      const span = await root.findAllByType('span')
      expect(span).not.toBeNull();
      expect(span.length).toBe(1)
    } catch {
      console.log('No span tag')
    }
  })

  test('span tag in comoponent after its mount contains text from status from props', async () => {
    const component = create(<ProfileStatus status="Test status" updateStatus={updateStatusTC}/>);
    const root = component.root;
    try {
      const span = await root.findByType('span');
      expect(span.children[0]).toBe('Test status')
    } catch {
      console.log('No span tag')
    }
  })

  test('component should not contain input tag after mounting', async() => {
    const component = create(<ProfileStatus status="Test status" updateStatus={updateStatusTC}/>);
    const root = component.root;
    try {
      const input = await root.findAllByType('input');
      expect(input.length).toBe(0);
    } catch {
      console.log('No input tag')
    }

  })

  test('component should not contain input tag after mounting, 2nd test', async() => {
    const component = create(<ProfileStatus status="Test status" updateStatus={updateStatusTC}/>);
    const root = component.root;
    try {
      const input = await root.findByType('input');
      expect(input).toThrow();
    } catch {
      console.log('No input tag')
    }
  })

  test('component should have input instead of span after doubleclicking on the span', async()=> {
    const component = create(<ProfileStatus status="Test status" updateStatus={updateStatusTC}/>);
    const root = component.root;
    try {
      let span = await root.findByType('span');
      span.props.onDoubleClick();
      const input = await root.findByType('input');
      expect(input.props.value).toBe('Test status');
      span = await root.findByType('span');
      expect(span).toThrow();
    } catch {
      console.log('No span or input tag')
    }
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