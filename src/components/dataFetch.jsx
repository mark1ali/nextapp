import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const dataFetch = (api) => {
    console.log("api....")
    console.log(api)
    const [ result,setResult] = useState([])
  
  const fetchPosts = async() => {
    const fetchPromise = await fetch(api);
    const fetchResult = await fetchPromise.json();
    console.log("fetchResult......")
    console.log(fetchResult)
    setResult(fetchResult)
  }
  useEffect(()=>{
    fetchPosts();
  },[])
  return result;
}

export default dataFetch
