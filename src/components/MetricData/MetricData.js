import s from 'MetricData/MetricData.scss'
import MetricSectionStudentQuiz from 'MetricSectionStudentQuiz/MetricSectionStudentQuiz.js'
import MetricSectionQuiz from 'MetricSectionQuiz/MetricSectionQuiz.js'
import MetricSectionStudent from 'MetricSectionStudent/MetricSectionStudent.js'

import MetricQuiz from 'MetricQuiz/MetricQuiz.js' //Import child class

export default class MetricData extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);

    // this.state = {
    //   section : props.section,
    //   student : props.student,
    //   quiz : props.quiz,
    //   question : props.question
    // }
  }

  componentDidMount() {

  }

  // componentWillReceiveProps(nextProps){
  //   this.setState({
  //     section : nextProps.section,
  //     student : nextProps.student,
  //     quiz : nextProps.quiz,
  //     question: nextProps.question
  //   })
  // }
  renderChart() {
    var pr = this.props;
    console.log("MetricData: renderChart");
    console.log("Section is " + pr.section);
    console.log("Student is " + pr.student);
    console.log("Quiz is " + pr.quiz);
    console.log("Question is " + pr.question);
    //Specific section, student, and quiz
    if(pr.section != -1 && pr.student != -1 && pr.quiz != -1 && pr.question == -1){
      return (
        <MetricSectionStudentQuiz
          section={pr.section}
          student={pr.student}
          quiz={pr.quiz}
        />
      )
    }
    //Specific section and quiz
    else if(pr.section != -1 && pr.student == -1 && pr.quiz != -1 && pr.question == -1){
      return (
        <MetricSectionQuiz
          section={pr.section}
          quiz={pr.quiz}
        />
      )
    }
    //Specific section and student
    else if(pr.section != -1 && pr.student != -1 && pr.quiz == -1 && pr.question == -1){
      return (
        <MetricSectionStudent
          section={pr.section}
          student={pr.student}
        />
      )
    }

    //Specific quiz selection only
    else if(pr.section == -1 && pr.student == -1 && pr.quiz != -1 && pr.question == -1)
    {
      return(
        <MetricQuiz
          quiz={pr.quiz}
          />
      )
    }

    //No selection
    else if(pr.section == -1  && pr.student == -1 && pr.quiz == -1 && pr.question == -1){
      return (
        <MetricSection
          course={pr.course}
        />
      )
    }

  }
  render() { //You're returning the thing to be displayed on screen?
    var st = this.state;
    var pr = this.props;
    return (
      <div>
      {this.renderChart()}
      </div>
    )
  }
}
