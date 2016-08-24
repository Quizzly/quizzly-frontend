import s from 'ProfileModal/ProfileModal.scss'
import Modal from 'Modal/Modal.js'
import Utility from 'modules/Utility.js'
import Api from 'modules/Api.js'

export default class ProfileModal extends React.Component {
  static propTypes = {
    dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    };
  }

  componentDidMount() {
  }

  handleChange(i, event) {
    var user = this.state.user;
    user[i] = event.target.value;

    this.setState({user: user});
  }

  updateUser() {
    var user = this.state.user;
    var newUser = {email: user.email, firstName: user.firstName, lastName: user.lastName};
    var route = "/update/" + user.id;
    switch (user.type) {
      case 'STUDENT':
        newUser.studentId = user.studentId;
        route = '/student' + route;
        break;
      case 'PROFESSOR':
        newUser.facultyId = user.facultyId;
        route = '/professor' + route;
        break;
    }

    Api.db.post(route, newUser)
    .then((user) => {
      console.log("updated user: ", user);
      this.setState({user: user});
      this.props.updateUser(user);
      this.props.closeModal();
    });
  }

  renderUserIdInput() {
    var st = this.state;
    switch (st.user.type) {
      case 'STUDENT':
        return <input
          type="text"
          value={st.user.studentId ? st.user.studentId : "No ID"}
          placeholder="ID"
          onChange={this.handleChange.bind(this, 'studentId')}
          className="show normalInput mb20"
        />;
      case 'PROFESSOR':
      return <input
        type="text"
        value={st.user.facultyId ? st.user.studentId : "No ID"}
        placeholder="ID"
        onChange={this.handleChange.bind(this, 'facultyId')}
        className="show normalInput mb20"
      />;
    }
  }

  renderBody() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="profileModalBody">
        <input
          type="text"
          value={st.user.firstName}
          placeholder="First name"
          onChange={this.handleChange.bind(this, 'firstName')}
          className="show normalInput mb20"
        />
        <input
          type="text"
          value={st.user.lastName}
          placeholder="Last name"
          onChange={this.handleChange.bind(this, 'lastName')}
          className="show normalInput mb20"
        />
        <input
          type="text"
          value={st.user.email}
          placeholder="Email"
          onChange={this.handleChange.bind(this, 'email')}
          className="show normalInput mb20"
        />
        {this.renderUserIdInput()}
        <button className="centerBlock round" onClick={this.updateUser.bind(this)}>UPDATE INFO</button>
      </div>
    );

  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="profileModalContainer">
        <Modal
          title="Profile Information"
          body={this.renderBody()}
          closeModal={pr.closeModal.bind(this)}
        />
      </div>
    )
  }
}
