import s from 'MetricSectionStudent/MetricSectionStudent.scss'
import SectionStudentBarChart from 'SectionStudentBarChart/SectionStudentBarChart.js'
import Api from 'modules/Api.js'
export default class MetricSectionStudent extends React.Component {
  static propTypes = {
    dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    console.log("MetricSectionStudent");
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

    Api.db.post('section/numberOfCorrectAndIncorrectAnswersForStudent', {
      studentId: pr.student,
      sectionId: pr.section
    })
    .then(data => {
      console.log(data);
      me.setState({
        data: data,
        size: 4
      });
    });
    // var data = [
    //   {
    //     "Name": "Business Attire",
    //     "Questions Correct": 1,
    //     "Questions Incorrect": 2
    //   },
    //   {
    //     "Name": "Group Work",
    //     "Questions Correct": 2,
    //     "Questions Incorrect": 1
    //   }
    // ];
    // this.setState({
    //   data: data,
    //   size: 3
    // });
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="">
        <SectionStudentBarChart
          data={st.data}
          size={st.size}
        />
      </div>
    )
  }
}
