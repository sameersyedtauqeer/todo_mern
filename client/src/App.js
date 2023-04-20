import React, { useEffect } from 'react';
import './App.css';
import Auth from './Components/Auth';
import Todo from './Components/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from "./Reducers/authReducer"

function App() {

  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addToken())
  }, [])
  return (
    <div>

      {
        token ? <Todo /> : <Auth />
      }


    </div>
  );
}

export default App;
