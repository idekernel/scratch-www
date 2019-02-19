const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const Course = require('./course.jsx');
const courseActions = require('../../redux/course.js');

let projectId;
class ConnectedCourse extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'confirm',
            'cancel',
            'handleClick'
        ]);
    }
    handleClick (e) {
        projectId = e.currentTarget.getAttribute('data-id');
    }
    confirm(e) {
        if (projectId) {
            this.props.delProject(projectId);
        }
    }
      
    cancel(e) {
    }
    componentDidMount() {
        this.props.getCouser();
    }
    render () {
        let {course, error, status, projects, courseId , changeCouser} = this.props;
        
        return (
            <Course
                confirm={this.confirm}
                cancel={this.cancel}
                course={course}
                error={error}
                status={status}
                projects={projects}
                onChangeCouser={changeCouser}
                handleClick={this.handleClick}
                key="course"
            />
        );
    }
}


ConnectedCourse.propTypes = {
    error: PropTypes.string,
};
ConnectedCourse.defaultProps = {
    course: [],
    projects: []
};
const mapStateToProps = state => ({
    error: state.course.courseError,
    status: state.course.status,
    course: state.course.courseInfo,
    courseId: state.course.id, // current courseid
    projects: state.course.projects,
    user: state.session.session.user,
});

const mapDispatchToProps = dispatch => ({
    changeCouser (id) {
        dispatch(courseActions.setUserCourseId(id));
    },
    getCouser() {
        dispatch(courseActions.getCouserInfo());
    },
    delProject(id) {
        dispatch(courseActions.delProject(id));
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCourse);
