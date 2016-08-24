import s from 'Metrics/Metrics.scss'

export default class Metrics extends React.Component {
  static propTypes = {
    dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="metricsContainer">
      </div>
    )
  }
}
