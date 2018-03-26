/* eslint-disable */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class App extends Component {

 constructor(){
    super();

    /*binding "This" to the function loadMainPageCallBack because of javascript function inside function
    loses the scope of what this is, so this is needed so the callback function refers back to ViewEvents*/
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {htmlcode: ""}
  }

  static defaultProps = {departments: ['N/A', "ACFM", "OFFAF", "ANBE", "ANTH", "ARBC", "ARTH",
                        "ARST", "ARTR" , "BIOL", "BMEG" , "OFFL", "OFFD", "OFFF",
                        "OFFAT", "OFFGH", "OFFG", "OFFCB", "CHEG", "CSCI", "CHIN",
                        "CEEG", "CLAS" , "ENCW", "DANC", "OFFDN", "EAST", "ECON",
                        "EDUC", "ECEG", "ENGR", "ENGL", "ENST", "ENFS", "FOUN",
                        "FREN" , "GEOL", "GEOG", "GRMN", "GREK", "GLBM", "HEBR",
                        "HIST", "HUMN", "IDPT", "OFFJP", "JAPN", "LATN", "LAMS"
                        , "LEGL", "LING", "ENLS", "MGMT", "MSUS", "MIDE",
                        "MATH", "MECH", "MILS", "MUSC", "NEUR", "OCST", "PHIL",
                        "PHYS", "POLS", "PSCY", "RELI", "RUSS", "RESC", "SIGN",
                        "SPAN", "SOCI", "SLIF", "THEA", "UNIV", "WMST"] ,

                        day: ['M','T','W','R','F','MW','MWF','WF','TR'] ,

                        times: ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
                        '11:00 AM', '11:30 AM','12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
                        '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM',
                        '6:30 PM', '7:00 PM', '7:30 PM'],

                        times2: ['8:52am', '9:22am', '9:52am', '10:22am', '10:52am', '11:22am', '11:52am',
                        , '12:22pm', '12:52pm', '1:22pm', '1:52pm', '2:22pm', '2:52pm', '3:22pm', '3:52pm'
                        , '4:22pm', '4:52pm', '5:22pm', '5:52pm', '6:22pm', '6:52pm', '7:22pm', '7:52pm'
                        , '8:22pm', '8:52pm', '9:22pm', '9:52pm'],


                        limit: [5, 10, 15, 20]

                }

  handleSubmit(e){
    e.preventDefault()
    //Meeting%20Time=
    var time1 = this.refs.time1.value.split(" ")[0]
    var time2 = this.refs.time2.value
    console.log(time1)
    console.log(time2)
    var department = "Department=" + this.refs.department.value
    var date = this.refs.day.value
    console.log(date)
    var limit = this.refs.limit.value
    var mtime = "Meeting%20Time=" + date + "%20" + time1 + "-" + time2
    console.log(mtime)

    if(this.refs.department.value === "N/A"){
      department= ""
    }
    var query = department + "&" + mtime + "&" + limit
    console.log(query)

    fetch('https://www.eg.bucknell.edu/~amm042/service/q?'+ query)
      .then( response => {
          var json = response.json()
          return json
        }).then(jsonResponse => {
          // console.log(jsonResponse)
          // console.log(jsonResponse["message"])
          this.renderClasses(jsonResponse["message"])
        })

      .catch( error => console.log("ERROR", error))
  }

  renderClasses(classes){
    var html = []
    for (var i = 0; i < classes.length;  i += 1) {
      html.push("CRN: "+ classes[i]["CRN"] + ", Title: "+ classes[i]["Title"] +
      ", Course Name: " + classes[i]["Course"] +", Meeting Time: " + classes[i]["Meeting Time"])
  }

    const listItems = html.map((text) => <li>{text}</li>);

    console.log(html)
    this.setState({htmlcode: listItems})
  }

  render() {

    let Department = this.props.departments.map(category => {
          return <option key={category} value={category}>{category}</option>
        })

    let Day = this.props.day.map(category => {
          return <option key={category} value={category}>{category}</option>
        })
    let Time = this.props.times.map(category => {
          return <option key={category} value={category}>{category}</option>
        })
    let Time2 = this.props.times2.map(category => {
          return <option key={category} value={category}>{category}</option>
        })

    let limits = this.props.limit.map(category => {
          return <option key={category} value={category}>{category}</option>
        })

    var htmlCode = this.state.htmlcode
    console.log("In render here is htmlcode = ", htmlCode)
    return (
    <div>
      <div className = "container">

        <br></br>
        <h1 id="title">Having trouble finding a class that fits into your schedule? Look up courses by day and time!</h1>
        <div id= "information">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div>
                  <label>What department do you want to take this course in?</label><br />
                    <select ref="department">
                      {Department}
                    </select>
              </div>

              <div>
                  <label>What day(s) of the week do you want this course to be?</label><br />
                    <select ref="day">
                      {Day}
                    </select>
              </div>

              <div>
                  <label>What time do you want this course to start?</label><br />
                    <select ref="time1">
                      {Time}
                    </select>
              </div>

              div>
                  <label>What time do you want this course to end?</label><br />
                    <select ref="time2">
                      {Time2}
                    </select>
              </div>

              <div>
                  <label>How many course choices do you want to display?</label><br />
                    <select ref="limit">
                      {limits}
                    </select>
              </div>

              <br />
              <input type="submit" className="btn btn-primary" value="View Required Classes"/>
              <br />

            </form>
            <br />
          </div>

          <div id="courses">
              <ol>{htmlCode}</ol>
          </div>
        </div>
    </div>//div to wrap everything into one element
    );


  }//renders bracket
}//class bracket

export default App;
