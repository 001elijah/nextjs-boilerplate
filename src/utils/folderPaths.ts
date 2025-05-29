export const folderPaths = {
  HOME: 'home'
}

export type FolderPathValue = (typeof folderPaths)[keyof typeof folderPaths]
