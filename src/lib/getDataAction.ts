import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import { FolderPathValue } from '@/utils/folderPaths'

export const getDataAction = (folder: FolderPathValue) => {
  const cwd = process.cwd()
  const folderPath = join(cwd, 'src', 'content', folder)

  const filesContentsArray = fs.readdirSync(folderPath).map(fileName => {
    const fullPath = join(folderPath, fileName)

    const fileContentStr = fs.readFileSync(fullPath, 'utf-8')

    const parsedContent = matter(fileContentStr)

    const keyOfObj = fileName.split('.')

    return { [keyOfObj[0]]: parsedContent.data }
  })

  return filesContentsArray.reduce((prevVal, el) => {
    return { ...prevVal, ...el }
  }, {})
}
