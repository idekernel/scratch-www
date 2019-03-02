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
            'queryProject'
        ]);
    }
    // 查询项目
    queryProject(cid, query) {
        this.props.setCouser(cid, true, query);
    }
    // 项目更新 is_complete
    handlerProject(value, id) {
        const data = {is_complete: value};
        this.props.updateProjectRaw(id, data);
    }
    // 一级课程点击
    handleTabs(e) {
        
        let id = e;
        if (this.props.isEduadmin)
            id = -1; 
        if (selectedCourse[e]) {
            this.props.setClassroom(id, selectedCourse[e]);
        } else {
            this.props.setClassroom(id, -1);
        }
    }
    // 开始学习 创建模板
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
        let {course, error, status, projects, courseId, classroom, changeCouser, isEduadmin, isTeacher} = this.props;
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
                onChangeCouser={changeCouser}
                onCreate={this.handleCreate}
                onTabClick={this.handleTabs}
                isEduadmin={isEduadmin}
                isTeacher={isTeacher}
                updateProject={this.handlerProject}
                queryProject={this.queryProject}
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
    user: state.session.session.user,
    isEduadmin: state.permissions.eduadmin,
    isTeacher: state.course.teacher,
});

const mapDispatchToProps = dispatch => ({
    setClassroom(classid, id, query) {
        dispatch(courseActions.setUserClassroomId(classid, id, query));
    },
    setCouser(id, showprojectlist, query) {
       dispatch(courseActions.setUserCourseId(id, showprojectlist, query));
    },
    // 二级课程change事件
    changeCouser (id, pid) {
        selectedCourse[pid] = id;
        dispatch(courseActions.setUserCourseId(id));
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
    createProject() {
        dispatch(courseActions.createProject());
    },
    updateProject(id, value) {
        dispatch(courseActions.updateProject(id, value));
    },
    updateProjectRaw(id, value) {
        dispatch(courseActions.updateProjectRaw(id, value));
    }
    
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCourse);
