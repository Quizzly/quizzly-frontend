import s from 'StudentQuizzes/StudentQuizzes.scss'
import StudentQuiz from 'StudentQuiz/StudentQuiz.js'
import StudentQuestionModal from 'StudentQuestionModal/StudentQuestionModal.js'
import Api from 'modules/Api.js'
import Utility from 'modules/Utility.js'

export default class StudentQuizzes extends React.Component {
  static propTypes = {
    course: React.PropTypes.object.isRequired,
    student: React.PropTypes.object,
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
    .then((studentAnswersResponse) => {
      // console.log("studentAnswers", studentAnswers);
      studentAnswers = studentAnswersResponse;
      studentAnswers.map((studentAnswer) => {
        quizIds.push(studentAnswer.quiz.id);
      });
      console.log(quizIds);

      quizIds = Utility.removeDuplicates(quizIds);
      console.log(quizIds);
      return Api.db.post('quiz/getQuizzesByQuizIds', {quizIds: quizIds});
    })
    .then((quizzes) => {
      console.log("quizzes", quizzes);
      console.log("studentAnswers", studentAnswers);
      quizzes.map((quiz) => {
        quiz.studentAnswers = [];
        return quiz;
      });

      studentAnswers.map((studentAnswer) => {
        quizzes.map((quiz) => {
          if(studentAnswer.quiz.id == quiz.id) {
            return quiz.studentAnswers.push(studentAnswer);
          }
        });
      });
      console.log("new quizzes", quizzes);
      this.setState({studentQuizzes: quizzes});
    });
  }

  showModal(question) {
    Api.db.findOne('question', question.id)
    .then((question) => {
      this.setState({
        showModal: true,
        modalQuestion: question
      });
    });
  }

  closeModal() {
    this.setState({showModal: false});
  }

  renderStudentQuizzes() {
    return this.state.studentQuizzes.map((studentQuiz, i) => {
      return (
        <StudentQuiz
          key={i}
          studentQuiz={studentQuiz}
          studentQuizIndex={i}
          showModal={this.showModal.bind(this)}
        />
      );
    });
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="studentQuizzesContainer">
        <div id="quizzes" className="p20 quizzlyContent">
          {this.renderStudentQuizzes()}
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
