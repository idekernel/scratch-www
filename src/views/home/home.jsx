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
            </section>
        </MediaQuery>
    </div>
);
render(<Page><Home /></Page>, document.getElementById('app'));
