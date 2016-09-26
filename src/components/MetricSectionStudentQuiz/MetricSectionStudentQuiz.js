import s from 'MetricSectionStudentQuiz/MetricSectionStudentQuiz.scss'
import StudentQuizBarChart from 'SectionStudentQuizBarChart/SectionStudentQuizBarChart.js'
import Api from 'modules/Api.js'
import Solution from 'Solution/Solution.js'
export default class MetricSectionStudentQuiz extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);

    this.state = {
      studentanswers: [],
      questions:[],
      name: "",
      size: 0,
      correct: 0,
      incorrect: 0
    }
  }

  componentDidMount() {
    this.renderChart();
  }
  componentWillReceiveProps(nextProps){
      this.renderChart(nextProps);
  }
  renderChart(props){
    var me = this;
    var pr = props || this.props;

    console.log(pr.student);
    Api.db.find('studentanswer', {
      student: pr.student,
      quiz: pr.quiz,
      section: pr.section
    })
    .then(studentanswers => {
      me.setState({
        studentanswers: studentanswers,
        name: studentanswers[0].student.firstName
      });
      // me.findQuestionsAndAnswers();
      me.calculate();
      console.log(me.state.size);
      console.log(me.state.correct);
      console.log(me.state.incorrect);
    });
  }
  // findQuestionsAndAnswers(){
  //   $.when(
  //     Api.db.find('quiz', {quiz: this.state.quiz}),
  //     Api.db.find('answer'), {question: this.state.question})
  //
  // }
  calculate(){
    var countIncorrect = 0;
    var size;

    var size = this.state.studentanswers.length;
    for(var i = 0 ; i < size; i++){
      if(this.state.studentanswers[i].answer && this.state.studentanswers[i].answer.correct == false){
        countIncorrect++;
      }
    }
    var countCorrect = size - countIncorrect;
    console.log(this.state.studentanswers);
    Api.db.post('studentanswer/getMetrics', { quiz: this.props.quiz, studentanswers: this.state.studentanswers })
    .then(questions => {
      this.setState({
        questions: questions,
        size: size,
        correct: countCorrect,
        incorrect: countIncorrect
      });
    });
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="">
        <StudentQuizBarChart
          name={this.state.name}
          correct={this.state.correct}
          incorrect={this.state.incorrect}
          size={this.state.size}
        />
        <Solution
          questions={this.state.questions}
        />
      </div>
    )
  }
}
