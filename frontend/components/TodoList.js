import React from 'react'
import Todo from './Todo'


export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
        <h2>Todos:</h2>
        {
          this.props.todos.reduce((acc, td) => {
            if (this.props.displayCompleteds || !td.completed) return acc.concat(
              <div onClick={this.props.toggleCompleted(td,id)} key={td.id}>{td.name}{td.completed ? '✓' : ''}</div>
              <Todo
              key={this.propls.todo.id}
              toggleCompleted={this.props.toggleCompleted}
              todo={td}
              />
            )
            return acc
          }, [])
        }
</div>  
  )
  }
}
