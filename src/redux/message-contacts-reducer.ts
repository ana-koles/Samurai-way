type MessageContactsType = Array<{id: number, name: string}>

let messagesContactsInitialState: MessageContactsType = [
  /* {id: 0, name:'Fluffy Gangster'}, */
  { id: 1, name: 'Missis Marple' },
  { id: 2, name: 'Luna' },
  { id: 3, name: 'Toby' },
  { id: 4, name: 'Cleo' },
  { id: 5, name: 'Choupette' },
  { id: 6, name: 'Pumpkine' },
];

export const messageContactsReducer = (state: MessageContactsType = messagesContactsInitialState, action: any) => {
  return state;
}