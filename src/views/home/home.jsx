const React = require('react');
const render = require('../../lib/render.jsx');

const Page = require('../../components/page/www/page.jsx');
const TopBanner = require('../splash/feature/top-banner.jsx');
const MediaQuery = require('react-responsive').default;
require('./home.scss');
const Home = () => (
    <div className="home">
        <MediaQuery
            key="frameless-tablet"
            minWidth={0}
        >
            <TopBanner />
            <section>
                <img src="/images/home/img1.jpg"/>
                <img src="/images/home/img2.jpg"/>
                <section className="tip" ><span><strong>为什么更多孩子喜欢XKID少儿编程？</strong></span></section>
                <section className="tip-content">
                        <img src="/images/home/head1.jpg"/>
                        <span>每个班6名孩子</span>
                        <section>
                            <strong>
                                <span>
                                    “我更喜欢跟朋友一起编程！”
                                </span>
                            </strong>
                            <strong>
                                <span>
                                    &nbsp; &nbsp; &nbsp; ——“未来创业家”石头
                                </span>
                            </strong>
                        </section>
                </section>
                <section className="tip-content">
                        <img src="/images/home/head2.jpg"/>
                        <span>每节课90分钟</span>
                        <section>
                            <strong>
                                <span>
                                “能说更多、能做更多、能快乐更多！”
                                </span>
                            </strong>
                            <strong>
                                <span>
                                    &nbsp; &nbsp; &nbsp;——“未来意见领袖”Andy
                                </span>
                            </strong>
                        </section>
                </section>
                <section className="tip-content">
                        <img src="/images/home/head3.jpg"/>
                        <span>开放式编程主题</span>
                        <section>
                            <strong>
                                <span>
                                “我的每件作品都是独一无二的！”
                                </span>
                            </strong>
                            <strong>
                                <span>
                                    &nbsp; &nbsp; &nbsp;——“未来艺术家”雪儿
                                </span>
                            </strong>
                        </section>
                </section>
                <section className="tip-content">
                        <img src="/images/home/head4.jpg"/>
                        <span>全过程独立创作</span>
                        <section>
                            <strong>
                                <span>
                                “作品还不够好，但比我上个作品好！”
                                </span>
                            </strong>
                            <strong>
                                <span>
                                    &nbsp; &nbsp; &nbsp;——“未来科学家”浩天
                                </span>
                            </strong>
                        </section>
                </section>
                <section className="tip-content">
                        <img src="/images/home/head5.jpg"/>
                        <span>三大先进教学手段</span>
                        <section>
                            <strong>
                                <span>
                                “怎么回事，数学变的好简单！”
                                </span>
                            </strong>
                            <strong>
                                <span>
                                “我入选学校编程社团啦！”
                                </span>
                            </strong>
                            <strong>
                                <span>
                                “这次得奖，老爸送我一台编程机器人！”
                                </span>
                            </strong>
                            <strong>
                                <span>
                                “……”
                                </span>
                            </strong>
                            <strong>
                                <span>
                                    &nbsp; &nbsp; &nbsp;—— 更多XKID成员
                                </span>
                            </strong>
                        </section>
                </section>

                <section className="tip sec" ><span><strong>为什么更多家长认可XKID少儿编程？</strong></span></section>
                <section className="sec-content first">
                    <section className="sec-icon">
                        <section className="first"></section>
                        <section className="sec">1
                        </section>
                        <section className="third"></section>
                    </section>
                    <p className="first">论文制学科交叉课程</p>
                    <p>串联海量STEAM知识</p>
                    <p>帮助孩子搭建系统的知识架构</p>
                    <section className="subtitle">
                        <p>孩子每节课完成一份编程学习论文</p>
                    </section>
                    <img className="img_first" src="/images/home/sec_img1.jpg"></img>

                    <section className="subtitle">
                        <p>论文内容串联1658个学科知识节点</p>
                    </section>
                    <img className="img_sec" src="/images/home/sec_img2.jpg"></img>

                    <section className="subtitle">
                        <p>课程体系覆盖4-14岁全年龄段</p>
                    </section>
                    <img className="img_third" src="/images/home/sec_img3.jpg"></img>
                </section>

                <section className="sec-content">
                    <section className="sec-icon">
                        <section className="first"></section>
                        <section className="sec">2
                        </section>
                        <section className="third"></section>
                    </section>
                    <p className="first">螺旋型思维引导教学</p>
                    <p>推动持续深度思考</p>
                    <p>帮助孩子建立科学的思维路径</p>
                    <section className="subtitle">
                        <p>孩子每节课完成一次螺旋思维训练</p>
                    </section>
                    <img className="img_4" src="/images/home/sec_img4.jpg"></img>

                    <section className="subtitle">
                        <p>思维训练过程实行全维度激励</p>
                    </section>
                    <img className="img_5" src="/images/home/sec_img5.jpg"></img>

                    <section className="subtitle">
                        <p>思维训练成果实行数据化评估</p>
                    </section>
                    <img className="img_6" src="/images/home/sec_img6.jpg"></img>
                </section>

                <section className="sec-content">
                    <section className="sec-icon">
                        <section className="first"></section>
                        <section className="sec">3
                        </section>
                        <section className="third"></section>
                    </section>
                    <p className="first">路演式表达展示训练</p>
                    <p>提升个人综合魅力</p>
                    <p>帮助孩子构建稳固和谐的人格特质</p>
                    <section className="subtitle">
                        <p>孩子每节课完成一场作品模拟路演</p>
                    </section>
                    <img className="img_7" src="/images/home/sec_img7.jpg"></img>

                    <section className="subtitle">
                        <p>“项目制课程”提供路演的真实需求与素材</p>
                    </section>
                    <img className="img_8" src="/images/home/sec_img8.jpg"></img>

                    <section className="subtitle">
                        <p>“6人制小班”确保路演的充分表达与聆听</p>
                    </section>
                    <img className="img_9" src="/images/home/sec_img9.jpg"></img>
                </section>
                <section className="sec-content">
                    <section className="sec-icon">
                        <section className="first"></section>
                        <section className="sec">4
                        </section>
                        <section className="third"></section>
                    </section>
                    <p className="first">业界顶级的教育支持团队</p>
                    <p>提供专属教育服务</p>
                    <p>帮助孩子配置最契合的教育资源</p>
                    <section className="subtitle">
                        <p>跨学科跨领域的15人课程研发团队</p>
                    </section>
                    <img className="img_10" src="/images/home/sec_img10.jpg"></img>

                    <section className="subtitle">
                        <p>懂教育更懂孩子的48人学霸教师团</p>
                    </section>
                    <img className="img_11" src="/images/home/sec_img11.jpg"></img>

                    <section className="subtitle">
                        <p>有经验更有见识的专家级学习导师</p>
                    </section>
                    <img className="img_12" src="/images/home/sec_img12.jpg"></img>
                    <section className="subtitle">
                        <p>多校联动的600平教学试验基地</p>
                    </section>
                    <section className="img_box">
                        <img className="img_13" src="/images/home/sec_img13.jpg"></img>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;XKID少儿编程拥有600余平米的教学试验基地。2018年，XKID联合北京多所小学及教育机构，顺利完成了总计五千余人次的编程推广与课程试验教学任务。</p>
                    </section>
                </section>
                <section className="tip sec" ><span><strong>怎样让你的孩子也成为XKID的一员？</strong></span></section>
                <section className="sec-content first">
                    <img className="img_14" src="/images/home/img1.jpg"></img>
                    <section className="subtitle">
                        <p className="third">基本信息</p>
                    </section>
                    <img className="img_15" src="/images/home/img_15.jpg"></img>

                    <section className="subtitle">
                        <p className="third">扫码领课</p>
                    </section>
                    <p className="first price">原价496元</p>
                    <p className="price2">限时优惠价49.6元</p>
                    <img className="img_16" src="/images/home/img_16.jpg"></img>

                    <section className="subtitle">
                        <p className="third">课程内容</p>
                    </section>
                    <img className="img_17" src="/images/home/img_17.jpg"></img>
                    <section className="subtitle">
                        <p className="third">时间安排</p>
                    </section>
                    <img className="img_18" src="/images/home/img_18.jpg"></img>
                    <section className="subtitle">
                        <p className="third">课程预约</p>
                    </section>
                    <section className="order"></section>
                    <p className="order-txt">具体上课时段请与课程顾问预约确定</p>
                    <section className="order"></section>
                    <section className="qr-cont">
                        <section className="title-bg">XKID少儿编程 课程顾问
                        </section>
                        <section className="cont">
                            <section>
                                <section>
                                    <p>长按识别二维码</p>
                                    <p>预约具体上课时段</p>
                                </section>
                                <img className="img_19" src="/images/home/img_19.jpg"></img>
                            </section>
                        </section>
                    </section>
                    
                    <section className="subtitle">
                        <p className="third">孩子成果</p>
                    </section>
                    <img className="img_20" src="/images/home/img_20.jpg"></img>
                    <img className="img_21" src="/images/home/img_21.jpg"></img>
                    <section className="subtitle">
                        <p className="third">家长反馈</p>
                    </section>
                    <img className="img_22" src="/images/home/img_22.jpg"></img>
                    <img className="img_23" src="/images/home/img_23.jpg"></img>
                    <img className="img_24" src="/images/home/img_24.jpg"></img>
                    <img className="img_25" src="/images/home/img_25.jpg"></img>
                    <section className="subtitle">
                        <p className="third">能力证书</p>
                    </section>
                    <img className="img_26" src="/images/home/img_26.jpg"></img>
                    <img className="img_27" src="/images/home/img_27.jpg"></img>
                    <section className="subtitle">
                        <p className="third">常见问题</p>
                    </section>
                    <section className="qa">
                        <section className="qa-icon"></section>
                        <p className="q">孩子几岁可以报名？</p>
                        <p>&nbsp; &nbsp; &nbsp; &nbsp;我们建议7岁及以上孩子报名。</p>
                        <p className="q">孩子是看着录好的视频学习吗？</p>
                        <p>&nbsp; &nbsp; &nbsp; &nbsp;当然不是。我们采用最先进的在线互动课堂系统进行教学，孩子需要跟老师和同学随时进行交流、讨论、协作和比拼。</p>
                        <p className="q">零基础突破营跟XKID整个学习体系是什么关系？</p>
                        <p>&nbsp; &nbsp; &nbsp; &nbsp;编程零基础突破营是XKID编程学习体系的入门课程。完成突破营的课程后，可以继续学习XKID后续的编程进阶课程。</p>
                        <p className="q">孩子能从编程零基础突破营中收获什么？</p>
                        <p>&nbsp; &nbsp; &nbsp; &nbsp; 孩子可以掌握编程基础知识，并完成2件编程作品。同时，孩子将体验到深度思考、自由创作和自信表达的乐趣。更重要的，从这一刻起，孩子将开始形成清晰条理的思维习惯。<br></br>&nbsp; &nbsp; &nbsp; &nbsp;逻辑思维、创意思维、设计思维、批判思维……更好的数学成绩、更好的升学途径、更好的未来人生……编程可以带给孩子无限可能。而所有这一切，都源于今天，对孩子编程兴趣的及时发掘和思维习惯的专业培养。</p>
                    </section>
                    
                </section>
                <section className="sec-content">
                    <section className="title-border">
                        <section className="border-bg1"><section className="border-bg2"></section></section>
                        <p>任何一个新的社会机遇出现时，前5%参与其中的人，最终会享受超过50%的基于红利。</p>
                        <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;——“前5%”定律</p>
                    </section>
                    <p className="last">此刻</p>
                    <p className="last1">你的孩子正是前5%</p>
                    <img className="img_16" src="/images/home/img_16.jpg"></img>
                    <p className="last2">目前，1000+孩子已加入XKID</p>
                    <p className="gif-box">
                        <img className="imggif" src="/images/home/6400.gif"></img>
                        <img className="imggif" src="/images/home/6401.gif"></img>
                        <img className="imggif" src="/images/home/6402.gif"></img>
                        <img className="imggif" src="/images/home/6403.gif"></img>
                        <img className="imggif" src="/images/home/6404.gif"></img>
                        <img className="imggif" src="/images/home/6405.gif"></img>
                        <img className="imggif" src="/images/home/6406.gif"></img>
                    </p>
                    <p className="gif-box">
                        <img className="imggif" src="/images/home/6407.gif"></img>
                        <img className="imggif" src="/images/home/6408.gif"></img>
                        <img className="imggif" src="/images/home/6409.gif"></img>
                        <img className="imggif" src="/images/home/64010.gif"></img>
                        <img className="imggif" src="/images/home/64011.gif"></img>
                        <img className="imggif" src="/images/home/64012.gif"></img>
                        <img className="imggif" src="/images/home/64013.gif"></img>
                    </p>
                </section>
            </section>
        </MediaQuery>
    </div>
);
render(<Page><Home /></Page>, document.getElementById('app'));
