import s from 'MetricQuiz/MetricQuiz.scss'
import QuizBarChart from 'QuizBarChart/QuizBarChart.js'
import Api from 'modules/Api.js'
export default class MetricSectionQuiz extends React.Component {
  static propTypes = {
    dummy: React.PropTypes.object.isRequired, //What object is required?
  }

  constructor(props) {
    super(props);
    console.log("MetricQuiz: Constructor");
    this.state = {
      data: [],
      size: 0
    }
  }

  componentDidMount() { //Only called once?
    console.log("MetricQuiz: componentDidMount");
    this.renderChart();
  }
  componentWillReceiveProps(nextProps){ //Called when mounted but updated with new props or just updated?
    console.log("MetricQuiz: componentWillReceiveProps");
      this.renderChart(nextProps);
  }
  renderChart(props){
    console.log("MetricQuiz: renderChart");
    var me = this;
    var pr = props || me.props;

    Api.db.post('quiz/numberOfCorrectAnswersPerQuiz', {
      quizId: pr.quiz
    })
    .then(data => {
      console.log(data);
      me.setState({
        data: data,
        size: 2 //What is size?
      });
    });
  }

  render() {
    console.log("MetricQuiz: render");
    var st = this.state;
    var pr = this.props;
    return (
      <div className="">
        <QuizBarChart
          data={st.data}
          size={st.size}
        />
      </div>
    )
  }
}
