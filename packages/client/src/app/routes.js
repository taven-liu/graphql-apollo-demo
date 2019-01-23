import loadable from 'react-loadable'
import Loading from 'components/Loading'
import { DASHBOARD, USER, BOOK } from 'constants/routes'

export default {
  [DASHBOARD]: loadable({
    loader: () => import('modules/dashboard').then(exportedModule => exportedModule.default),
    loading: Loading
  }),
  [USER]: loadable({
    loader: () => import('modules/user').then(exportedModule => exportedModule.default),
    loading: Loading
  }),
  [BOOK]: loadable({
    loader: () => import('modules/book').then(exportedModule => exportedModule.default),
    loading: Loading
  })
}

export const menus = [
  {
    displayName: 'Dashboard',
    icon: 'appstore',
    to: DASHBOARD
  },
  {
    displayName: 'Module one',
    icon: 'team',
    children: [
      {
        displayName: 'User',
        icon: 'user',
        to: USER
      },
      {
        displayName: 'Book',
        icon: 'book',
        to: BOOK
      },
      {
        displayName: 'Link to Google',
        icon: 'google',
        to: 'https://www.google.com'
      }
    ]
  }
]

export const DEFAULT_ROUTE = DASHBOARD
