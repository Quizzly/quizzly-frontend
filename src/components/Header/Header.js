import s from 'Header/Header.scss'
import {browserHistory} from 'react-router'

export default class Header extends React.Component {
  static propTypes = {
    showProfileModal: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      term: props.term,
      terms: props.terms,
      course: props.course,
      courses: props.courses,
      sections: props.course.sections,
    };
  }

  componentDidMount() {
    var pr = this.props;

    this.setState({
      term: pr.term,
      terms: pr.terms,
      course: pr.course,
      courses: pr.courses,
    });
  }

  componentWillReceiveProps(nextProps) {
    var me = this;
    this.setState({
      term: nextProps.term,
      terms: nextProps.terms,
      course: nextProps.course,
      courses: nextProps.courses,
    });
  }

  changeCourse(event) {
    this.props.changeCourse(event.target.value);
  }

  changeTerm(event) {
    this.props.changeTerm(event.target.value);
  }

  handleLogout() {
    $.post("/logout")
    .then(function() {
      console.log("user successfully logged out");
      browserHistory.push('/entrance');
    })
    .fail(function() {
      console.log("logout failed");
    });
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="headerContainer">
        <div>
          <select value={st.term.id} className="dropdown ml10" onChange={this.changeTerm.bind(this)}>
            {st.terms.map(function(term, termIndex) {
              return <option key={termIndex} value={term.id}>{term.season.season + " " + term.year.year}</option>
            })}
          </select>
          <select value={st.course.id} className="dropdown ml10" onChange={this.changeCourse.bind(this)}>
            {st.courses.map(function(course, courseIndex) {
              if(course.term == st.term.id) {
                return <option key={courseIndex} value={course.id}>{course.title}</option>
              }
            }, this)}
          </select>
        </div>
        <div className="flexVertical" style={{"marginLeft":"auto"}}>
          <a className="ml30 pointer" onClick={this.handleLogout.bind(this)}>Log Out</a>
          <a className="ml30 pointer mr20" onClick={pr.showProfileModal.bind(this)}>Profile</a>
        </div>
      </div>
    )
  }
}
