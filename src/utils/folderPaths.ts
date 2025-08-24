export const folderPaths = {
  DASHBOARD: 'dashboard',
  HISTORY: 'history',
  HOME: 'home',
  PROFILE: 'profile'
}

export type FolderPathValue = (typeof folderPaths)[keyof typeof folderPaths]
