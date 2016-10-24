import s from 'MetricQuiz/MetricQuiz.scss'
import SectionQuizBarChart from 'SectionQuizBarChart/SectionQuizBarChart.js'
import Api from 'modules/Api.js'
export default class MetricSectionQuiz extends React.Component {
  static propTypes = {
    dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    console.log("MetricQuiz");
    this.state = {
      data: [],
      size: 0
    }
  }

  componentDidMount() {
    console.log("component mounted");
    this.renderChart();
  }
  componentWillReceiveProps(nextProps){
      this.renderChart(nextProps);
  }
  renderChart(props){
    console.log("quiz js render chart func called");
    var me = this;
    var pr = props || this.props;

    Api.db.post('quiz/numberOfCorrectAnswersPerQuiz', {
      quizId: pr.quiz
    })
    .then(data => {
      console.log(data);
      me.setState({
        data: data,
        size: 1
      });
    });
    // var data = [
    //   {
    //     "name": "Kevin",
    //     "Questions Correct": 1,
    //     "Questions Incorrect": 2
    //   },
    //   {
    //     "name": "Benny",
    //     "Questions Correct": 2,
    //     "Questions Incorrect": 1
    //   }
    // ];
  }

  render() {
    console.log("render in metric quiz called");
    var st = this.state;
    var pr = this.props;
    return (
      <div className="">
        <SectionQuizBarChart
          data={st.data}
          size={st.size}
        />
      </div>
    )
  }
}
