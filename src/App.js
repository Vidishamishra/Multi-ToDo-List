import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks_container: {},
      task_list: [],
      task_id: "",
      category_name: "",
      task_name: "",
      error: {},
      
    }
  }
  addValueToList = (event) => {
    event.preventDefault()
    // console.log("Hello World")

    // var ans=document.getElementById('val1').value
    let selected_category = this.state.category_name
    var task = this.state.tasks_container

    if (selected_category.trim()) {
      task[selected_category] = []
      
      console.log(task);
      this.setState({
        tasks_container: task,
        category_name: ""
      })

    }
  }

  handleOnchange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value,
      error: {
        ...this.state.error,
        task: null
      }
    })
  }

  showList = (key) => {
    debugger
    //  console.log("Hello World")
    // event.preventDefault()
    //    var title = this.state.tasks_container(key)
    var add_task = this.state.tasks_container[key]
     console.log(add_task)
    this.setState({

      task_list: add_task,
      task_id: key
    })
  }

  toggleCheck = (key) => { debugger
    //  console.log("Hello World")
    // event.preventDefault()
    //    var title = this.state.tasks_container(key)
    var tasks = this.state.tasks_container[this.state.task_id];


    // var list = key;
    // list.status = !list.status;

    for (let task of tasks){
      if(task.title === key.title){
        task.status = !key.status;
      }
    }
    var prev_selected_category = this.state.tasks_container
    prev_selected_category[this.state.task_id] = tasks

    this.setState({
      tasks_container: prev_selected_category,
      task_list: tasks,
    })
  }

  // toggleStatus = (key) => {
  //   debugger
  //    var categories = this.state.tasks_container[key];
  //     for(let category of categories){
  //        if(category.category_status === key.category_status){
  //           category.category_status = !key.category_status
  //        }
  //     }

     
  // }

  removeCategory = (key) => {
    let removable_category = {...this.state.tasks_container}
    // if (key.length > 0) {
    //   let ans = prompt("There are tasks in this category, are you sure to delete?")
    //   if (ans) { return }
    // }
    
    console.log(removable_category[key])
    delete removable_category[key];
    this.setState({
      tasks_container: removable_category,
    })
    if (this.state.task_id === key) {
      this.setState({
        task_id: "",
        task_list:[]
      })
    }


  }

  removeTask = (index) => {
    let removable_task = [...this.state.task_list];
    removable_task.splice(index, 1);
    this.setState({
      task_list: removable_task
    })

  }

  addListItems = () => {
    debugger
    var prev_selected_category = {...this.state.tasks_container}


    if (prev_selected_category) {
      let selected_list_item = this.state.task_name

      if (selected_list_item.length > 0) {
        prev_selected_category[this.state.task_id].push(
          {
            title: selected_list_item,
            status: false
          }
        )

       

        // var new_task = this.state.task_list;

        // prev_selected_category[this.state.task_id] = new_task

        this.setState({
          tasks_container: prev_selected_category,
          task_list: prev_selected_category[this.state.task_id],
          task_name: "",
        })
      } else {
        this.setState({
          error: {
            ...this.state.error,
            task: "Please enter some text"
          }
        }
        )
      }
    }
  }

  render() {
    var categoryListContents = () => Object.keys(this.state.tasks_container).map(function (key, index) {
      return (
        <React.Fragment>
        <div className="category-items " key={key} value={key}>{key}</div>
        <button className="btn-rounded" type="button" onClick={() => this.showList(key)}><i className="fa fa-plus" aria-hidden="true"></i></button>

        <button className="btn-rounded" type="button" onClick={() => this.removeCategory(key)}><i className="fa fa-trash" aria-hidden="true"></i></button>
        </React.Fragment>
      )
    }, this);

    var listContents = () => this.state.task_list.map(function (key, index) {
      return (

        <React.Fragment>
          <button className="btn-rounded" type="button" onClick={() => this.toggleCheck(key)}>
            { (key.status) ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-square" aria-hidden="true"></i>}
          </button>

          <div className="category-items">{key.title}</div>

          <button className="btn-rounded" type="button" onClick={() => this.removeTask(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
        </React.Fragment>
      )
    }, this);




    return (
      <React.Fragment>
        <nav className="navbar">
          <span className="nav-header mx-auto">TODO LIST</span>
        </nav>
        <div className="container vertical-center">
      
        <div className="row main-container">
          <div className="col-lg-4 card offset-lg-1 card category-container shadow bg-white rounded">
            <div className="card-header">
              <span className="text2">Category</span>

            </div>
            <div className="input-btn-style">
              <input type="text" className="form-control category-title shadow" name="category_name" onChange={this.handleOnchange} placeholder="Add category" aria-label="Add category" aria-describedby="basic-addon2" value={this.state.category_name} />

              <button className="btn-rounded shadow" type="button" onClick={this.addValueToList}><i className="fa fa-plus" aria-hidden="true"></i></button>

            </div>

            <div className="content">
              {categoryListContents()}

              {/* <div className="category-items " key={key} value={key}>{key}</div> */}
              {/* <button className="btn-rounded" type="button" onClick={() => this.showList(key)}><i className="fa fa-plus" aria-hidden="true"></i></button> */}

              {/* <button classNameName="btn-rounded" type="button" onClick={() => this.removeCategory(key)}><i className="fa fa-trash" aria-hidden="true"></i></button> */}
            </div>


          </div>
          {this.state.task_id && 
          
          <div className="col-lg-4 card offset-lg-2 card subcategory-container shadow bg-white rounded">

            <div className="card-header">
          <span className="text2">Sub Category : {this.state.task_id}</span>
            </div>
            <div className="input-btn-style ">
              <input type="text" className="form-control category-title shadow" name="task_name" onChange={this.handleOnchange} placeholder="Add task" value={this.state.task_name} aria-label="Add task" aria-describedby="basic-addon2" />
              {this.state.error.task && <div className="error"> {this.state.error.task} </div>}
              <button className="btn-rounded" type="button" onClick={this.addListItems}><i className="fa fa-plus" aria-hidden="true"></i></button>
            </div>

            <div className="content">



              {listContents()}

            
            </div>

          </div>}
        </div>
      </div>
      </React.Fragment>

    )
  }
}


export default App;