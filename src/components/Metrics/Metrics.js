import s from 'Metrics/Metrics.scss'
import Api from 'modules/Api.js'
import DonutComponent from 'DonutComponent/DonutComponent.js'

var Promise = require('bluebird');


export default class Metrics extends React.Component {
  static propTypes = {
    dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    console.log("props.course", props.course);
    this.state = {
      course: props.course,
      sections: props.course.sections,
      students: [],
      quizzes: [],
      questions: [],

      section: {id: -1},
      // student: {id: -1, getFullName: function() {return "Conner Jack"}, firstName: "Jake"},
      student: {id: -1},
      quiz: {id: -1},
      question: {id: -1},

      allSections: {id: -1, title: "All"},
      allStudents: {id: -1, title: "All"},
      allQuizzes: {id: -1, title: "All"},
      allQuestions: {id: -1, title: "All"},

      isAllSectionsOptionAvailable: true,
      isAllStudentsOptionAvailable: true,
      isAllQuizzesOptionAvailable: true,
      isAllQuestionsOptionAvailable: true,
    }
  }

  componentDidMount() {
    console.log("in componentDidMount");
    this.populateDropdowns(this.props.course);
  }

  componentWillReceiveProps(newProps) {
    console.log("in componentWillReceiveProps");
    this.populateDropdowns(newProps.course);
  }

  populateDropdowns(course) {
    console.log("newProps", course);
    if(course.id == -1) return;
    console.log("course.id: ", course.id);
    var me = this;
    $.when(
      Api.db.find('section', {course: course.id}),
      Api.db.post('student/getStudentsByCourseId/' + course.id),
      Api.db.find('quiz', {course: course.id})
    ).then(function(sections, students, quizzes) {
      // console.log("sections", sections);
      // console.log("students", students);
      // console.log("quizzes", quizzes);
      me.setState({
        sections: sections[0],
        students: students[0],
        quizzes: quizzes[0],
        questions: [],
      });
    });
  }

  changeSection(event) {
    var section = this.state.section;
    section.id = event.target.value;
    var me = this;

    if(section.id != -1) { // specific section
      Api.db.post('student/getStudentsBySectionId/' + section.id)
      .then(function(students) {
        me.setState({
          section: section,
          student: {id: -1},

          students: students,

          isAllSectionsOptionAvailable: true,
          isAllStudentsOptionAvailable: true,
        });
      });
    } else { // all sections
      $.when(
        Api.db.post('student/getStudentsByCourseId/' + this.state.course.id),
        Api.db.find('section', {course: this.state.course.id})
      )
      .then(function(students, sections) {
        me.setState({
          section: {id: -1},
          student: {id: -1},

          sections: sections[0],
          students: students[0],

          isAllSectionsOptionAvailable: true,
          isAllStudentsOptionAvailable: true,
        });
      });
    }
  }


  changeStudent(event) {
    var student = this.state.student;
    student.id = event.target.value;
    var me = this;

    if(student.id != -1) { // specific student
      Api.db.post('section/getSectionByStudentAndCourse/', {courseId: this.state.course.id, studentId: student.id})
      .then(function(section) {
        me.setState({
          section: section,
          student: student,

          sections: [section],
        });
      });
    } else { // all students
      Api.db.find('section', {course: this.state.course.id})
      .then(function(sections) {
        me.setState({
          student: {id: -1},

          sections: sections,
        });
      });
    }
  }

  changeQuiz(event) {
    var quiz = this.state.quiz;
    quiz.id = event.target.value;
    var me = this;
    function get_selected(selection_array, selection_id) {
        var selection = [];
        if (selection_id == -1) {
          selection = selection_array;
        } else {
          //array starts at 0 position
          selection = selection_array[selection_id-1];
        }
        return selection;
    }

    var selected_quiz = get_selected(this.state.quizzes, this.state.quiz.id);



    if (quiz.id != -1){
      Api.db.find('question', {quiz: selected_quiz.id})
      .then(function(questions) {
        me.setState({
          quiz: quiz,
          question: {id: -1},

          questions: questions,
        });
      });
    } else {
      me.setState({
        quiz: quiz,
        question: {id: -1},

        questions: [],
      });
    }
  }

  changeQuestion(event) {
    var question = this.state.question;
    question.id = event.target.value;
    this.setState({
      question: question,
    });
  }

  // changeStudent(event) {
  //   var student = this.state.student;
  //   student.id = event.target.value;
  //   var event_target = event.target;
  //   var me = this;
  //   // $.post('/student/getStudentsByCourseId', {question: question.id})
  //   // .then(function(answers) {
  //     me.setState({
  //       // question: event_target,
  //       // answer: {id: -1},
  //       quiz: {id: -1},
  //       question: {id: -1},
  //       answer: {id: -1},
  //       student: student,
  //
  //       // answers: answers,
  //       // students: [],
  //
  //       isAllQuizzes: false,
  //       isAllQuestions: false,
  //       isAllAnswers: false,
  //       isAllStudents: false
  //     // });
  //   // });
  // });
}

  getMetrics() {
    console.log("getting metrics...");
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div id="metrics" className="quizzlyContent metricsContainer">
        <div className="flexHorizontal">
          <div>
            <div id="sections_div" className="small ml10">Sections</div>
            <select value={this.state.section.id} className="dropdown mr10" onChange={this.changeSection.bind(this)}>
              {this.state.isAllSectionsOptionAvailable ? <option value={this.state.allSections.id}>{this.state.allSections.title}</option> : null }
              {this.state.sections.map(function(section, sectionIndex) {
                return <option key={sectionIndex} value={sectionIndex+1}>{section.title}</option>
              })}
            </select>
          </div>
          <div>
            <div className="small ml10">Students</div>
            <select value={this.state.student.id} className="dropdown mr10" onChange={this.changeStudent.bind(this)}>
              {this.state.isAllStudentsOptionAvailable ? <option value={this.state.allStudents.id}>{this.state.allStudents.title}</option> : null }
              {this.state.students.map(function(student, studentIndex) {
                return <option key={studentIndex} value={studentIndex+1}>{student.firstName}</option>
              })}
            </select>
          </div>
          <div>
            <div className="small ml10">Quizzes</div>
            <select value={this.state.quiz.id} className="dropdown mr10" onChange={this.changeQuiz.bind(this)}>
              {this.state.isAllQuizzesOptionAvailable ? <option value={this.state.allQuizzes.id}>{this.state.allQuizzes.title}</option> : null }
              {this.state.quizzes.map(function(quiz, quizIndex) {
                return <option key={quizIndex} value={quizIndex+1}>{quiz.title}</option>
              })}
            </select>
          </div>
          <div>
            <div className="small ml10">Questions</div>
            <select value={this.state.question.id} className="dropdown mr10" onChange={this.changeQuestion.bind(this)}>
              {this.state.isAllQuestionsOptionAvailable ? <option value={this.state.allQuestions.id}>{this.state.allQuestions.title}</option> : null }
              {this.state.questions.map(function(question, questionIndex) {
                return <option key={questionIndex} value={questionIndex+1}>{question.text}</option>
              })}
            </select>
          </div>
          <button onClick={this.getMetrics.bind(this)}>GET METRICS</button>
        </div>

        {<div>
          <div id="DivChartContainer" className="metricsText"></div>
          <div id="AnswersContainer" className="metricsText"></div>
          </div>
        }
        <DonutComponent></DonutComponent>
      </div>
    )
  }
}
