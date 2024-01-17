import { render } from '@testing-library/react'
import { FactoryUser } from 'src/test/factories/User'

import { AuthWrapper } from './AuthWrapper' // adjust this import according to your file structure

import type { UserStore } from 'src/stores/User/user.store'

const mockUser = FactoryUser({
  userRoles: ['admin'],
})

jest.mock('src/index', () => ({
  __esModule: true,
  useCommonStores: () => ({
    stores: {
      userStore: {
        user: mockUser,
      } as UserStore,
    },
  }),
}))

describe('AuthWrapper', () => {
  it('renders child components when user is authorized with role array', () => {
    const { getByText } = render(
      <AuthWrapper roleRequired={['admin']}>
        <div>Test Content</div>
      </AuthWrapper>,
    )
    expect(getByText('Test Content')).toBeTruthy()
  })

  it('renders child components when user is authorized with role string', () => {
    const { getByText } = render(
      <AuthWrapper roleRequired={'admin'}>
        <div>Test Content</div>
      </AuthWrapper>,
    )
    expect(getByText('Test Content')).toBeTruthy()
  })

  it('renders child components when user exists but no roles specified', () => {
    const { getByText } = render(
      <AuthWrapper roleRequired={[]}>
        <div>Test Content</div>
      </AuthWrapper>,
    )
    expect(getByText('Test Content')).toBeTruthy()
  })

  it('renders fallback when user is not authorized', () => {
    const { getByText } = render(
      <AuthWrapper
        roleRequired="super-admin"
        fallback={<div>Fallback Content</div>}
      >
        <div>Test Content</div>
      </AuthWrapper>,
    )
    expect(getByText('Fallback Content')).toBeTruthy()
  })
})