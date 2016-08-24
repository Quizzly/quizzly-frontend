import s from 'AddQuizBody/AddQuizBody.scss'

export default class AddQuizBody extends React.Component {
  static propTypes = {
    quizzes: React.PropTypes.array.isRequired,
    quizIndex: React.PropTypes.object.isRequired, // it can be null, but should be number
    addQuizToCourse: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    var quiz = {title: ""};
    console.log("got here 1", props.quizIndex);
    if(props.quizIndex > -1) {
      console.log("got here 2");
      quiz = props.quizzes[props.quizIndex];
    }

    console.log("quiz", quiz);
    this.state = {
      quiz: quiz
    };
  }

  componentDidMount() {
  }

  handleChange(key, event) {
    var state = this.state;
    state[key].title = event.target.value;
    this.setState({quiz: state.quiz});
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="addQuizBodyContainer">
        <div className="p20">
          <div className="flexVertical">
            <span className="mr15" style={{"width":"94px"}}>Quiz title</span>
            <input
              type="text"
              className="addCourseInput"
              placeholder="Quiz title..."
              value={st.quiz.title}
              onChange={this.handleChange.bind(this, 'quiz')}
            />
            <div className="plusButton ml15" onClick={pr.addQuizToCourse.bind(this, st.quiz, pr.quizIndex)}>+</div>
          </div>
        </div>
      </div>
    )
  }
}
