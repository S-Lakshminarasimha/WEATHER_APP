import React,{useState} from 'react'
import '../styles/search.css'
function Search(props) {
  const [myInput,setMyinput] = useState('')
  
  const handleOnchange =(e)=>{
    setMyinput(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    props.searchdata(myInput)
  }
  

  return (
    <div id='search'>
      <form onSubmit={handleSubmit}>
        <input type='text'  placeholder='Search Location' autoComplete='off' value={myInput} onChange={handleOnchange}></input>
      </form>
        
    </div>
  )
}

export default Search