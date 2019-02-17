const PropTypes = require('prop-types');
const React = require('react');
const Tabs = require('antd/lib/tabs').default;
const TabPane = Tabs.TabPane;
const Collapse = require('antd/lib/collapse').default;
const Panel = Collapse.Panel;
const Icon =  require('antd/lib/icon').default;
const Button = require('antd/lib/button').default;

const Card = require('antd/lib/card').default;
const { Meta } = Card;
const Popconfirm = require('antd/lib/popconfirm').default;


require('antd/lib/tabs/style/index.css');
require('antd/lib/collapse/style/index.css');
require('antd/lib/icon/style/index.css');
require('antd/lib/card/style/index.css');
require('antd/lib/button/style/index.css');
require('antd/lib/popconfirm/style/css');

require('./course.scss');

const Course = props => (
    <div className="course">
       <Tabs tabPosition="left">
          
          {props.course && props.course.map(item => {
              return <TabPane tab={item.title} key={item.id}>
                    <Collapse accordion onChange={props.onChangeCouser}>
                        {item.child.map(citem => {
                            return <Panel header={citem.title} key={citem.id}>
                                {props.projects && props.projects.map(pitem => {
                                    return <Card style={{ width: 220 }} size="small"
                                            key={pitem.id }
                                            cover={<img alt="example" src={pitem.image} />}
                                            actions={[<Popconfirm  title="Are you sure delete this task?" onConfirm={props.confirm} onCancel={props.cancel} okText="Yes" cancelText="No"><Icon type="delete" data-id={pitem.id} onClick={props.handleClick} /></Popconfirm>, <a href={`/projects/${pitem.id}/editor/`}><Icon type="edit" /></a>, <a href={`/projects/${pitem.id}`}><Icon type="ellipsis" /></a>]}
                                        >
                                            <Meta
                                            title={pitem.title}
                                            description={pitem.description}
                                            />
                                        </Card>;
                                })
                                }
                                <Button href={`/projects/editor/`} type="primary" icon="plus">创建</Button>
                                    
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
