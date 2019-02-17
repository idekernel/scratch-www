const PropTypes = require('prop-types');
const React = require('react');
const Tabs = require('antd/lib/tabs').default;
const TabPane = Tabs.TabPane;
const Collapse = require('antd/lib/collapse').default;
const Panel = Collapse.Panel;
const Tag = require('antd/lib/tag').default;
const Icon =  require('antd/lib/icon').default;
const Tooltip =  require('antd/lib/tooltip').default;

require('antd/lib/tabs/style/index.css');
require('antd/lib/collapse/style/index.css');
require('antd/lib/tag/style/index.css');
require('antd/lib/icon/style/index.css');
require('antd/lib/tooltip/style/index.css');
const tags = ['Unremovable', 'Tag 2', 'Tag 3'];
const Course = props => (
    <div className="course">
       <Tabs tabPosition="left">
          
          {props.course && props.course.map(item => {
              return <TabPane tab={item.title} key={item.id}>
                    <Collapse accordion onChange={props.onChangeCouser}>
                        {item.child.map(citem => {
                            return <Panel header={citem.title} key={citem.id}>
                                {tags.map((tag, index) => {
                                const isLongTag = tag.length > 5;
                                const tagElem = (
                                    <Tag key={tag} closable={index !== 0}>
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </Tag>
                                );
                                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                })}
                                <Tag>
                                    
                                    <a href={"/projects/editor/"}><Icon type="plus" /></a>
                                    
                                </Tag>
                            </Panel>;
                        })}
                    </Collapse>
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
