const PropTypes = require('prop-types');
const React = require('react');
const Drawer = require('antd/lib/drawer').default;
const Tabs = require('antd/lib/tabs').default;
const TabPane = Tabs.TabPane;
const CourseList = require('./course-list.jsx');

require('antd/lib/tabs/style/index.css');
require('antd/lib/drawer/style/index.css');

require('./course.scss');

const Classroom = props => (
    <div className="course">
       <Tabs tabPosition="left" onTabClick={props.onTabClick}>
          
          {props.classroom && props.classroom.map(item => {
              return <TabPane tab={item.title} key={item.id}>
                    <CourseList 
                        listkey="courses"
                        confirm={props.confirm}
                        cancel={props.cancel}
                        item={item}
                        error={props.error}
                        status={props.status}
                        projects={props.projects}
                        onChangeCouser={props.onChangeCouser}
                        onCreate={props.onCreate}
                        onTabClick={props.onTabClick}
                        isEduadmin={props.isEduadmin}
                        isTeacher={props.isTeacher}
                        updateProject={props.updateProject}
                        queryProject={props.queryProject}
                        getStuProjects={props.getStuProjects}
                        />
              </TabPane>
          })

          }
        </Tabs>
        <Drawer
            title="学生作品"
            placement="right"
            closable={false}
            onClose={e=>props.setDrawer(false)}
            visible={props.drawerVisible}
        >
        {
            props.stuProjects && props.stuProjects.map(item => {
                return <a key={item.id} className="plink" target="_blank" href={`/projects/${item.id}`}>{item.title + ' by ' + item.user.username}</a>
            })
        }
        </Drawer>
    </div>
);

Classroom.propTypes = {
    children: PropTypes.node,
};

module.exports = Classroom;
