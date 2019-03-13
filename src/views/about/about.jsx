const React = require('react');
const render = require('../../lib/render.jsx');

const Page = require('../../components/page/www/page.jsx');
const TopBanner = require('../splash/feature/top-banner.jsx');
const MediaQuery = require('react-responsive').default;
require('./about.scss');
const About = () => (
    
    <div className="about">
        <MediaQuery
            key="frameless-tablet"
            minWidth={0}
        >
            <TopBanner />
            <section className="main">
                <section className="title">
                    <p>XKID诞生于</p>
                    <p>具备多年STEAM教育经验的线下机构</p>
                </section>
                <section className="content">
                    <section className="border l"></section>
                    <section className="border r"></section>
                    <img src="/images/about/img_1.jpg"></img>
                    <p className="alt">（无数孩子喜欢的益智益乐大家庭）</p>
                    <p className="dest">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;XKID少儿编程的前身，是北京著名的青少年STEAM连锁教育机构：【益智益乐】。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【益智益乐】以乐高机器人教学为核心，涵盖编程、魔方、3D艺术打印等全维度的素质类教育课程。经过6年的持续发展，已经成为北京北部最知名的线下STEAM教育机构之一。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;益智益乐最为人称道的是其独立研发的教学模式，以及该教学模式下其他机构无法比拟的各类比赛成绩。很多家长不惜驱车1小时以上，带孩子参加益智益乐的各类课程。
                    </p>
                    <img src="/images/about/img_2.jpg"></img>
                    <p className="alt">（益智益乐的比赛成绩有目共睹）</p>
                    <p className="dest">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如何让更多的孩子接受更好的STEAM教育，如何让辛苦付出的家长们能够稍微轻松一些，这是益智益乐教育者们一直想解决的问题。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2017年，益智益乐开始全力筹备线上教学部门。最核心的教研和师资全部向线上倾斜；多年的STEAM教学经验和教育成果全部向线上迁移。希望以多年的教育积累打造一个全新的线上STEAM教育品牌。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;于是，2018年，全新的线上少儿编程教育品牌“XKID少儿编程”正式诞生。
                    </p>
                    <img className="img_3" src="/images/about/img_3.jpg"></img>
                </section>

                <section className="title">
                    <p>XKID依靠最朴素的教育理念</p>
                    <p>凝聚各领域顶尖人才</p>
                </section>
                <section className="content">
                    <section className="border l"></section>
                    <section className="border r"></section>
                    <section className="subtitle">
                        <section className="circle l"></section>
                        <section className="border"></section>
                        <section className="circle r"></section>
                        <p>XKID创始CEO 先鹏老师</p>
                        <p>做教育，一定要对得起孩子的时间</p>
                    </section>
                    <p className="dest">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>先鹏老师</strong>，是一位拥有精彩人生却始终坚持教育初心的真正的教育工作者。<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;华中科技大学毕业后，从贫困镇的镇长助理，到知名互联网企业的培训总监，到教育科技公司的合伙人，王老师始终信奉的一句话就是：孩子最宝贵的是时间，我们做教育要对得起孩子的时间。正是这句最朴素的教育理念，凝聚了一批对教育怀抱着执着梦想的教育追梦人。</p>

                    <section className="subtitle">
                        <section className="circle l"></section>
                        <section className="border"></section>
                        <section className="circle r"></section>
                        <p>XKID指导专家 高教授</p>
                        <p>教育要保持前瞻，教学要保持朴素</p>
                    </section>
                    <p className="dest">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>高教授</strong>是清华大学知名教授，也是科协的特邀专家。作为国内顶级的STEAM教育推广专家，高教授还担任多个全国青少年科技竞赛的命题人，并常年在央视等各类媒体负责青少年科普工作。<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高教授对XKID寄予厚望，同时也对XKID有着严格的要求。高教授亲力亲为，帮助XKID设计教育融合机制、规划线上教学方向。同时，要求XKID：在教育理念上要未雨绸缪，要学会站在未来回望今天；而教学实践上，一定要保持朴素的本质，绝不用花哨的包装掩盖教学的核心。</p>

                    <section className="subtitle">
                        <section className="circle l"></section>
                        <section className="border"></section>
                        <section className="circle r"></section>
                        <p>XKID课程负责人 波波老师</p>
                        <p>既要接轨国外课程体系，又要适合中国孩子</p>
                    </section>
                    <p className="dest">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>波波老师</strong>是前IBM先进学习中心的课程设计专家，他亲自操刀XKID课程设计。波波老师长期在加拿大从事课程设计研究和开发工作。他把国外先进的STEAM课程理念注入XKID课程，结合益智益乐多年的教学数据积累，进行反复的知识萃取和融合。最终形成了XKID独特的论文引导式Scratch编程课程体系。</p>


                    <section className="subtitle">
                        <section className="circle l"></section>
                        <section className="border"></section>
                        <section className="circle r"></section>
                        <p>XKID教研负责人 大鹏老师</p>
                        <p>清华不是我的闪亮光环而是我的行事标准</p>
                    </section>
                    <p className="dest">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>大鹏老师</strong>毕业于清华01级电子系，信息学奥赛一等奖获得者，也是一名资深的编程专家。大鹏老师对每一句编程语句、对每一个编程模块都有自己的标准和要求。而这种清华式的高标准和严要求是XKID课程质量的最好保证。</p>


                    <section className="subtitle">
                        <section className="circle l"></section>
                        <section className="border"></section>
                        <section className="circle r"></section>
                        <p>XKID教学负责人 小光老师</p>
                        <p>做编程老师比做iOS专家更让我开心</p>
                    </section>
                    <p className="dest">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>小光老师</strong>曾是金山和百度的资深编程专家，也是行业内公认的iOS开发大牛。但最让小光老师开心的事情，就是带着一群小粉丝去写程序调bug。这种懂教育爱孩子的教学状态，是小光老师对XKID所有老师的要求。</p>



                    <section className="subtitle">
                        <section className="circle l"></section>
                        <section className="border"></section>
                        <section className="circle r"></section>
                        <p>XKID教师团队</p>
                        <p>用心教好每一个孩子</p>
                    </section>
                    <p className="dest">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>XKID教师</strong>均具备清华、北大、北航、北邮、北师等高校工科背景，很多老师本身就是IT领域的技术骨干，也是孩子的父母。优质的工科教育背景加上益智益乐系统的教师培训体系，XKID的教师团队在整个编程教育领域都是出类拔萃的。</p>


                    <section className="subtitle">
                        <section className="circle l"></section>
                        <section className="border"></section>
                        <section className="circle r"></section>
                        <p>XKID支持团队</p>
                        <p>多学科融合，给孩子最有营养的知识套餐</p>
                    </section>
                    <p className="dest">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来自知名设计团队的悠然老师，负责XKID的艺术呈现和创意支持。而原益智益乐特级老师东东老师负责孩子的学习心理支持。<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最重要的，多位来自微软、百度、小米的资深工程师们，组成了强大的编程支持团队。XKID的编程能力进阶和编程教学逻辑正是由这些顶级的工程师，从编程实践的角度出发，一点点制定和完善的。</p>
                </section>
                <section className="title">
                    <p>让孩子们成为优秀的未来公民</p>
                    <p>是XKID的价值和使命</p>
                </section>
                <section className="content">
                    <section className="border l"></section>
                    <section className="border r"></section>
                    <img className="img_4" src="/images/about/img_4.jpg"></img>
                    <p className="dest">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编程在现阶段是技能、是职业、是生存手段。但在可预见的未来，程序就是智能世界的运行规则、编程就是人与智能世界的沟通方式。<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编程所要求的敏锐洞察、全局视野、清晰思路、严谨习惯、高效沟通、自觉反思以及对接信息世界的“计算思维”，正是新时代对人的核心需求。<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编程注定要从一种专业技能转变为一种最基本的人的素质。<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编程教育也必将从一种技能培训转变为最基础的通识教育。<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;而XKID就是要用脚踏实地的努力，让每一个孩子都成为未来世界的参与者、掌控者和创造者。
                    </p>
                    <p className="dest s">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当编程跟说话和写字一样，成为未来世界对优秀公民最基本的素质要求时。XKID与家长一起，选择先行一步，选择现在就行动。 让孩子们早一步，成为优秀的未来公民。</p>
                    <img className="img_5" src="/images/about/img_5.jpg"></img>
                </section>
                <section className="sec-content first">
                    <section className="title-border">
                        <section className="border-bg1"><section className="border-bg2"></section></section>
                        <p>任何一个新的社会机遇出现时，前5%参与其中的人，最终会享受超过50%的基于红利。</p>
                        <p className="sec">——“前5%”定律</p>
                    </section>
                    <p className="last">此刻</p>
                    <p className="last1">你的孩子正是前5%</p>
                    <img className="img_6" src="/images/about/img_6.jpg"></img>
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

render(<Page><About /></Page>, document.getElementById('app'));
