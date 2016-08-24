import s from 'StudentQuestionModal/StudentQuestionModal.scss'
import Modal from 'Modal/Modal.js'
import Api from 'modules/Api.js'
import Session from 'modules/Session.js'

export default class StudentQuestionModal extends React.Component {
  static propTypes = {
    question: React.PropTypes.object.isRequired,
    closeModal: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      studentAnswer: {}
    };
  }

  componentDidMount() {
    Api.db.find('studentanswer', {question: this.props.question.id, student: Session.user.id})
    .then((studentAnswer) => {
      console.log("studentAnswer>>>>>>>>", studentAnswer);
      this.setState({studentAnswer: studentAnswer[0]});
    });
  }

  chooseAnswerStatus(answer) {
    if(answer.correct) {
      return "correctAnswer";
    }

    if(this.state.studentAnswer.answer && answer.id == this.state.studentAnswer.answer.id) {
      return "wrongAnswer";
    }
  }

  renderModalBody() {
    return (
      <div id="addQuestionBody">
        <div className="p20">
          <div className="flex mb20 flexVertical">
            <input
              type="text"
              className="addCourseInput"
              placeholder="Question..."
              value={this.props.question.text}
              disabled
            />
          </div>
          {this.props.question.answers.map((answer, answerIndex) => {
            return (
              <div className="flex mb20 flexVertical" key={answerIndex}>
                <span className="mr15">{answer.option}.)</span>
                <input
                  type="text"
                  className={`addCourseInput ${this.chooseAnswerStatus(answer)}`}
                  value={answer.text}
                  placeholder="Option..."
                  disabled
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  renderModalTitle() {
    var question = this.props.question;
    switch(question.type) {
      case "multipleChoice":
        return `Multiple Choice Question From Quiz: ${question.quiz.title}`;
      case "freeResponse":
        return `Free Response Question From Quiz: ${question.quiz.title}`;
      default:
        return "Question type unknown";
    }
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="studentQuestionModalContainer">
        <Modal
          title={this.renderModalTitle()}
          body={this.renderModalBody()}
          closeModal={pr.closeModal.bind(this)}
        />
      </div>
    )
  }
}
