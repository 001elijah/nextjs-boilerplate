export const folderPaths = {
  DASHBOARD: 'dashboard',
  HOME: 'home',
  PROFILE: 'profile'
}

export type FolderPathValue = (typeof folderPaths)[keyof typeof folderPaths]
