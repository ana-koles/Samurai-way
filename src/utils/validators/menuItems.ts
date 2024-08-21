export const menuItems = [
  {
    path: '/messages',
    title: 'messages',
  },
  {
    path: '/news',
    title: 'news',
  },
  {
    path: '/music',
    title: 'music',
  },
  {
    path: '/settings',
    title: 'settings',
  },
  {
    path: '/profile',
    title: 'profile',
    children: [
      {
        path: '/:userId?',
        title: 'userId',
      },
    ],
  },
];