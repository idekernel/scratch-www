const PropTypes = require('prop-types');
const React = require('react');
const Tooltip = require('antd/lib/tooltip').default;
const Collapse = require('antd/lib/collapse').default;
const Panel = Collapse.Panel;
const Icon =  require('antd/lib/icon').default;
const Button = require('antd/lib/button').default;
const Switch = require('antd/lib/switch').default;

const Card = require('antd/lib/card').default;
const { Meta } = Card;
const Popconfirm = require('antd/lib/popconfirm').default;


require('antd/lib/tooltip/style/index.css');
require('antd/lib/collapse/style/index.css');
require('antd/lib/icon/style/index.css');
require('antd/lib/card/style/index.css');
require('antd/lib/button/style/index.css');
require('antd/lib/popover/style/index.css');
require('antd/lib/switch/style/index.css');

require('./course.scss');

const CourseList = props => (
   
    <Collapse accordion bordered={false} onChange={e=>props.onChangeCouser(e, props.item.id)}>
            {props.item[props.listkey].map(citem => {
                return <Panel header={citem.title} key={citem.id}>
                    {props.projects && props.projects.map(pitem => {
                        return <Card style={{ width: 220 }} size="small"
                                key={pitem.id }
                                cover={<img alt="example" src={pitem.image + '?t=' + new Date().getTime()} />}
                                actions={[
                                    <Tooltip placement="topLeft" title="继续创作" arrowPointAtCenter><a href={`/projects/${pitem.id}/editor/`} target="_blank"><Icon type="code" /></a></Tooltip>,
                                    <Tooltip placement="topLeft" title="添加说明" arrowPointAtCenter><a href={`/projects/${pitem.id}`} target="_blank"><Icon type="edit" /></a></Tooltip>,
                                    <Popconfirm  title="确定要删除作品吗?" onConfirm={e => props.confirm(pitem.id)} onCancel={props.cancel} okText="确定" cancelText="取消"><Tooltip placement="topLeft" title="删除作品" arrowPointAtCenter><Icon type="delete"/></Tooltip></Popconfirm>,
                                ]}
                            >
                                <Meta
                                title={pitem.title}
                                />
                                { !props.isTeacher && <span>提交作业<Switch size="small" onChange={e=>props.updateProject({is_complete: e}, pitem.id)} defaultChecked={pitem.project_raw.is_complete} /></span>}
                                { !props.isEduadmin && <span>&nbsp;&nbsp;&nbsp;分享<Switch size="small" onChange={e=>props.updateProject({is_published: e}, pitem.id)} defaultChecked={pitem.project_raw.is_published} /></span>}
                                
                            </Card>;
                    })
                    }
                    {props.isEduadmin ?
                        <Button onClick={e => props.onCreate(citem.id, props.item.id, false)} type="primary" icon="plus">创建模板</Button>
                        :
                            <Button key="createbtn" type="primary" icon="plus" onClick={e => props.onCreate(citem.id, props.item.id, true)}>开始学习</Button>
                            
                    }
                    {
                        props.isTeacher && <Button key="pinggai" type="primary" icon="plus" onClick={e => props.getStuProjects(citem.id)}>评改</Button>
                    }
                    
                    
                        
                </Panel>;
            })}
        </Collapse>
);

CourseList.propTypes = {
    children: PropTypes.node,
    key: PropTypes.string
};

module.exports = CourseList;
