import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Style from 'components/Style/Style.js'
import Entrance from 'components/Entrance/Entrance.js'
import Layout from 'components/Layout/Layout.js'
import Courses from 'components/Courses/Courses.js'
import Quizzes from 'components/Quizzes/Quizzes.js'
import Lectures from 'components/Lectures/Lectures.js'
import Metrics from 'components/Metrics/Metrics.js'
import StudentQuizzes from 'components/StudentQuizzes/StudentQuizzes.js'
import StudentMetrics from 'components/StudentMetrics/StudentMetrics.js'
import AskStudentQuestion from 'components/AskStudentQuestion/AskStudentQuestion.js'
import Download from 'components/Download/Download.js'
import StudentList from 'components/StudentList/StudentList.js'
import AnswerQuestion from 'components/AnswerQuestion/AnswerQuestion'
import Socket from 'modules/Socket'


import Api from 'modules/Api.js'
import Session from 'modules/Session.js'

function checkSession(nextState, replace, callback) {
  Api.server.post('session')
  .then((user) => {
    console.log("trying to session", user);
    if(!user) { // if login fails
      replace({
        pathname: '/entrance',
        state: { nextPathname: nextState.location.pathname }
      });
      callback();
    } else { // if login succeeds
      var route = 'professor';
      switch(user.type) {
        case "STUDENT":
          Socket.subscribeToSections();
          route = 'student';
        break;
        case "PROFESSOR":
          route = 'professor';
        break;
      }

      Api.db.findOne(route, user.id)
      .then((user) => {
        console.log("full user?", user);
        Session.user = user;
        callback();
        // console.log('Admin Login? ', Session.isAdmin());
      });
    }
  });
}

function checkAdmin(nextState, replace, callback) {
  if (Session.isAdmin()) {
    callback();
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout} onEnter={checkSession}>
      <IndexRoute component={Courses} />
      <Route path="p/courses" component={Courses} />
      <Route path="p/lectures" component={Lectures} />
      <Route path="p/quizzes" component={Quizzes} />
      <Route path="p/metrics" component={Metrics} />
      <Route path="p/download" component={Download} />
      <Route path="s/quizzes" component={StudentQuizzes} />
      <Route path="s/metrics" component={StudentMetrics} />
    </Route>
    <Route path="s/answer/:questionKey" component={AnswerQuestion}/>
    <Route path="/s/question/:questionId/:sectionId" component={AskStudentQuestion} />
    <Route path="/entrance" component={Entrance} />
    <Route path="/style" component={Style} />
    <Route path="/studentlist" component={StudentList} />
  </Router>
), document.getElementById("quizzly"));
