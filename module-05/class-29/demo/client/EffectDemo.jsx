import React, { useEffect, useState } from 'react'

const EffectDemo = () => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("")

  // example 1
  useEffect(() => {
    // just contains the first argument which is the callback function
    // so this function will be called after every render
    console.log("hi! this happens with every render")

    // cleanup
    return () => { 
      console.log("this happens on unmount")
    }
  })

  // example 2
  useEffect(() => {
    // contains the first argument and an empty dependancy array
    // so this function will just on mount
    console.log("hi! this happens on mount")
  }, [])

  // example 3
  useEffect(() => {
    // contains the first argument and a dependancy array with a state variable in it to watch
    // so this function will happen on mount, and every time count update
    console.log("hi! this happens when count updates and on mount ", count)
    // don't do this
    if (count === 13)
    setCount(count+1)
  }, [count])


  return (
    <>
    <button onClick={() => setCount(count + 1)}>Counter: {count}</button>
    <button onClick={() => setCount(0)}>Reset</button>
    <form>
      <input onChange={(e) => setText(e.target.value)} value={text} />
    </form>
    </>
  )
}

export default EffectDemo