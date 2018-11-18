import loadable from 'react-loadable'
import Loading from 'components/Loading'
import {
  DASHBOARD,
  MODULE1
} from 'constants/routes'

export default {
  [DASHBOARD]: loadable({
    loader: () => import('modules/dashboard').then(exportedModule => exportedModule.default),
    loading: Loading
  }),
  [MODULE1]: loadable({
    loader: () => import('modules/module1').then(exportedModule => exportedModule.default),
    loading: Loading
  })
}

export const menus = [
  DASHBOARD,
  MODULE1
]

export const DEFAULT_ROUTE = DASHBOARD
