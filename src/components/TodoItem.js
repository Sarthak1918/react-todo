import React from 'react'

export default function TodoItem(props) {
    return (
        <div>
            <li className='itemSet' key={props.index}>
                <div className={props.item.status && "striked"} onClick={() => props.handleStrike(props.index)} >{props.item.name}</div>
                <button onClick={() => props.handleDelete(props.index)}>Delete</button>
            </li>

        </div>
    )
}
