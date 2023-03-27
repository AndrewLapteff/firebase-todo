import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { fetchTodos } from './app/todoSlice';
import Input from './components/Input';
import Todos from './components/Todos';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <div className="App">
      <Input />
      <Todos />
    </div>
  );
}

export default App;
