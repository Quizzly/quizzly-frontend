import s from 'Courses/Courses.scss'
import Course from 'Course/Course.js'
import Modal from 'elements/Modal/Modal.js'
import AddCourseBody from 'AddCourseBody/AddCourseBody.js'
import AddQuizBody from 'AddQuizBody/AddQuizBody.js'
import AddQuestionBody from 'AddQuestionBody/AddQuestionBody.js'
import AddStudentsBody from 'AddStudentsBody/AddStudentsBody.js'

import Api from 'modules/Api.js'

export default class Courses extends React.Component {
  static propTypes = {
    course: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      course: props.course,
      sections: props.course.sections,
      showModal: false,
      showMetricModal: false,
      modalInfo: {
        modalType: "ADD_QUIZ",
        title: "Add Quiz"
      }
    };
  }

  componentDidMount() {
    this.getCoursesAndSections(this.state.course.id);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.course != undefined) {
      this.getCoursesAndSections(newProps.course.id);
    }
  }

  getCoursesAndSections(courseId) {
    if(courseId == -1) return;
    var me = this;
    $.when(
      Api.db.find("course", {id: courseId}),
      Api.db.find("section", {course: courseId})
    ).then(function(course, sections) {
      console.log("course", course[0]);
      console.log("sections", sections[0]);

      if(course == undefined) return; // if there are no courses, then there are no sections
      me.setState({
        course: course[0],
        sections: sections[0]
      });
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      showMetricModal: false
    });
  }

  showMetricModal(quiz) {
    console.log("showMetricModal!", quiz);
    var modalInfo = this.state.modalInfo;
    modalInfo.title = quiz.title;
    this.setState({
      showModal: false,
      showMetricModal: true,
      modalInfo: modalInfo
    });
  }

  showCourseModal() {
    var modalInfo = this.state.modalInfo;
    modalInfo.modalType = "ADD_COURSE";
    modalInfo.title = "Add Course or Section";
    this.setState({
      showModal: true,
      showMetricModal: false,
      modalInfo: modalInfo
    });
  }

  showQuizModal(quizIndex) {
    var modalInfo = this.state.modalInfo;
    modalInfo.modalType = "ADD_QUIZ";
    modalInfo.title = "Add Quiz";
    modalInfo.quizIndex = quizIndex;
    this.setState({
      showModal: true,
      showMetricModal: false,
      modalInfo: modalInfo
    });
  }

  showQuizInModal(quizIndex) {
    console.log("showQuizInModal::quizIndex", quizIndex);
    this.showQuizModal(quizIndex);
  }

  showStudentsModal(section) {
    var modalInfo = this.state.modalInfo;
    modalInfo.modalType = "ADD_STUDENTS";
    modalInfo.title = "Add Students";
    modalInfo.section = section;
    this.setState({
      showModal: true,
      showMetricModal: false,
      modalInfo: modalInfo
    });
  }

  addQuizToCourse(quiz, quizIndex) {
    console.log("Adding quiz '" +  quiz.title + "' in course " + this.props.course.title);
    var me = this;
    if(quizIndex > -1) {
      Api.db.update('quiz', quiz.id, { title: quiz.title })
      .then(function(quiz) {
        console.log(quiz);
        var course = me.state.course;
        course.quizzes[quizIndex] = quiz;
        me.setState({course: course});
        me.closeModal();
      });
    } else {
      Api.db.create('quiz', {
          title: quiz.title,
          course: me.props.course.id
        }
      )
      .then(function(quiz) {
        console.log(quiz);
        var course = me.state.course;
        course.quizzes.push(quiz);
        me.setState({course: course});
        me.closeModal();
      });
    }
  }

  addSectionToCourse(section) {
    if(section.title == '') {
      return;
    }
    Api.db.create('section', { title: section.title, course: this.state.course.id })
    .then((section) => {
      console.log("created section", section);
      var sections = this.state.sections;
      sections.push(section);
      this.setState({sections: sections});
      this.closeModal();
    });
  }

  addCourseToProfessor(course, term) {
    var me = this;
    this.props.addCourseToProfessor(course, term)
    .then((newCourse) => {
      this.setState({course: newCourse});
      this.closeModal();
    });
  }

  addStudentsToSection(sectionId, studentIds) {
    this.props.addStudentsToSection(sectionId, studentIds)
    .then(() => {
      this.closeModal();
    });
  }

  deleteSectionFromCourse(sectionIndex) {
    var sections = this.state.sections;
    if(sections[sectionIndex] == undefined) return $.when(null);

    Api.db.post('section/destroy/' + sections[sectionIndex].id)
    .then((section) => {
      console.log("section", section);
      sections.splice(sectionIndex, 1);
      this.setState({sections: sections});
      this.closeModal();
    });
  }

  deleteQuizFromCourse(quizIndex) {
    var me = this;
    var quizzes = this.state.course.quizzes;
    Api.db.findOne('quiz', quizzes[quizIndex].id)
    .then((quiz) => {
      return Api.db.post('quiz/destroy/' + quizzes[quizIndex].id);
    })
    // .then(function(quiz) {
    //   if(quiz.questions.length == 0) return $.when(null);
    //   var questionIds = quiz.questions.map(function(question){return question.id;});
    //   return $.post('/question/multidestroy', {ids: questionIds});
    // })
    .then(() => {
      quizzes.splice(quizIndex, 1);
      var course = this.state.course;
      course.quizzes = quizzes;
      this.setState({course: course});
      this.closeModal();
    });
  }

  deleteCourseFromProfessor(course) {
    var me = this;
    this.props.deleteCourseFromProfessor(course)
    .then(() => {
      var course = {
        id: -1,
        title: "FAKE 101",
        quizzes: [],
        sections: []
      };
      this.setState({course: course});
    });
  }

  renderCourse() {
    var st = this.state;
    if(st.course.id == -1) {
      return null;
    }

    return (
      <Course
        course={st.course}
        isCourse={true}
        ref={'course'}
        showQuizModal={this.showQuizModal.bind(this)}
        showQuizInModal={this.showQuizInModal.bind(this)}
        showMetricModal={this.showMetricModal.bind(this)}
        deleteQuizFromCourse={this.deleteQuizFromCourse.bind(this)}
        sectionIndex={-1}
        deleteCourseFromProfessor={this.deleteCourseFromProfessor.bind(this)}
        deleteSectionFromCourse={this.deleteSectionFromCourse.bind(this)}
      />
    );
  }

  renderCourses() {
    var st = this.state;
    return st.sections.map((section, sectionIndex) => {
      // this is section, not course!
      return (
        <Course
          section={section}
          sectionIndex={sectionIndex}
          course={st.course}
          isCourse={false}
          key={sectionIndex}
          showQuizInModal={this.showQuizInModal.bind(this)}
          showMetricModal={this.showMetricModal.bind(this)}
          showStudentsModal={this.showStudentsModal.bind(this)}
          deleteSectionFromCourse={this.deleteSectionFromCourse.bind(this)}
        />
      );
    });
  }

  renderModalBody() {
    var st = this.state;
    switch (st.modalInfo.modalType) {
      case "ADD_COURSE":
        return <AddCourseBody
          addCourseToProfessor={this.addCourseToProfessor.bind(this)}
          addSectionToCourse={this.addSectionToCourse.bind(this)}
        />;
      case "ADD_QUIZ":
        return <AddQuizBody
          addQuizToCourse={this.addQuizToCourse.bind(this)}
          quizIndex={st.modalInfo.quizIndex}
          quizzes={st.course.quizzes}
        />;
      case "ADD_STUDENTS":
        return <AddStudentsBody
          addStudentsToSection={this.addStudentsToSection.bind(this)}
          section={st.modalInfo.section}
        />;
    }
  }

  renderModal() {
    var st = this.state;
    return (
      <Modal
        title={st.modalInfo.title}
        body={this.renderModalBody()}
        closeModal={this.closeModal.bind(this)}
      />
    );
  }

  renderMetricModal() {
    var st = this.state;
    return (
      <MetricModal
        modalInfo={st.modalInfo}
        showMetricModal={st.showMetricModal}
        key={st.showMetricModal}
        closeModal={this.closeModal.bind(this)}
      />
    );
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="coursesContainer">
        <div className="quizzlyContent">
          {this.renderCourse()}
          {this.renderCourses()}
          <div
            className="addEntityButton"
            onClick={this.showCourseModal.bind(this)}
          >
            +
          </div>
        </div>
        {st.showModal ? this.renderModal() : null}
        {st.showMetricModal ? this.renderMetricModal() : null}
      </div>
    )
  }
}
