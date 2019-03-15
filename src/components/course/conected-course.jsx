const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const Course = require('./course.jsx');
const Classroom = require('./classroom.jsx');
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
            'handlerProject',
            'queryProject',
            'getStuProjects'
        ]);
    }
    // 查询项目
    queryProject(cid, query) {
    }
    // 查询学生项目
    getStuProjects(classid, courseid, query) {
        this.props.setClassroomAndCourse({classid, courseid}, () => {
            this.props.getStuProjects(query);
            this.props.setDrawer(true);
        });
    }
    // 项目更新 is_complete is_published
    handlerProject(data, id) {
        if (data.hasOwnProperty('is_complete')) {
            this.props.updateProjectRaw(id, data);
        }
        else {
            this.props.updateProject(id, data);
        }
        
    }
    // 一级课程点击
    handleTabs(e) {
        
        let id = e;
        if (this.props.isEduadmin)
            id = -1; 
        if (selectedCourse[e]) {
            this.props.setClassroomAndCourse({classid: id, courseid: selectedCourse[e]});
        } else {
            this.props.setClassroomAndCourse({classid: id, courseid: -1});
        }
    }
    // 开始学习 创建模板
    handleCreate (id, pid, istemplete) {
        this.props.setClassroomAndCourse({classid: pid, courseid: id}, () => {
            if (istemplete) {
                this.props.createProject(pid, id);
            } else {
                window.location.href = '/projects/editor/';
            }
        });
    }
    confirm(id) {
        if (id) {
            this.props.delProject(id);
        }
    }
      
    cancel(e) {
    }
    componentDidMount() {
        if (this.props.isEduadmin) {
            this.props.getCouser();
        } else {
            this.props.getClassroom();
        }
        
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isEduadmin !== nextProps.isEduadmin && nextProps.isEduadmin ) {
            this.props.getCouser();
        }
    }
   
    render () {
        let {course, error, status, projects, stuProjects, drawerVisible, courseId, classroom, changeCouser, isEduadmin, isTeacher} = this.props;
        return <React.Fragment>
                {isEduadmin ? 
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
                    isEduadmin={isEduadmin}
                    isTeacher={isTeacher}
                    updateProject={this.handlerProject}
                    queryProject={this.queryProject}
                    key="course"
                />
                : <Classroom
                confirm={this.confirm}
                cancel={this.cancel}
                classroom={classroom}
                error={error}
                status={status}
                projects={projects}
                stuProjects={stuProjects}
                onChangeCouser={changeCouser}
                onCreate={this.handleCreate}
                onTabClick={this.handleTabs}
                isEduadmin={isEduadmin}
                isTeacher={isTeacher}
                updateProject={this.handlerProject}
                queryProject={this.queryProject}
                getStuProjects={this.getStuProjects}
                drawerVisible={drawerVisible}
                setDrawer={this.props.setDrawer}
                key="classroom"
            />
                }
        </React.Fragment> 
        
    }
}


ConnectedCourse.propTypes = {
    error: PropTypes.string,
};
ConnectedCourse.defaultProps = {
    course: [],
    projects: [],
    classroom: []
};
const mapStateToProps = state => ({
    error: state.course.courseError,
    status: state.course.status,
    course: state.course.courseInfo,
    classroom: state.course.classroom,
    courseId: state.course.id, // current courseid
    projects: state.course.projects,
    stuProjects: state.course.stuProjects,
    user: state.session.session.user,
    isEduadmin: state.permissions.eduadmin,
    isTeacher: state.course.teacher,
    drawerVisible: state.course.drawer,
});

const mapDispatchToProps = dispatch => ({
    // 二级课程change事件
    changeCouser (id, pid) {
        selectedCourse[pid] = id;
        if (id)
            dispatch(courseActions.setClassroomAndCourse({classid: pid, courseid: id}, () => {
                dispatch(courseActions.getProjects({classroomid: pid, cid: id}));
            }));
        
    },
    getCouser() {
        dispatch(courseActions.getCouserInfo());
    },
    getClassroom() {
        dispatch(courseActions.getClassroom());
    },
    delProject(id) {
        dispatch(courseActions.delProject(id));
    },
    createProject(classroom_id, course_id, win) {
        dispatch(courseActions.createProject(classroom_id, course_id, win));
    },
    updateProject(id, value) {
        dispatch(courseActions.updateProject(id, value));
    },
    updateProjectRaw(id, value) {
        dispatch(courseActions.updateProjectRaw(id, value));
    },
    setDrawer(visible) {
        dispatch(courseActions.setDrawer(visible));
    },
    getProjects(query) {
        dispatch(courseActions.getProjects(query));
    },
    setClassroomAndCourse(data, callback) {
        dispatch(courseActions.setClassroomAndCourse(data, callback));
    },
    getStuProjects(query) {
        dispatch(courseActions.getStuProjects(query));
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCourse);
