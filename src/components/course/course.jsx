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
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const tags = ['Unremovable', 'Tag 2', 'Tag 3'];
const Course = props => (
    <div className="course">
       <Tabs tabPosition="left">
          <TabPane tab="Tab 1" key="1">
            <Collapse accordion onChange={props.onChangeCouser}>
                <Panel header="This is panel header 1" key="1">
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
                        
                        <a href={"/projects/editor/?courseid=1"}><Icon type="plus" /></a>
                        
                    </Tag>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3">
                <p>{text}</p>
                </Panel>
            </Collapse>
          </TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of Tab 3</TabPane>
        </Tabs>
    </div>
);

Course.propTypes = {
    children: PropTypes.node,
};

module.exports = Course;
