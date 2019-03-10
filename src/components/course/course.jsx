const PropTypes = require('prop-types');
const React = require('react');
const Tabs = require('antd/lib/tabs').default;
const TabPane = Tabs.TabPane;

const CourseList = require('./course-list.jsx');

require('antd/lib/tabs/style/index.css');

require('./course.scss');

const Course = props => (
    <div className="course">
       <Tabs tabPosition="left" size="large" onTabClick={props.onTabClick}>
          {props.course && props.course.map(item => {
              return <TabPane tab={item.title} key={item.id}>
                    <CourseList 
                        listkey="children"
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
                        />
              </TabPane>
          })

          }
        </Tabs>
    </div>
);

Course.propTypes = {
    children: PropTypes.node,
};

module.exports = Course;
