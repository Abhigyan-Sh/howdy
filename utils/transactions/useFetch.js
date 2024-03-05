/*  @dev:: if your async function is being used in another parent 
function then there too, this parent function shall be declared async 
and child function called with await and this continues on till its 
saved to a variable and to verify this just visit where this function 
is being called in TransactionHistory component but it continues on 
till eternity i.e. the we keep building promises, promises resolve 
async and so its needed to refresh the component to receive updated 
value and thus we will be using useState and useEffect() */
import { useEffect, useState } from 'react'

let GIF_API = process.env.NEXT_PUBLIC_GIF_API

export const useFetch = (keyword) => {
  // needed to declare as a useState, const gifUrl won't work
  const [gifUrl, setGifUrl] = useState('')
  
  const fetchGifs = () => {    
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${
      GIF_API
    }&q=${
      keyword
    }&limit=1&offset=0&rating=g&lang=en`)
    .then(response => response.json())
    .then(data => {
      setGifUrl(data.data[0].images.downsized_medium.url)
    })
    .catch(error => {
      console.log(error)
    })
  }
  useEffect(() => {
    if (keyword) fetchGifs()
  }, [keyword])

  return gifUrl 
  ? gifUrl 
  : 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWplbzhqbDZneHUwNDFzN2pwZHg3eW5xcTFnbDc4Njg3N2o5NGx6ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JTV3ciE3YTDycJXhmq/giphy.gif'
}