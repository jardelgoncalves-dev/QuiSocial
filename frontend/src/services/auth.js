export const TOKEN_KEY = '@QuiSocial/token'
export const USER_AUTH = '@QuiSocial/user'
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token)
}
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const storeUser = user => {
  localStorage.setItem(USER_AUTH, JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email
  }))
}

export const getUser = () => isAuthenticated() ? JSON.parse(localStorage.getItem(USER_AUTH)) : null