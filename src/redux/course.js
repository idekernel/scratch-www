// course classroom
const keyMirror = require('keymirror');
const defaults = require('lodash.defaults');

const api = require('../lib/api');
const log = require('../lib/log.js');
const querystring = require("querystring");
const Types = keyMirror({
    SET_COURSE_ERROR: null,
    SET_COURSE_STATUS: null,
    SET_COURSE_INFO: null,
    SET_CLASSROOM: null,
    SET_COURSE_ID: null,
    SET_CLASSROOM_ID: null,
    SET_COURSE_PROJECTS: null,
    SET_CLASSROOM_ROLE: null,
    SET_STU_PROJECTS: null,
    SET_DRAWER: null,
});

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

module.exports.getInitialState = () => ({
    drawer: false,
    courseError: null,
    courseInfo: [],
    classroom: [],
    teacher: false, //班级身份
    id: -1, //单课id
    classid: -1, // 班级id
    projects: [],
    stuProjects: [], //学生作品
    status: {
        project: module.exports.Status.NOT_FETCHED,
        course:  module.exports.Status.NOT_FETCHED,
        createProject: module.exports.Status.NOT_FETCHED,
        classroom:  module.exports.Status.NOT_FETCHED,
    },
});


module.exports.courseReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_COURSE_ERROR:
        return defaults({courseError: action.courseError}, state);
    case Types.SET_COURSE_STATUS:
        return defaults({status: action.status}, state);
    case Types.SET_COURSE_INFO:
        return defaults({courseInfo: action.info || {} }, state);
    case Types.SET_CLASSROOM:
        let classroom = action.info;
        if (classroom && classroom.length >= 0) {
            classroom.map(cr => {
                let p_course;
                let c_course;
                let n_course = [];
                p_course = cr.courses.filter(item => item.pid === 0).sort((a, b) => {
                    return a.order - b.order;
                });
                c_course = cr.courses.filter(item => item.pid > 0).sort((a, b) => {
                    return a.order - b.order;
                });
                p_course.map(p_c => {
                    c_course.map(c_c => {
                        if (c_c.pid === p_c.id) {
                            n_course.push({...c_c, title: p_c.title + '-' +c_c.title});
                        }
                    })
                });
                cr.courses = n_course;
            });
        }
        return defaults({ classroom }, state);
    case Types.SET_COURSE_ID:
        return defaults({id: action.id || '' }, state);
    case Types.SET_CLASSROOM_ID:
        return defaults({classid: action.id || '' }, state);
    case Types.SET_CLASSROOM_ROLE:
        const classid = parseInt(action.classid);
        const courseid = parseInt(action.courseid);
        const userid = parseInt(action.userid);
        let isTeacher = false;
        if (courseid >= 0) {
            if (userid >= 0) {
                const classroom = state.classroom && state.classroom.filter(item => item.id === classid)[0];
                const classroom_user = classroom && classroom.users.filter(item => item.id === userid)[0];
                isTeacher = classroom_user && classroom_user.classroom_user.identity === 'tch';
            }
        }
       
        return defaults({teacher: isTeacher}, state);
    case Types.SET_COURSE_PROJECTS:
        return defaults({projects: action.projects}, state);
    case Types.SET_STU_PROJECTS:
        return defaults({stuProjects: action.projects}, state);
        case Types.SET_DRAWER:
        return defaults({drawer: action.visible}, state);
    default:
        return state;
    }
};


module.exports.setDrawer = visible => ({
    type: Types.SET_DRAWER,
    visible
});

module.exports.setCourseError = courseError => ({
    type: Types.SET_COURSE_ERROR,
    courseError
});

module.exports.setStatus = (type, status) => ({
    type: Types.SET_COURSE_STATUS,
    infoType: type,
    status: status
});
module.exports.setCourseInfo = info => ({
    type: 'SET_COURSE_INFO',
    info: info
});
module.exports.setClassroom = info => ({
    type: 'SET_CLASSROOM',
    info: info
});
module.exports.setClassroomRole = (classid, courseid, userid) => ({
    type: 'SET_CLASSROOM_ROLE',
    classid,
    courseid,
    userid
});
module.exports.setCourseId = id => ({
    type: 'SET_COURSE_ID',
    id
});
module.exports.setClassroomId = id => ({
    type: 'SET_CLASSROOM_ID',
    id
});
module.exports.setProjects = projects => ({
    type: 'SET_COURSE_PROJECTS',
    projects
});
module.exports.setStuProjects = projects => ({
    type: 'SET_STU_PROJECTS',
    projects
});

