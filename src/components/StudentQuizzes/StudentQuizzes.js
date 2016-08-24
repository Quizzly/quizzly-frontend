import s from 'StudentQuizzes/StudentQuizzes.scss'
import StudentQuiz from 'StudentQuiz/StudentQuiz.js'
import StudentQuestionModal from 'StudentQuestionModal/StudentQuestionModal.js'

export default class StudentQuizzes extends React.Component {
  static propTypes = {
    course: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      studentQuizzes: [{title: "", studentAnswers: [], course: 0, id: 0}],
      showModal: false,
      modalQuestion: {answers: [], text: "", duration: 0},
      modalInfo: {
        modalType: "ADD_QUIZ",
        title: "Add Quiz",
        index: -1
      }
    };
  }

  componentDidMount() {
    this.getQuizzesFromCourseId(this.props.course.id);
  }

  componentWillReceiveProps(newProps) {
    this.getQuizzesFromCourseId(newProps.course.id);
  }

  getQuizzesFromCourseId(courseId) {
    // Api.db.find("quiz", { course: courseId })
    // .then(function(studentQuizzes) {
    //   console.log("studentQuizzes", studentQuizzes);
    //   if(studentQuizzes == undefined) return; // if there are no courses, then there are no sections
    //   me.setState({studentQuizzes: studentQuizzes});
    // });
    if(this.props.student == undefined) {
      return;
    }
    var quizIds = [];
    var studentAnswers = [];
    Api.db.find('studentanswer', {course: courseId, student: this.props.student.id})
    .then(function(studentAnswersResponse) {
      // console.log("studentAnswers", studentAnswers);
      studentAnswers = studentAnswersResponse;
      studentAnswers.map(function(studentAnswer) {
        quizIds.push(studentAnswer.quiz.id);
      });
      console.log(quizIds);

      quizIds = Utility.removeDuplicates(quizIds);
      console.log(quizIds);
      return Api.db.post('quiz/getQuizzesByQuizIds', {quizIds: quizIds});
    })
    .then(function(quizzes) {
      console.log("quizzes", quizzes);
      console.log("studentAnswers", studentAnswers);
      quizzes.map(function(quiz) {
        quiz.studentAnswers = [];
        return quiz;
      });

      studentAnswers.map(function(studentAnswer) {
        quizzes.map(function(quiz) {
          if(studentAnswer.quiz.id == quiz.id) {
            return quiz.studentAnswers.push(studentAnswer);
          }
        });
      });
      console.log("new quizzes", quizzes);
      me.setState({studentQuizzes: quizzes});
    });
  }

  showModal(question) {
    this.setState({
      showModal: true,
      modalQuestion: question
    });
  }

  closeModal() {
    this.setState({showModal: false});
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="studentQuizzesContainer">
        <div id="quizzes" className="p20 quizzlyContent">
          {st.studentQuizzes.map(function(studentQuiz, studentQuizIndex) {
            return (
              <StudentQuiz
                studentQuiz={studentQuiz}
                key={studentQuizIndex}
                studentQuizIndex={studentQuizIndex}
                showModal={this.showModal.bind(this)}
              />
            );
          }, this)}
        </div>
        {st.showModal ?
          <StudentQuestionModal
            question={st.modalQuestion}
            closeModal={this.closeModal.bind(this)}
          />
          :
          null
        }
      </div>
    )
  }
}
