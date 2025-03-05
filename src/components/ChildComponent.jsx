import React, { useMemo, useState } from 'react'

const ChildComponent = ( { childMethod }) => {
  const [ search, setSearch ] = useState("");
  const setParent = () => {
    childMethod(search);
  }
  return (
    <div>
ChildComponent
    <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
    <button onClick={setParent}>Send to Parent</button>

    </div>
  )
}
 

export default ChildComponent
