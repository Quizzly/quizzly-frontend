import s from 'LecturePanel/LecturePanel.scss'
import Panel from 'elements/Panel/Panel.js'

export default class LecturePanel extends React.Component {
  static propTypes = {
    lecture: React.PropTypes.object.isRequired,
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
      <Panel
        header={pr.lecture.title}
        body={pr.lecture.title}
      />
    )
  }
}
