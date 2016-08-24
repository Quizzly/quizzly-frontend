import s from 'StudentQuestion/StudentQuestion.scss'

export default class StudentQuestion extends React.Component {
  static propTypes = {
    dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  componentDidMount() {
  }

  mouseEnter() {
    this.setState({hover: true});
  }

  mouseLeave() {
    this.setState({hover: false});
  }

  render() {
    var st = this.state;
    var pr = this.props;
    var status = " wrong";
    if(pr.studentAnswer.answer == undefined || pr.studentAnswer.answer.correct) {
      status = " correct";
    }

    return (
      <div
        className={`studentQuestionContainer ${status}`}
        onMouseEnter={this.mouseEnter.bind(this)}
        onMouseLeave={this.mouseLeave.bind(this)}
        onClick={pr.showModal.bind(this, pr.studentAnswer.question)}
      >
        <span className="pointer">{pr.studentAnswer.question.text}</span>
      </div>
    )
  }
}
