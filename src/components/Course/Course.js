import s from 'Course/Course.scss'
import Panel from 'elements/Panel/Panel.js'
import Utility from 'modules/Utility.js'

export default class Course extends React.Component {
  static propTypes = {
    course: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      title: "Course Title",
    };
  }

  componentDidMount() {
    // console.log("Course: componentDidMount", this.props.course);
    this.setState({course: this.props.course});
  }

  renderPanelHeader() {
    var st = this.state;
    var pr = this.props;
    var header = [];
    header.push(
      pr.isCourse ? pr.course.title : pr.section.title
    );

    header.push(
      <span
        key={0}
        className="floatR pointer"
        onClick={pr.isCourse ?
          pr.deleteCourseFromProfessor.bind(this, pr.course)
          :
          pr.deleteSectionFromCourse.bind(this, pr.sectionIndex)}
        >
          <img src={Utility.CLOSE_IMAGE_PATH} style={{"width":"12px"}}/>
        </span>
    );

    return header;
  }

  renderPanelBody() {
    var st = this.state;
    var pr = this.props;
    return (
      pr.course.quizzes.map((quiz, quizIndex) => {
        return (
          <div key={quizIndex} title={quiz} className="panelItem" /*onClick={this.props.showMetricModal.bind(this, quiz)}*/>
            <span className="pointer" onClick={pr.showQuizInModal.bind(this, quizIndex)}>
              {quiz.title}
            </span>
            {pr.isCourse ?
              <span className="floatR pointer opacity40" onClick={pr.deleteQuizFromCourse.bind(this, quizIndex)}>
                <img src={Utility.CLOSE_IMAGE_PATH} style={{width:"8px"}} />
              </span>
              :
              null
            }
          </div>
        );
      })
    );
  }

  renderPanelFooter() {
    var pr = this.props;
    if(pr.isCourse) {
      return <div className="panelFooterButton" onClick={pr.showQuizModal.bind(this)}>+</div>;
    }

    return <div
      className="panelFooterButton"
      style={{fontWeight: "300 !important"}}
      onClick={pr.showStudentsModal.bind(this, pr.section)}
    >
      Update Students
    </div>;
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <Panel
        header={this.renderPanelHeader()}
        body={this.renderPanelBody()}
        footer={this.renderPanelFooter()}
      />
    )
  }
}
