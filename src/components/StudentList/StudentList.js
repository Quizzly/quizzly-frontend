import s from 'StudentList/StudentList.scss'
import {browserHistory} from 'react-router'

export default class StudentList extends React.Component {
  static propTypes = {
    dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      students: []
    }
  }

  componentDidMount() {
    Api.db.post('student/findinorder')
    .then(students => {
      console.log("students", students);
      this.setState({students: students});
    });
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="studentListContainer">
        {this.state.students.map(function(student) {
          return(
            <div className="row">
              {/*<div className="columns three">
                {student.firstName} {student.lastName}
              </div>*/}
              <div className="columns three">
                {student.email}
              </div>
            </div>
          );
        }, this)}
      </div>
    )
  }
}
