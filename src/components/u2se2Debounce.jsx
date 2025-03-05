import React, { useEffect, useState } from 'react'

const u2se2Debounce = (query, delay) => {
    
   const [searchvalue, setSearchvalue ] = useState();
   useEffect(() => {
    const timer = setTimeout(() => {
        console.log("query in useeffect");
        console.log(query);
        setSearchvalue(query);
    },delay);
    return () => clearTimeout(timer);
   },[query]);

   return searchvalue;
}

export default u2se2Debounce
