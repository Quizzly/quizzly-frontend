import s from 'Download/Download.scss'
import Api from 'modules/Api.js'

export default class Download extends React.Component {
  static propTypes = {
    //dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  downloadMacVersion() {

  }

  downloadWindowsVersion() {

  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="downloadContainer">
        <div className="flexHorizontal">
        <ul>
          <li><a href="downloads/client/mac">mac</a></li>
          <li><a href="downloads/client/windows">windows</a></li>
        </ul>
        </div>
      </div>
    )
  }
}
