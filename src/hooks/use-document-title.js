import { useEffect } from 'react'

const useDocumentTitle = title => {
  const setPolitecTitle = string => {
    const newTitle = `${string} | Politec`
    window.document.title = newTitle
    return newTitle
  }

  useEffect(() => {
    setPolitecTitle(title)
  }, [title])

  return title
}

export default useDocumentTitle
