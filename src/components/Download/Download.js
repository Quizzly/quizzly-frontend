import s from 'Download/Download.scss'
import Api from 'modules/Api.js'
import {browserHistory} from 'react-router'

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
        <div className="innerDownloadContainer">
          <h1 className="title">DOWNLOAD THE QUIZZLY CLIENT</h1>
          <div className="downloadLinks">
            <a
              href="https://s3-us-west-2.amazonaws.com/downloads-quizzly/Quizzly-OSX.zip"
            >
              MAC OSX
            </a>
            <a
              href="https://s3-us-west-2.amazonaws.com/downloads-quizzly/Quizzly-win32-x64.zip"
            >
              WINDOWS
            </a>
          </div>
          <div
            className="backButton"
            onClick={() => {browserHistory.goBack()}}
          >
            &larr; Back
          </div>
        </div>
      </div>
    )
  }
}
