import { useEffect, useState } from 'react'

const useDebounce = <T extends string | number>(payload: T) => {
    const [value, setValue] = useState<T>();

    useEffect(() => {
      const timeout = setTimeout(() => {
        setValue(payload)
      }, 500);
    
      return () => clearTimeout(timeout)
    }, [payload])

    return value as T;
    
}

export default useDebounce