import React from 'react'

const checkLogin = (WrapperComponent) => {
  return (props) => {
    console.log("props.....")
    console.log(props)
    return <WrapperComponent {...props} />
  }
}

export default checkLogin
