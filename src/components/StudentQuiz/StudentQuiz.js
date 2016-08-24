import s from 'StudentQuiz/StudentQuiz.scss'
import StudentQuestion from 'StudentQuestion/StudentQuestion.js'
import Panel from 'elements/Panel/Panel.js'

export default class StudentQuiz extends React.Component {
  static propTypes = {
    studentQuiz: React.PropTypes.object.isRequired,
    studentQuizIndex: React.PropTypes.number.isRequired,
    showModal: React.PropTypes.func.isRequired,
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
    studentAnswers.map((studentAnswer) => {
      if(studentAnswer.answer == undefined || studentAnswer.answer.correct) {
        numCorrect++;
      }
    });
    return numCorrect;
  }

  renderStudentAnswersToQuizzes() {
    var pr = this.props;
    return pr.studentQuiz.studentAnswers.map((studentAnswer, i) => {
      return (
        <StudentQuestion
          key={i}
          studentQuizIndex={pr.studentQuizIndex}
          studentAnswerIndex={i}
          studentAnswer={studentAnswer}
          showModal={pr.showModal.bind(this)}
        />
      );
    });
  }

  renderStudentScore() {
    return (
      <div>{this.calculateCorrectAnswers() + "/" + this.props.studentQuiz.studentAnswers.length}</div>
    );
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <Panel
        header={<span className="pointer">{pr.studentQuiz.title}</span>}
        body={this.renderStudentAnswersToQuizzes()}
        footer={<div className="studentQuizFooter">{this.renderStudentScore()}</div>}
      />
    )
  }
}
