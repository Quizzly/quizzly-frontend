import s from 'MetricSectionQuiz/MetricSectionQuiz.scss'
import SectionQuizBarChart from 'SectionQuizBarChart/SectionQuizBarChart.js'

export default class MetricSectionQuiz extends React.Component {
  static propTypes = {
    dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    console.log("MetricSectionQuiz");
    this.state = {
      data: [],
      size: 0
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

    // Api.db.find('studentanswer', {
    //   quiz: pr.quiz,
    //   section: pr.section
    // })
    // .then(data => {
    //   me.setState({
    //     data: data
    //   });
    // });
    var data = [
      {
        "name": "Kevin",
        "Questions Correct": 1,
        "Questions Incorrect": 2
      },
      {
        "name": "Benny",
        "Questions Correct": 2,
        "Questions Incorrect": 1
      }
    ];
    this.setState({
      data: data,
      size: 3
    });
  }

  render() {
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
