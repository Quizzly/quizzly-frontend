import s from 'StudentQuiz/StudentQuiz.scss'
import StudentQuestion from 'StudentQuestion/StudentQuestion.js'

export default class StudentQuiz extends React.Component {
  static propTypes = {
    dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      title: "Quiz Title",
      showModal: false,
    };
  }

  componentDidMount() {
  }

  calculateCorrectAnswers() {
    var studentAnswers = this.props.studentQuiz.studentAnswers;
    var numCorrect = 0;
    studentAnswers.map(function(studentAnswer) {
      if(studentAnswer.answer == undefined || studentAnswer.answer.correct) {
        numCorrect++;
      }
    });
    return numCorrect;
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="studentQuizContainer">
        <div className="scrollRegion">
          <div className="header">
            <span className="pointer">{pr.studentQuiz.title}</span>
            </div>
          <div className="body">
            {pr.studentQuiz.studentAnswers.map(function(studentAnswer, studentAnswerIndex) {
              return (
                <StudentQuestion
                  key={studentAnswerIndex}
                  studentQuizIndex={pr.studentQuizIndex}
                  studentAnswerIndex={studentAnswerIndex}
                  studentAnswer={studentAnswer}
                  showModal={pr.showModal.bind(this)}
                />
              );
            }, this)}
          </div>
          <div className="studentFooterButton">{this.calculateCorrectAnswers() + "/" + pr.studentQuiz.studentAnswers.length}</div>
        </div>
      </div>
    )
  }
}
