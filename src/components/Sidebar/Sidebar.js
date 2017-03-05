import s from 'Sidebar/Sidebar.scss'
import {browserHistory} from 'react-router'
import Utility from 'modules/Utility.js'

export default class Sidebar extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      selected: window.location.pathname
    };
  }

  componentDidMount() {
  }

  setFilter(filter) {
    browserHistory.push(filter);
    this.setState({selected: filter});
  }

  isActive(value){
    return 'sidebarElement ' + ((value === this.state.selected) ? 'greenBlueGradientLight' : '');
  }

  renderUserContent() {
    switch(this.props.user.type) {
      case 'STUDENT':
        return (
          <span>
            <div className={this.isActive('/s/quizzes')} onClick={this.setFilter.bind(this, '/s/quizzes')}>Quizzes</div>
            {/*<div className={this.isActive('/s/metrics')} onClick={this.setFilter.bind(this, '/s/metrics')}>Metrics</div>*/}
          </span>
        );
        break;
      case 'PROFESSOR':
        return (
          <span>
            <div className={this.isActive('/p/courses')} onClick={this.setFilter.bind(this, '/p/courses')}>Courses</div>
            <div className={this.isActive('/p/quizzes')} onClick={this.setFilter.bind(this, '/p/quizzes')}>Quizzes</div>
            <div className={this.isActive('/p/lectures')} onClick={this.setFilter.bind(this, '/p/lectures')}>Lectures</div>
            <div className={this.isActive('/p/metrics')} onClick={this.setFilter.bind(this, '/p/metrics')}>Metrics</div>
            {/*<div className={this.isActive('/p/download')} onClick={this.setFilter.bind(this, '/p/download')}>Download Grades</div>*/}
          </span>
        );
        break;
    }
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="sidebarContainer">
        <h1 className="quizzlyLogo">QUIZZLY</h1>
        {this.renderUserContent()}
      </div>
    )
  }
}
