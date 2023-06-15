import React, { useState } from 'react'
import './List.css'

export default function List() {
    const [listItem, setListItem] = useState([])

    function handleSubmit(e) {
        let newListItem = e.target[0].value
        e.preventDefault()
        setListItem((prevItems) => {
            return (
                [
                    ...prevItems,
                    newListItem

                ]
            )
        })
        e.target[0].value = ''
    }

    function deleteItem(e) {
        let deleteItem = e.target.parentElement
        console.log(deleteItem);
        // setListItem((prev)=>{
        //     return(
        //         [
        //             ...prev
        //         ]
        //     )
        // })
    }
    let newListArray = listItem.map((item) => {
        return (
            <div className='itemSet'>
                <li>{item}</li>
                <button onClick={deleteItem}>delete</button>
            </div>

        )
    })



    return (
        <div className='container'>
            <div>
                <input type='text' placeholder='Search...'></input>
            </div>
            <ul>
                {newListArray}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type='text'></input>
                <button>Add</button>
            </form>
        </div>
    )
}
