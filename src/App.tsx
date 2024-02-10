import useSWR from 'swr'
import './App.css'

export type GithubUserType = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: 'User'
  site_admin: boolean
  name: string
  company: null
  blog: string
  location: string
  email: string
  hireable: string
  bio: string
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: Date
  updated_at: Date
}

async function fetcher(key: string, init?: RequestInit) {
  return fetch(key, init).then((res) => res.json() as Promise<GithubUserType | null>)
}

function App() {
  const githubUserName = 'takuya-yone'
  const { data: user, error } = useSWR(
    `https://api.github.com/users/${githubUserName}`,
    fetcher,
    // {refreshInterval:3}
  )

  return (
    <>
      <div>
        {typeof user === 'undefined' ? (
          <p>loading...</p>
        ) : user ? (
          <>
            <p>{user.name}</p>
            <p>{user.login}</p>
            <p>{user.bio}</p>
            <p>{user.created_at.toString()}</p>
          </>
        ) : (
          <a href="/login">Login</a>
        )}
        {error ? <p>{error}</p> : null}
      </div>
    </>
  )
}

export default App
