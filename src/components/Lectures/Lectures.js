import s from 'Lectures/Lectures.scss'

export default class Lectures extends React.Component {
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
      <div className="lecturesContainer">
        <div className="quizzlyContent">
          
        </div>
      </div>
    )
  }
}
