/* eslint-disable */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class App extends Component {

 constructor(props){
    super(props);

    this.btnclk = this.btnclk.bind(this)//binding doesn't send a form, so that it updates DOM
    this.state = {html: null} //need to set this in the beginning to use variable in different functions
  }

  btnclk(evnt){
    //Meeting%20Time=
    //to prevent the submit btn from submitting a form
    evnt.preventDefault()
    var time1 = this.refs.time1.value.split(" ")[0]
    var time2 = this.refs.time2.value
    console.log(time1)
    console.log(time2)
    var department = "Department=" + this.refs.department.value
    var date = this.refs.day.value
    console.log(date)
    var limit = "limit=" + this.refs.limit.value
    var mtime = "Meeting%20Time=" + date + "%20" + time1 + "-" + time2
    console.log(mtime)

//search in all departments
    if(this.refs.department.value === 'N/A'){
      department= ''
    }

//show all classes at that time
    if(this.refs.limit.value === 'N/A'){
      limit=''
    }

    fetch('https://www.eg.bucknell.edu/~amm042/service/q?'+ department + "&" + mtime + "&" + limit)
      .then(resp => {
          return resp.json()
        })
      .then(results => {
        //create an html of the query
        var courses = []
        for (var i = 0; i < results["message"].length;  i += 1) {
          courses.push( <div class="course col-4">{"Course: "+ results["message"][i]["Course"] + " - " + results["message"][i]["Title"]}</div>)
          courses.push(<div class="course col-4">{"CRN: "+ results["message"][i]["CRN"]} </div>)
          courses.push(<div class="course col-4">{"Professor: " + results["message"][i]["Instructor"]}</div>)
        }
        if (!courses.length){
          courses.push(<div class="course col-4">There are no courses offered at that day and time, please submit a different department, time, or day.</div>)
        }


        console.log(courses)
        this.setState({html: courses}) //changing the global variable to be used in a nother function
        })

      .catch(function(error) {
        console.log(error);
        });
  }

  // For ES6+ need to use the var defaultProps
  static defaultProps = {departments: ['N/A', 'ACFM', 'OFFAF', 'ANBE', 'ANTH', 'ARBC', 'ARTH',
                        'ARST', 'ARTR' , 'BIOL', 'BMEG' , 'OFFL', 'OFFD', 'OFFF',
                        'OFFAT', 'OFFGH', 'OFFG', 'OFFCB', 'CHEG', 'CSCI', 'CHIN',
                        'CEEG', 'CLAS' , 'ENCW', 'DANC', 'OFFDN', 'EAST', 'ECON',
                        'EDUC', 'ECEG', 'ENGR', 'ENGL', 'ENST', 'ENFS', 'FOUN',
                        'FREN' , 'GEOL', 'GEOG', 'GRMN', 'GREK', 'GLBM', 'HEBR',
                        'HIST', 'HUMN', 'IDPT', 'OFFJP', 'JAPN', 'LATN', 'LAMS'
                        , 'LEGL', 'LING', 'ENLS', 'MGMT', 'MSUS', 'MIDE',
                        'MATH', 'MECH', 'MILS', 'MUSC', 'NEUR', 'OCST', 'PHIL',
                        'PHYS', 'POLS', 'PSCY', 'RELI', 'RUSS', 'RESC', 'SIGN',
                        'SPAN', 'SOCI', 'SLIF', 'THEA', 'UNIV', 'WMST'] ,

                        day: ['M','T','W','R','F','MW','MWF','WF','TR'] ,

                        times: ['8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am',
                        '11:00 am', '11:30 am','12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm',
                        '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm', '5:00 pm', '5:30 pm', '6:00 pm',
                        '6:30 pm', '7:00 pm', '7:30 pm'],

                        times2: ['8:52am', '9:22am', '9:52am', '10:22am', '10:52am', '11:22am', '11:52am',
                        , '12:22pm', '12:52pm', '1:22pm', '1:52pm', '2:22pm', '2:52pm', '3:22pm', '3:52pm'
                        , '4:22pm', '4:52pm', '5:22pm', '5:52pm', '6:22pm', '6:52pm', '7:22pm', '7:52pm'
                        , '8:22pm', '8:52pm', '9:22pm', '9:52pm'],


                        limit: ['N/A', 5, 10, 15, 20, 25, 30, 35, 40]

                }

//always need a render() function
  render() {

    //looked on github to get functionality on dropdowns for these mappings and the html select code
    //I give credit to Allan la for that
    let Department = this.props.departments.map(function(category) {
          return ( <option key={category} value={category}>{category}</option> )
        })

    let Day = this.props.day.map(function(category) {
          return (<option key={category} value={category}>{category}</option>)
        })
    let Time = this.props.times.map(function(category) {
          return (<option key={category} value={category}>{category}</option>)
        })
    let Time2 = this.props.times2.map(function(category) {
          return (<option key={category} value={category}>{category}</option>)
        })

    let limits = this.props.limit.map(function(category) {
          return (<option key={category} value={category}>{category}</option>)
        })

    return (
    <div>
      <div className = "container">
        <br/>
        <div id="header">
          <h1 >  <img src={ require('./rayBucknell.png') } />Course Information</h1>
          <p>Having trouble finding a class that fits into your schedule? Look up courses by day and time!</p>
          <br/>

        </div>
        <div id= "questions">
            <form onSubmit={this.btnclk.bind(this)} class= "row">
              <section class= "col-3" id="border">
                  <h5 id="orange"> STEP ONE </h5>
                  <label>What department do you want to take this course in?</label><br/>
                    <select ref="department">
                      {Department}
                    </select>
              </section>

              <section class="col-3" id="border">
                <h5 id="orange"> STEP TWO </h5>
                  <label>What day(s) of the week do you want this course to be?</label><br/>
                    <select ref="day">
                      {Day}
                    </select>
              </section>

              <section class="col-3" id="border">
                <h5 id="orange"> STEP THREE </h5>
                  <label>What time do you want this course to start?</label><br/>
                    <select ref="time1">
                      {Time}
                    </select>
              </section>

              <section class="col-3">
                <h5 id="orange"> STEP FOUR </h5>
                  <label>What time do you want this course to end?</label><br/>
                    <select ref="time2">
                      {Time2}
                    </select>
              </section>

              <section class="col-7" id="borderUp">
                <h5 id="orange"> STEP FIVE </h5>
                  <label>How many course choices do you want to display?</label><br/>
                    <select ref="limit">
                      {limits}
                    </select>
              </section>

              <section class="col-5" id="borderUp">
              <br/>
              <p id="center"><input type="submit" className="btn btn-primary" value="View Courses"/></p>
              </section>

            </form>
            <br/>
          </div>

          <div id="classes" class="row">
              {this.state.html /*need brackets around variable to go to java*/}
          </div>
        </div>
        <br/>
    </div>
    );


  }
}
export default App;
