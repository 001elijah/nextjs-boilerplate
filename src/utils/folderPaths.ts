export const folderPaths = {
  HOME: 'home',
  PROFILE: 'profile'
}

export type FolderPathValue = (typeof folderPaths)[keyof typeof folderPaths]
