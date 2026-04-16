import {useEffect} from 'react'

export function useScrollToTop(dependency: string) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [dependency])
}
