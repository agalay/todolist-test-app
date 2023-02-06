import React from 'react';
import './styles/App.css';
import {Box, IconButton, Typography} from "@mui/material";
import {Settings} from '@mui/icons-material';
import Day, {Task} from "./components/Day";

function App() {
  const [todos, setTodos] = React.useState<Record<string, Task[]>>( Array(7).fill('').reduce((dataObj, _, day) => {
    const taskCounts = Math.floor(Math.random() * 5);
    const date = new Date().setDate(new Date().getDate() + day);
    const colors = ['red', '#366EFF', 'yellow', 'green', 'white']

    dataObj[date] = Array.from({length: taskCounts}, (_, i) => ({
      id: Date.now() + (Math.random() + 1).toString(36).substring(7),
      title: `Test ${(Math.random() + 1).toString(36).substring(7)}`,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam corporis deleniti dolores fugiat odit pariatur quidem saepe, soluta vero voluptate?',
      done: !!Math.floor(Math.random() * 2),
      date,
      color: colors[i]
    }))

    return dataObj;
  }, {}))

  const toggleTodo = (date: string, id: string) => {
    setTodos({...todos, [date]: todos[date].map((todo: Task) => todo.id === id ? {...todo, done: !todo.done} : todo)})
  }

  return (
    <div className="App">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2}}>
        <Typography variant="h1">To Do</Typography>
        <IconButton color="inherit">
          <Settings />
        </IconButton>
      </Box>
      <Box>
        {Object.keys(todos).map((date) => (
          <Day
            date={date}
            tasks={todos[date]}
            toggleTodo={toggleTodo}
            key={date}
          />
        ))}
      </Box>
    </div>
  );
}

export default App;