module.exports.setUserCourseId = (courseid, showprojectlist = true, query = {}, fetchstu = false) => ((dispatch, state) => {
    const user = state().session.session.user;
    const classid = state().course.classid;
    if (user && user.id && courseid) {
        if (showprojectlist)
            dispatch(module.exports.getProjects({classroomid: classid, cid: courseid, ...query}));
        if (fetchstu)
            dispatch(module.exports.getStuProjects({classroomid: classid, cid: courseid, ...query}));
        const formData = {sel_course: parseInt(courseid)};
        const opts = {
            host: '', // for test origin ''
            uri: `/api/user/` + user.id,
            method: 'put',
            json: formData,
            useCsrf: true
        };
        // if (token) {
        //     Object.assign(opts, {authentication: token});
        // }
        dispatch(module.exports.setStatus('course', module.exports.Status.FETCHING));
        api(opts, (err, body, response) => {
            if (err) {
                dispatch(module.exports.setStatus('course', module.exports.Status.ERROR));
                dispatch(module.exports.setCourseError(err));
                return;
            }
            if (typeof body === 'undefined' || response.statusCode === 404) {
                dispatch(module.exports.setStatus('course', module.exports.Status.ERROR));
                dispatch(module.exports.setCourseError('No course info'));
                dispatch(module.exports.setCourseId(-1));
                return;
            }
            dispatch(module.exports.setStatus('course', module.exports.Status.FETCHED));
            dispatch(module.exports.setCourseId(courseid));
            dispatch(module.exports.setClassroomRole(classid, courseid, user.id));
        });
    }
    
});

module.exports.setUserClassroomId = (classid, courseid, query = {}) => ((dispatch, state) => {
    const user = state().session.session.user;
    if (user && user.id) {
        
        const formData = {sel_classroom: parseInt(classid)};
        const opts = {
            host: '', // for test origin ''
            uri: `/api/user/` + user.id,
            method: 'put',
            json: formData,
            useCsrf: true
        };
        // if (token) {
        //     Object.assign(opts, {authentication: token});
        // }
        dispatch(module.exports.setStatus('course', module.exports.Status.FETCHING));
        api(opts, (err, body, response) => {
            if (courseid >= 0)
                dispatch(module.exports.getProjects({classroomid: classid, cid: courseid, ...query}));
            if (err) {
                dispatch(module.exports.setStatus('course', module.exports.Status.ERROR));
                dispatch(module.exports.setCourseError(err));
                return;
            }
            if (typeof body === 'undefined' || response.statusCode === 404) {
                dispatch(module.exports.setStatus('course', module.exports.Status.ERROR));
                dispatch(module.exports.setCourseError('No course info'));
                dispatch(module.exports.setClassroomId(-1));
                return;
            }
            dispatch(module.exports.setStatus('course', module.exports.Status.FETCHED));
            dispatch(module.exports.setClassroomId(classid));
            dispatch(module.exports.setClassroomRole(classid, courseid, user.id));    
        });
    }
    
});

module.exports.getStuProjects = (query, token) => ((dispatch, state) => {
    // query.t = new Date().getTime();
    const querystr = querystring.stringify(query);
    const opts = {
        host: '', // for test origin ''
        uri: `/api/projects/?fetchstu=true&${querystr}` 
    };
    if (token) {
        Object.assign(opts, {authentication: token});
    }
    dispatch(module.exports.setStatus('project', module.exports.Status.FETCHING));
    api(opts, (err, body, response) => {
        if (err) {
            dispatch(module.exports.setStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError(err));
            return;
        }
        if (typeof body === 'undefined' || response.statusCode === 404) {
            dispatch(module.exports.setStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError('No course info'));
            dispatch(module.exports.setStuProjects([]));
            return;
        }
        dispatch(module.exports.setStatus('project', module.exports.Status.FETCHED));
        dispatch(module.exports.setStuProjects(body.rows));

    });
});

module.exports.getProjects = (query, token) => ((dispatch, state) => {
    // query.t = new Date().getTime();
    const querystr = querystring.stringify(query);
    const opts = {
        host: '', // for test origin ''
        uri: `/api/projects/?${querystr}` 
    };
    if (token) {
        Object.assign(opts, {authentication: token});
    }
    dispatch(module.exports.setStatus('project', module.exports.Status.FETCHING));
    api(opts, (err, body, response) => {
        if (err) {
            dispatch(module.exports.setStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError(err));
            return;
        }
        if (typeof body === 'undefined' || response.statusCode === 404) {
            dispatch(module.exports.setStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError('No course info'));
            dispatch(module.exports.setProjects([]));
            return;
        }
        dispatch(module.exports.setStatus('project', module.exports.Status.FETCHED));
        dispatch(module.exports.setProjects(body.rows));

    });
});

module.exports.updateProject = (id, formData, token) => ((dispatch, state) => {
    const opts = {
        host: '', // for test origin ''
        uri: `/api/projects/${id}`,
        method: 'put',
        json: formData,
    };
    if (token) {
        Object.assign(opts, {authentication: token});
    }
    dispatch(module.exports.setStatus('project', module.exports.Status.FETCHING));
    api(opts, (err, body, response) => {
        if (err) {
            dispatch(module.exports.setStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError(err));
            return;
        }
        if (typeof body === 'undefined' || response.statusCode === 404) {
            dispatch(module.exports.setStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError('No course info'));
            return;
        }
        dispatch(module.exports.setStatus('project', module.exports.Status.FETCHED));
    });
});

