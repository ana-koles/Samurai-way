export type PostType = {
  id: number
  name:  string
  message: string
  likes: number
}

export type ProfilePageType = {
  currentText: string
  posts: PostType[]
}

const ADD_POST = 'ADD-POST' as const;
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT' as const;

type AddPostAT = ReturnType<typeof addPostAC>
type UpdateNewPostTextAT = ReturnType<typeof updateNewPostTextAC>
export type ProfileReducerActionType = AddPostAT | UpdateNewPostTextAT;



let profileInitialState: ProfilePageType = {
  currentText: '',
  posts: [
    {
      id: Date.now() * Math.random(),
      /* name: store._state.messageContacts[0].name, */
      name: 'Fluffy Gangster',
      message: `Paws up, it's time for another purr-fect day!`,
      likes: 21,
    },
    {
      id: Date.now() * Math.random(),
      name: 'Fluffy Gangster',
      message: `Just caught a toy mouse 🐭 and feeling like a true hunter! 😼`,
      likes: 7,
    },
    {
      id: Date.now() * Math.random(),
      name: 'Fluffy Gangster',
      message: `Is it dinner time yet? I'm feline pretty hungry. 🍽️`,
      likes: 12,
    },
  ],
}

export const profileReducer = (state: ProfilePageType = profileInitialState , action: ProfileReducerActionType): ProfilePageType => {

  switch(action.type) {
    case ADD_POST:
      const newPost = {
        id: Date.now() * Math.random(),
        name: action.userName,
        message: state.currentText,
        likes: 0
      }

      state.posts.unshift(newPost);
      state.currentText = '';
      return state;

      case UPDATE_NEW_POST_TEXT:
        if (action.newText) {
          state.currentText = action.newText;
        };
        return state;

      default:
        return state;
  }
}

export const addPostAC = (name: string) => ({type: ADD_POST, userName: name} as const);
export const updateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text} as const)