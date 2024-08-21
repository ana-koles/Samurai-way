import { Breadcrumb } from "antd";
import s from './BreadCrubm.module.css'

export const BreadcrumbComponent = () => {
  return (
    <Breadcrumb className={s.breadCrumb} items={[
      {
        title: <a href="/">General</a>,
        menu: { items: menuItems },
      },
    ]}
    />
  )
}


export const menuItems = [
  {
    path: '/messages',
    title: 'messages',
  },
  {
    path: '/users',
    title: 'users',
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