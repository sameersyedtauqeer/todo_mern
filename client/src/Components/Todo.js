import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTodo, fetchTodo, deleteTodo } from "../Reducers/todoReducer"
import { logout } from "../Reducers/authReducer"

const Todo = () => {

  const dispatch = useDispatch()
  const [todo, setTodo] = useState()
  const todos = useSelector(state => state.todos)

  useEffect(() => {
    dispatch(fetchTodo())
  }, [])

  const addTodo = () => {
    dispatch(createTodo({ todo: todo }))
    setTodo("")
  }

  const getTodo = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMxNDkxNGYwMTEwYTRjZmU4OGM0NjMiLCJpYXQiOjE2ODExMjEwMjF9._hOQSWugjQSkgW3FWxDN0JPabxcGNo3dhSSW9Ah4z4I");



    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    console.log('hello===')

    fetch("http://localhost:5000/gettodo", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    getTodo();
  }, [])

  return (
    <>
      <div className="container">

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-5">
              <div className="row">
                <div className="col">
                  <input type="text"
                    value={todo}
                    placeholder='Enter Todo Here'
                    className='form-control'
                    onChange={(e) => setTodo(e.target.value)}
                  />
                </div>

                <div className="col-auto">
                  <button className='btn border-0 btn-success' onClick={() => addTodo()}>ADD TODO</button>
                </div>

                <br />
                <br />
                <br />


                <hr />
                <br />


                <ul className="list-group">
                  {todos.map(items => {
                    return <li key={items._id}
                      className="list-group-item"
                    >
                      {items.todo}

                      <button
                        onClick={() => dispatch(deleteTodo(items._id))}
                      >Delete Todo</button>
                    </li>
                  })}
                </ul>

                <button className='btn border-0 btn-success' onClick={() => dispatch(logout())}>Logout</button>

              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default Todo