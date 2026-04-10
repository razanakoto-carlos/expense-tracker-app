import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section>
        <button
          className="border bg-red-500"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
    </>
  )
}

export default App
