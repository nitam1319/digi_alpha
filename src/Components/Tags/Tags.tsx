import React from 'react'
import './Tags.css'
export default function Tags({list ,setList}:{list:string[] ,setList:React.Dispatch<React.SetStateAction<string[]>> }) {
    function deleteItem (index:number){
      const filtered = list.filter((item:string,ind:Number) => (ind !== index) )
      setList(filtered)
    }
  return (
    <div className='tag_div'>
      {
        list.map((item:string , index:number)=>(
            <div key={index} className='tag'>
                <img alt='delete' src='delete.svg' onClick={()=>{deleteItem(index)}}/>
                <span>{item}</span>
            </div>
        ))
      }
    </div>
  )
}
