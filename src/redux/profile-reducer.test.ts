import { v1 } from "uuid"
import { ProfilePageType, addPostAC, profileReducer } from "./profile-reducer"

let profileInitialState: ProfilePageType = {
  posts: [
    {
      id: v1(),
      /* name: store._state.messageContacts[0].name, */
      name: 'Fluffy Gangster',
      message: `Paws up, it's time for another purr-fect day!`,
      likes: 21,
    },
    {
      id: v1(),
      name: 'Fluffy Gangster',
      message: `Just caught a toy mouse 🐭 and feeling like a true hunter! 😼`,
      likes: 7,
    },
    {
      id: v1(),
      name: 'Fluffy Gangster',
      message: `Is it dinner time yet? I'm feline pretty hungry. 🍽️`,
      likes: 12,
    },
  ],
  profile: null,
  status: ''
}


it('new post should be added correctly', () => {
  //1.initial data

  //2.actions
  let action = addPostAC('Fluffy Gangster', 'Good morning everyone!');
  let newState = profileReducer(profileInitialState, action);

  //3.check result
  expect(newState.posts.length).toBe(4);
  expect(newState.posts[0].message).toBe('Good morning everyone!')
})
