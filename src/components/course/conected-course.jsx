const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const Course = require('./course.jsx');
const courseActions = require('../../redux/course.js');

// const message = require('antd/lib/message').default;
// require('antd/lib/message/style/index.css');
let selectedCourse = {};
class ConnectedCourse extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'confirm',
            'cancel',
            'handleCreate',
            'handleTabs',
            'handlerProject'
        ]);
    }
    handlerProject(value, id) {
        const data = {is_complete: value};
        this.props.updateProject(id, data);
    }
    handleTabs(e) {
        if (selectedCourse[e]) {
            this.props.setCouser(selectedCourse[e]);
        }
    }
    handleCreate (id, istemplete) {
        this.props.setCouser(id, false);
        if (istemplete) {
            this.props.createProject();
        } else {
            window.location.href = '/projects/editor/';
        }
        
        // message.loading('正在准备课件');
        // this.props.createProject((data) => {
        //     if (data.status && data.status === 'ok') {
        //         message.destroy();
        //         window.location = `/projects/${data['content-name']}/editor/`;
        //     }
        //     else {
        //         message.error('程序出错');
        //     }
        // });
    }
    confirm(id) {
        if (id) {
            this.props.delProject(id);
        }
    }
      
    cancel(e) {
    }
    componentDidMount() {
        this.props.getCouser();
    }
    render () {
        let {course, error, status, projects, courseId , changeCouser, isAdmin, isTeacher} = this.props;
        
        return (
            <Course
                confirm={this.confirm}
                cancel={this.cancel}
                course={course}
                error={error}
                status={status}
                projects={projects}
                onChangeCouser={changeCouser}
                onCreate={this.handleCreate}
                onTabClick={this.handleTabs}
                isAdmin={isAdmin}
                isTeacher={isTeacher}
                updateProject={this.handlerProject}
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
    isAdmin: state.permissions.admin,
    isTeacher: state.permissions.teacher,
});

const mapDispatchToProps = dispatch => ({
    setCouser(id, projectlist) {
       dispatch(courseActions.setUserCourseId(id, projectlist));
    },
    changeCouser (id, pid) {
        selectedCourse[pid] = id;
        dispatch(courseActions.setUserCourseId(id));
    },
    getCouser() {
        dispatch(courseActions.getCouserInfo());
    },
    delProject(id) {
        dispatch(courseActions.delProject(id));
    },
    createProject() {
        dispatch(courseActions.createProject());
    },
    updateProject(id, value) {
        dispatch(courseActions.updateProject(id, value));
    }
    
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCourse);
