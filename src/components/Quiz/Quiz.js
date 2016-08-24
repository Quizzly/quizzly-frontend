import s from 'Quiz/Quiz.scss'
import Question from 'Question/Question.js'
import Panel from 'elements/Panel/Panel.js'
import Utility from 'modules/Utility.js'

export default class Quiz extends React.Component {
  static propTypes = {
    quiz: React.PropTypes.object.isRequired,
    quizIndex: React.PropTypes.number.isRequired,
    deleteQuizFromCourse: React.PropTypes.func.isRequired,
    deleteQuestionFromQuiz: React.PropTypes.func.isRequired,
    showQuestionModal: React.PropTypes.func.isRequired,
    showQuestionInModal: React.PropTypes.func.isRequired,
    showQuizModal: React.PropTypes.func.isRequired,
    askQuestion: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      title: "Quiz Title",
      showModal: false
    };
  }

  componentDidMount() {
  }

  renderPanelHeader() {
    var pr = this.props;
    var header = [];
    header.push(
      <span
        key={0}
        className="pointer"
        onClick={pr.showQuizModal.bind(this, pr.quizIndex)}
      >
        {pr.quiz.title}
      </span>
    );
    header.push(
      <span key={1}
        className="floatR pointer"
        onClick={pr.deleteQuizFromCourse.bind(this, pr.quizIndex)}
      >
        <img src={Utility.CLOSE_IMAGE_PATH} style={{"width":"12px"}} />
      </span>
    );

    return header;
  }

  renderPanelBody() {
    var pr = this.props;
    return pr.quiz.questions.map((question, questionIndex) => {
      return (
        <Question
          key={questionIndex}
          quizIndex={pr.quizIndex}
          questionIndex={questionIndex}
          quiz={pr.quiz}
          question={question}
          showQuestionInModal={pr.showQuestionInModal.bind(this)}
          deleteQuestionFromQuiz={pr.deleteQuestionFromQuiz.bind(this)}
          askQuestion={pr.askQuestion.bind(this)}
        />
      );
    });
  }

  renderPanelFooter() {
    var pr = this.props;
    return <div
      className="panelFooterButton"
      onClick={pr.showQuestionModal.bind(this, pr.quizIndex, -1)}
    >
      +
    </div>;
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <Panel
        header={this.renderPanelHeader()}
        body={this.renderPanelBody()}
        footer={this.renderPanelFooter()}
      />
    )
  }
}
