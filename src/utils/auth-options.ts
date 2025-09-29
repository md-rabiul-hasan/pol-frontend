import { login, refreshAccessToken } from '@actions/auth'
import { SessionUser } from '@types'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Employee ID', type: 'string' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) throw new Error('Email and password are required')

          const response = await login(credentials.email, credentials.password)

          const { success, data } = response.data

          if (!success) throw new Error('Invalid credentials')

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            accessToken: data.access_token.token,
            refreshToken: data.refresh_token.token,
            accessTokenExpires: Date.now() + data.access_token.expires_in * 1000 // Expiry in ms
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred'
          throw new Error(errorMessage)
        }
      }
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // First-time login: Store tokens in JWT
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires
        }
      }

      // Check if the token is expired
      const now = Date.now()
      if (now < token.accessTokenExpires) {
        return token // Token is still valid
      }

      // Access token expired, attempt to refresh
      return await refreshToken(token)
    },

    session: async ({ session, token }) => {
      if (token) {
        session.user = token as SessionUser
      }
      return session
    }
  },

  session: {
    strategy: 'jwt',
    maxAge: 4 * 60 * 60, // 4 hours
    updateAge: 30 * 60 // Refresh session every 30 minutes
  },

  jwt: {
    maxAge: 4 * 60 * 60 // 4 hours
  },

  pages: {
    signIn: '/sign-in'
  }
}

/**
 * Refresh access token using the refresh token
 */
async function refreshToken(token: any) {
  try {
    const response = await refreshAccessToken(token.refreshToken)
    const { success, data } = response.data

    if (!success) throw new Error('Failed to refresh token')

    return {
      ...token,
      accessToken: data.access_token.token,
      accessTokenExpires: Date.now() + data.access_token.expires_in * 1000, // New expiry time
      refreshToken: data.refresh_token.token || token.refreshToken // Use new refresh token if provided
    }
  } catch (error) {
    console.error('Error refreshing token:', error)
    return {
      ...token,
      error: 'RefreshTokenError' // Mark session as invalid
    }
  }
}
