export const TOKEN_KEY = '@QuiSocial/token'
export const USER_AUTH = '@QuiSocial/user'
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const login = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_AUTH, JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    bio: user.bio,
    photoName: user.photoName
  }))
}
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_AUTH)
}

export const getUser = () =>  JSON.parse(localStorage.getItem(USER_AUTH)) || {}