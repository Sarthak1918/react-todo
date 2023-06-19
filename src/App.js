import React, { useEffect, useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

function App() {
  const [listItem, setListItem] = useState(() => {
    if (window.localStorage) {
      const saved = window.localStorage.getItem("todo-list")
      if (saved !== null) {
        try {
          return JSON.parse(saved)
        } catch (error) {

        }
      }
    }
    return []
  });

  const [searchValue, setSearchValue] = useState("")
  const [searchedItems, setSearchedItems] = useState(listItem)

  function handleSubmit(e) {
    e.preventDefault()
    let newListItem = e.target[0].value.trim();
    if (newListItem !== "") {
      setListItem((prevItems) =>
        [
          ...prevItems,
          {
            name: newListItem,
            status: false
          }
        ]
      );
    }

    e.target[0].value = ''
  }

  const handleDelete = (index) => {
    // Create a copy of the todos array
    const updatedTodos = [...listItem];
    // Remove the item at the specified index
    updatedTodos.splice(index, 1);
    // Update the todos state with the modified array
    setListItem(updatedTodos);
  };

  function handleStrike(index) {
    const updatedTodos = [...listItem];
    updatedTodos[index].status = !updatedTodos[index].status
    setListItem(updatedTodos);

  }

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem("todo-list", JSON.stringify(listItem))
    }
  }, [listItem])

  useEffect(() => {
    if (searchValue.trim() !== "") {
      setSearchedItems(listItem.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())))
    } else {
      setSearchedItems([...listItem])
    }
  }, [listItem, searchValue, searchedItems])
  let newListArray = searchedItems.map((item, index) => <TodoItem item={item} index={index} handleDelete={handleDelete} handleStrike={handleStrike} />)



  return (
    <div className='App'>
      <header>
        <h1 className='logo'>My Todo</h1>
        <input className='search-box' type='search' placeholder='Search...' onChange={(e) => setSearchValue(e.target.value)} />
      </header>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Add new Item..' />
        <button>Add</button>
      </form>
      <ul>
        {newListArray}
      </ul>
    </div>
  )

}

export default App;
