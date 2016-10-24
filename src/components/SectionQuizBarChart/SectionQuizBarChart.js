import s from 'SectionQuizBarChart/SectionQuizBarChart.scss'
var rd3b = require('react-d3-basic');

var BarStackChart = rd3b.BarStackChart;
var width = 700,
    height = 400,
    title = "Bar Chart",
    chartSeries = [
      {
        field: 'Questions Correct',
        name: 'Questions Correct'
      }
    ],
    x = function(d) {
      return d.Name;
    },
    xScale = 'ordinal',
    xLabel = "Student",
    yLabel = "Total # questions",
    yTickFormat = d3.format(".2s");

export default class SectionQuizBarChart extends React.Component {
  static propTypes = {
    dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    console.log("Size is " + props.size);
    this.state = {
      yTicks : [props.size]
    }
  }

  componentWillReceiveProps(nextProps){
    // console.log("props changed");
    // console.log(nextProps.student);
    console.log("New size is " + nextProps.size);
    this.setState({
      yTicks : [nextProps.size]
    });
    // console.log(this.state.student);
    // this.renderChart();

  }

  componentDidMount() {
  }

  renderChart(){
    return (
      <BarStackChart
        data= {this.props.data}
        width= {width}
        height= {height}
        chartSeries = {chartSeries}
        x= {x}
        xScale= {xScale}
        yTicks= {this.state.yTicks}/>
    )
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="chartContainer">
        {this.renderChart()}
      </div>
    )
  }

  /*
  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="">
        <BarChart
          title= {title}
          data= {pr.data}
          width= {width}
          height= {height}
          chartSeries = {chartSeries}
          x= {x}
          xLabel= {xLabel}
          xScale= {xScale}
          yTicks= {st.yTicks}
          yLabel = {yLabel}
        />
      </div>
    )
  }
  */
}