module.exports.updateProjectRaw = (id, formData, token) => ((dispatch, state) => {
    const opts = {
        host: '', // for test origin ''
        uri: `/api/projectraw/${id}`,
        method: 'put',
        json: formData,
    };
    if (token) {
        Object.assign(opts, {authentication: token});
    }
    dispatch(module.exports.setStatus('project', module.exports.Status.FETCHING));
    api(opts, (err, body, response) => {
        if (err) {
            dispatch(module.exports.setStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError(err));
            return;
        }
        if (typeof body === 'undefined' || response.statusCode === 404) {
            dispatch(module.exports.setStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError('No course info'));
            return;
        }
        dispatch(module.exports.setStatus('project', module.exports.Status.FETCHED));
    });
});

module.exports.delProject = (id, token) => ((dispatch, state) => {
    const opts = {
        host: '', // for test origin ''
        uri: `/api/projects/${id}`,
        method: 'delete'
    };
    if (token) {
        Object.assign(opts, {authentication: token});
    }
    dispatch(module.exports.setStatus('project', module.exports.Status.FETCHING));
    api(opts, (err, body, response) => {
        if (err) {
            dispatch(module.exports.setStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError(err));
            return;
        }
        if (typeof body === 'undefined' || response.statusCode === 404) {
            dispatch(module.exports.setStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError('No course info'));
            // dispatch(module.exports.setProjects([]));
            return;
        }
        dispatch(module.exports.setStatus('project', module.exports.Status.FETCHED));
        dispatch(module.exports.getProjects({classroomid: state().course.classid, cid: state().course.id}));
    });
});

// module.exports.createProject = (callback) => {
//     const opts = {
//         host: '', // for test origin ''
//         uri: `/api/projectsrawTemplet/`,
//         method: 'post'
//     };
//     api(opts, (err, body, response) => {
//         if (err) {
//             callback && callback(err);
//             return;
//         }
//         if (typeof body === 'undefined' || response.statusCode === 404) {
//             callback && callback({});
//             return;
//         }
//         callback && callback(body);
//     });
// }

module.exports.createProject = (token) => ((dispatch, state) => {
    const opts = {
        host: '', // for test origin ''
        uri: `/api/projectsrawTemplet/`,
        method: 'post'
    };
    if (token) {
        Object.assign(opts, {authentication: token});
    }
    dispatch(module.exports.setStatus('createProject', module.exports.Status.FETCHING));
    api(opts, (err, body, response) => {
        if (err) {
            dispatch(module.exports.setStatus('createProject', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError(err));
            return;
        }
        if (typeof body === 'undefined' || response.statusCode === 404 || body.success === false) {
            dispatch(module.exports.setStatus('createProject', module.exports.Status.FETCHED));
            window.location = `/projects/editor/`;
            return;
        }
        dispatch(module.exports.setStatus('createProject', module.exports.Status.FETCHED));
        window.location = `/projects/${body['content-name']}/editor/`;
    });
});

module.exports.getCouserInfo = (token) => ((dispatch, state) => {
    const opts = {
        host: '', // for test origin ''
        uri: `/api/course/`
    };
    if (token) {
        Object.assign(opts, {authentication: token});
    }
    dispatch(module.exports.setStatus('course', module.exports.Status.FETCHING));
    api(opts, (err, body, response) => {
        if (err) {
            dispatch(module.exports.setStatus('course', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError(err));
            return;
        }
        if (typeof body === 'undefined' || response.statusCode === 404 || body.success === false) {
            dispatch(module.exports.setStatus('course', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError('No course info'));
            dispatch(module.exports.setCourseInfo([]));
            return;
        }
        dispatch(module.exports.setStatus('course', module.exports.Status.FETCHED));
        dispatch(module.exports.setCourseInfo(body));

    });
});
module.exports.getClassroom = (token) => ((dispatch, state) => {
    const opts = {
        host: '', // for test origin ''
        uri: `/api/classroom/`
    };
    if (token) {
        Object.assign(opts, {authentication: token});
    }
    dispatch(module.exports.setStatus('classroom', module.exports.Status.FETCHING));
    api(opts, (err, body, response) => {
        if (err) {
            dispatch(module.exports.setStatus('classroom', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError(err));
            return;
        }
        if (typeof body === 'undefined' || response.statusCode === 404 || body.success === false) {
            dispatch(module.exports.setStatus('classroom', module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError('No classroom info'));
            dispatch(module.exports.setClassroom([]));
            return;
        }
        dispatch(module.exports.setStatus('classroom', module.exports.Status.FETCHED));
        dispatch(module.exports.setClassroom(body.rows));

    });
});