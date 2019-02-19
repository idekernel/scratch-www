const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const Course = require('./course.jsx');
const courseActions = require('../../redux/course.js');

const message = require('antd/lib/message').default;
require('antd/lib/message/style/index.css');

let projectId;
class ConnectedCourse extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'confirm',
            'cancel',
            'handleClick',
            'handleCreate'
        ]);
    }
    handleClick (e) {
        projectId = e.currentTarget.getAttribute('data-id');
    }
    handleCreate (e) {
        message.loading('正在准备课件');
        this.props.createProject((data) => {
            if (data.status && data.status === 'ok') {
                message.destroy();
                window.location = `/projects/${data['content-name']}/editor/`;
            }
            else {
                message.error('程序出错');
            }
        });
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
        let {course, error, status, projects, courseId , changeCouser, isAdamin} = this.props;
        
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
                onCreate={this.handleCreate}
                isAdamin={isAdamin}
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
    isAdamin: state.permissions.admin
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
    },
    createProject(callback) {
        courseActions.createProject(callback);
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCourse);
