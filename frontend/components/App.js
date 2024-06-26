import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [], 
    error: '', 
    todoNameInput: '', 
  }
  onTodoNameInputChange = evt => {
    const { value } = evt.target 
    this.setState({ ...this.state, todoNameInput: value })
  }
  postNewTodo = () => {
  axios.post(URL, { name: this.state.todoNameInput })
  .then(res => {
    this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
    this.resetForm()
  })
  .catch(this.setAxiosResponseError)
}
  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
  }
  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(this.setAxiosResponseError)
  }
  toggleCompleted = id => () => {
    axios.patch(`${URL}/$${id}`)
    .then(res => {
      this.setState({
        ...this.state, todos: this.state.todos.map(td=> {
           if (td.id !== id) return td
           return res.data.data
        })  
      })
    })
    .catch(this.setAxiosResponseError)
    }
    toggleDisplayCompleteds = () => {
      this.setState({ ...this.state, displayCompleteds: !this.state.displayCompleteds })
    }
  componentDidMount() {
   this.fetchAllTodos()
  }
  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id='todos'>
          <h2>Todos</h2>
         {
          this.state.todos.reduce((acc, td) => {
            debugger
            if (this.state.displayCompleteds || !td.completed) return acc.concat(td)
              return acc
              }, [])
            // return  <div onClick={this.toggleCompleted(td.id)} key={td.key}>{td.name} {td.completed ? '✓' :""}</div>
          }
        </div>
        <form id="TodoForm" onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onTodoNameInputChange} type="text" placeholder="Type todo"></input>
          <input type="submit"></input>
          <button>Clear Completed</button>
        </form>
        <button onClick={this.toggleDisplayCompleted}>{this.state.displayCompleted ? 'Hide' : 'Show'} Completed</button>
        </div>
    )
  }
}
