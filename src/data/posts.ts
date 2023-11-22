export type PostType = {
  id: number
  name:  string
  message: string
  likes: number
}


export const posts: PostType[] = [
  {
    id: Date.now() * Math.random(),
    name:  'Fluffy Gangster',
    message: `Paws up, it's time for another purr-fect day!`,
    likes: 21
  },
  {
    id: Date.now() * Math.random(),
    name:  'Fluffy Gangster',
    message: `Just caught a toy mouse 🐭 and feeling like a true hunter! 😼`,
    likes: 7
  },
  {
    id: Date.now() * Math.random(),
    name:  'Fluffy Gangster',
    message: `Is it dinner time yet? I'm feline pretty hungry. 🍽️`,
    likes: 12
  },
]
