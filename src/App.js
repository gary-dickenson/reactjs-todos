import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Header from './components/layout/header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import About from './components/pages/about'
import uuid from 'uuid'
import axios from 'axios'

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      todos: [
        {
          id: uuid.v4(),
          title: 'Take out the trash',
          completed: false
        },
        {
          id: uuid.v4(),
          title: 'Dinner with wife',
          completed: false
        },
        {
          id: uuid.v4(),
          title: 'Meeting with boss',
          completed: false
        }
      ]
    }
  }

  componentDidMount () {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => console.log(res.data))
  }

  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    })
  }

  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/$(id)`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }))
  }

  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    }).then(res => this.setState({ todos: [...this.state.todos, res.data] }))
  }

  render () {
    return (
      <Router>
        <div className="App">
          <div className='container'>
            <Header/>
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos}
                       markComplete={this.markComplete}
                       delTodo={this.delTodo}/>
              </React.Fragment>
            )}/>
            <Route path='/about' component={About}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App