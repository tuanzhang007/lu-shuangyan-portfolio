import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  ExternalLink,
  Eye,
  Heart,
  Image as ImageIcon,
  Mail,
  Menu,
  RotateCcw,
  Trash2,
  Upload,
  Video,
  X,
} from 'lucide-react';

const profileUrl = 'https://www.xiaohongshu.com/user/profile/608dcbe5000000000101cb67';

const heroTiles = [
  { src: '/assets/portfolio/fushiguro.webp', alt: '伏黑甚尔 AI Cos 视觉作品' },
  { src: '/assets/portfolio/nier.webp', alt: '尼尔机械纪元 AI Cos 视觉作品' },
  { src: '/assets/portfolio/metro-look.webp', alt: '地铁场景 AI OOTD 作品' },
  { src: '/assets/portfolio/swordswoman.webp', alt: '侠女主题 AI 人像作品' },
];

const accountMetrics = [
  { value: '45,517', label: '近 30 日曝光' },
  { value: '5,382', label: '近 30 日观看' },
  { value: '248', label: '点赞' },
  { value: '115', label: '收藏' },
  { value: '100', label: '净涨粉' },
  { value: '13', label: '发布内容' },
];

const stages = [
  {
    id: 'ootd',
    tab: '从选品开始',
    title: '先验证：AI OOTD 能否带来商品兴趣？',
    image: '/assets/portfolio/metro-look.webp',
    imageAlt: '地铁场景 OOTD 内容封面',
    context: '从小红书选品中心挑选服装，组合完整穿搭，再用 AI 生成真实拍摄风格图片。',
    signal: '部分内容获得曝光，但评论、私信和明确商品咨询很少，橱窗效果也不明显。',
    decision: '意识到“画面好看”不等于“用户想买”，内容还缺少单品信息、购买理由和互动设计。',
    stat: '8,115',
    statLabel: '单篇最高曝光',
  },
  {
    id: 'nier',
    tab: '观察受众',
    title: '再观察：高观看内容是否触达目标用户？',
    image: '/assets/portfolio/nier.webp',
    imageAlt: '尼尔机械纪元 AI Cos 内容封面',
    context: '看到美女类内容更容易获得观看后，尝试《尼尔：机械纪元》女性 Cos 主题。',
    signal: '封面点击率达到 18.7%，但账号后台显示浏览者以男性用户为主。',
    decision: '将这次结果视为受众假设，而不是平台规律；下一步尝试更贴近女性审美兴趣的男性角色。',
    stat: '18.7%',
    statLabel: '封面点击率',
  },
  {
    id: 'fushiguro',
    tab: '调整方向',
    title: '后调整：把题材兴趣与女性审美结合。',
    image: '/assets/portfolio/fushiguro.webp',
    imageAlt: '伏黑甚尔 AI Cos 内容封面',
    context: '选择伏黑甚尔，将二次元角色、力量感造型与女性用户可能偏好的视觉特征结合。',
    signal: '获得 1,575 曝光、267 观看、30 点赞、4 评论、4 收藏和 5 分享。',
    decision: '验证了选题调整能改善互动，但样本仍小。后续要在发布前明确目标用户、内容目标和观察指标。',
    stat: '30',
    statLabel: '点赞',
  },
];

const works = [
  { title: '天与暴君｜伏黑甚尔', category: 'cos', categoryLabel: 'Cos 选题', src: '/assets/portfolio/fushiguro.webp', exposure: '1,575', engagement: '43' },
  { title: '尼尔：机械纪元｜电影感 Cos', category: 'cos', categoryLabel: 'Cos 选题', src: '/assets/portfolio/nier.webp', exposure: '426', engagement: '16' },
  { title: '今天地铁 looooook', category: 'ootd', categoryLabel: 'OOTD', src: '/assets/portfolio/metro-look.webp', exposure: '8,115', engagement: '29' },
  { title: '不费力穿搭｜简单舒适又好看', category: 'ootd', categoryLabel: 'OOTD', src: '/assets/portfolio/effortless.webp', exposure: '2,038', engagement: '27' },
  { title: '地铁 OOTD', category: 'ootd', categoryLabel: '短视频', src: '/assets/portfolio/subway-ootd.webp', exposure: '2,387', engagement: '32' },
  { title: '侠女完整提示词分享', category: 'visual', categoryLabel: 'AI 人像', src: '/assets/portfolio/swordswoman.webp', exposure: '7,226', engagement: '26' },
  { title: '一梦江南｜旗袍韵味', category: 'visual', categoryLabel: 'AI 人像', src: '/assets/portfolio/qipao.webp', exposure: '3,118', engagement: '39' },
  { title: '广东夏天的懒人套装', category: 'ootd', categoryLabel: 'OOTD', src: '/assets/portfolio/lazy-ootd.webp', exposure: '541', engagement: '6' },
  { title: 'AI 进化生活 How-to', category: 'visual', categoryLabel: 'AI 视觉', src: '/assets/portfolio/ai-photo.webp', exposure: '648', engagement: '5' },
];

const filters = [
  { id: 'all', label: '全部' },
  { id: 'ootd', label: 'OOTD' },
  { id: 'cos', label: 'Cos 选题' },
  { id: 'visual', label: 'AI 人像' },
];

function App() {
  const [activeStage, setActiveStage] = useState(stages[0].id);
  const [activeFilter, setActiveFilter] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  const stage = stages.find((item) => item.id === activeStage) ?? stages[0];
  const visibleWorks = activeFilter === 'all'
    ? works
    : works.filter((work) => work.category === activeFilter);

  return (
    <main>
      <Hero menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <DataSection />
      <CaseStudy stage={stage} activeStage={activeStage} setActiveStage={setActiveStage} />
      <WorkGallery activeFilter={activeFilter} setActiveFilter={setActiveFilter} visibleWorks={visibleWorks} />
      <UploadStudio
        uploadedVideo={uploadedVideo}
        setUploadedVideo={setUploadedVideo}
        uploadedImages={uploadedImages}
        setUploadedImages={setUploadedImages}
      />
      <About />
      <Contact />
    </main>
  );
}

function Hero({ menuOpen, setMenuOpen }) {
  return (
    <section className="hero" id="top">
      <div className="heroMosaic" aria-hidden="true">
        {heroTiles.map((tile) => <img key={tile.src} src={tile.src} alt="" />)}
      </div>
      <div className="heroOverlay" />

      <header className="siteHeader">
        <a className="wordmark" href="#top" aria-label="陆双彦作品集首页">
          陆双彦<span>PORTFOLIO</span>
        </a>
        <button
          className="menuButton"
          type="button"
          aria-label={menuOpen ? '关闭导航' : '打开导航'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'mainNav isOpen' : 'mainNav'} aria-label="主导航">
          <a href="#case" onClick={() => setMenuOpen(false)}>案例</a>
          <a href="#works" onClick={() => setMenuOpen(false)}>作品</a>
          <a href="#studio" onClick={() => setMenuOpen(false)}>上传</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>关于我</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>联系</a>
        </nav>
        <a className="resumeLink" href="#contact">联系我</a>
      </header>

      <div className="heroContent">
        <p>2026 届 · 内容运营 / 新媒体运营 / 电商运营</p>
        <h1>陆双彦<br />运营作品集</h1>
        <div className="heroBottom">
          <p>用 AI 完成内容表达，用真实发布验证判断。这里记录我从选题、视觉制作到数据复盘的第一段运营实践。</p>
          <a href="#case" className="roundAction" aria-label="查看内容实验案例"><ArrowDown size={24} /></a>
        </div>
      </div>
    </section>
  );
}

function DataSection() {
  return (
    <section className="dataSection" aria-labelledby="data-title">
      <div className="sectionIntro">
        <h2 id="data-title">真实发布，比漂亮话更重要。</h2>
        <p>数据来自小红书创作中心近 30 日导出记录。数据量不大，但每一个数字都对应真实发布。</p>
      </div>
      <div className="metricBand">
        {accountMetrics.map((metric) => (
          <div className="metricItem" key={metric.label}>
            <strong>{metric.value}</strong><span>{metric.label}</span>
          </div>
        ))}
      </div>
      <div className="dataFoot">
        <span>10 条图文 · 3 条视频</span>
        <a href={profileUrl} target="_blank" rel="noreferrer">查看小红书主页 <ExternalLink size={15} /></a>
      </div>
    </section>
  );
}

function CaseStudy({ stage, activeStage, setActiveStage }) {
  return (
    <section className="caseSection" id="case" aria-labelledby="case-title">
      <div className="caseHeader">
        <div><h2 id="case-title">从 AI OOTD 到 Cos 选题</h2><p>一次没有被包装成成功故事的内容方向实验。</p></div>
        <span>真实账号 · 2026.08—09</span>
      </div>
      <div className="stageTabs" role="group" aria-label="案例阶段">
        {stages.map((item) => (
          <button key={item.id} type="button" aria-pressed={activeStage === item.id} onClick={() => setActiveStage(item.id)}>{item.tab}</button>
        ))}
      </div>
      <div className="caseCanvas" key={stage.id}>
        <div className="caseVisual">
          <img src={stage.image} alt={stage.imageAlt} />
          <div className="caseStat"><strong>{stage.stat}</strong><span>{stage.statLabel}</span></div>
        </div>
        <div className="caseStory">
          <h3>{stage.title}</h3>
          <dl>
            <div><dt>做法</dt><dd>{stage.context}</dd></div>
            <div><dt>观察</dt><dd>{stage.signal}</dd></div>
            <div><dt>判断</dt><dd>{stage.decision}</dd></div>
          </dl>
          <p className="caseNote">AI 辅助完成图片生成；本人负责选题、内容方向、成图筛选、发布与基础数据观察。</p>
        </div>
      </div>
    </section>
  );
}

function WorkGallery({ activeFilter, setActiveFilter, visibleWorks }) {
  return (
    <section className="workSection" id="works" aria-labelledby="works-title">
      <div className="workHeader">
        <div><h2 id="works-title">已发布内容</h2><p>不是把图片堆满页面，而是保留有代表性的视觉方向与真实结果。</p></div>
        <div className="filterControl" role="group" aria-label="筛选作品">
          {filters.map((filter) => (
            <button key={filter.id} type="button" aria-pressed={activeFilter === filter.id} onClick={() => setActiveFilter(filter.id)}>{filter.label}</button>
          ))}
        </div>
      </div>
      <div className="workGrid" aria-live="polite">
        {visibleWorks.map((work, index) => (
          <article className={`workItem workItem${index % 5}`} key={work.title}>
            <div className="workImage"><img src={work.src} alt={`${work.title}作品封面`} loading="lazy" /><span>{work.categoryLabel}</span></div>
            <div className="workMeta">
              <h3>{work.title}</h3>
              <div><span><Eye size={15} /> {work.exposure}</span><span><Heart size={15} /> {work.engagement} 次互动</span></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function UploadStudio({ uploadedVideo, setUploadedVideo, uploadedImages, setUploadedImages }) {
  const handleVideo = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadedVideo((current) => {
      if (current?.url) URL.revokeObjectURL(current.url);
      return { name: file.name, url: URL.createObjectURL(file) };
    });
    event.target.value = '';
  };

  const handleImages = (event) => {
    const files = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith('image/'));
    if (!files.length) return;
    setUploadedImages((current) => [
      ...current,
      ...files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })),
    ]);
    event.target.value = '';
  };

  const clearVideo = () => {
    if (uploadedVideo?.url) URL.revokeObjectURL(uploadedVideo.url);
    setUploadedVideo(null);
  };

  const clearImages = () => {
    uploadedImages.forEach((image) => URL.revokeObjectURL(image.url));
    setUploadedImages([]);
  };

  return (
    <section className="studioSection" id="studio" aria-labelledby="studio-title">
      <div className="studioHeader">
        <div>
          <p className="studioLabel"><Upload size={15} /> 素材工作台</p>
          <h2 id="studio-title">把下一份内容，先放进来看看。</h2>
        </div>
        <p>你可以在这里替换视频、批量查看图片。素材只存在当前浏览器会话里，适合选片和预览，不会自动上传到服务器。</p>
      </div>

      <div className="studioGrid">
        <div className="uploadPanel">
          <div className="panelHeading">
            <div><Video size={19} /><strong>视频预览</strong></div>
            {uploadedVideo && <button type="button" onClick={clearVideo} aria-label="清除视频"><Trash2 size={16} /></button>}
          </div>
          {uploadedVideo ? (
            <div className="uploadedVideo">
              <video controls autoPlay muted preload="metadata" src={uploadedVideo.url} />
              <span title={uploadedVideo.name}>{uploadedVideo.name}</span>
            </div>
          ) : (
            <label className="uploadDropzone">
              <Video size={30} />
              <strong>选择一个视频文件</strong>
              <span>MP4 / MOV / WebM</span>
              <input type="file" accept="video/*" onChange={handleVideo} />
            </label>
          )}
          <p className="panelNote">默认不再加载黑屏样片。选择文件后，播放器只展示你刚刚上传的版本。</p>
        </div>

        <div className="uploadPanel">
          <div className="panelHeading">
            <div><ImageIcon size={19} /><strong>图片预览</strong></div>
            {uploadedImages.length > 0 && <button type="button" onClick={clearImages} aria-label="清除图片"><Trash2 size={16} /></button>}
          </div>
          <label className="imageUploadButton">
            <Upload size={17} /> 选择图片
            <input type="file" accept="image/*" multiple onChange={handleImages} />
          </label>
          {uploadedImages.length > 0 ? (
            <div className="uploadedImageGrid">
              {uploadedImages.map((image) => <img key={`${image.name}-${image.url}`} src={image.url} alt={image.name} />)}
            </div>
          ) : (
            <div className="emptyImageState"><ImageIcon size={28} /><span>还没有临时图片</span></div>
          )}
          <p className="panelNote">支持一次选择多张图片，用来快速比较封面、构图和色调。</p>
        </div>
      </div>

      <div className="studioFooter">
        <span><RotateCcw size={15} /> 当前预览不会改变公开作品墙</span>
        <span>上线后如需朋友看到新素材，需要重新部署或接入云端存储。</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="aboutSection" id="about" aria-labelledby="about-title">
      <div className="aboutPortrait"><img src="/assets/portrait.jpg" alt="陆双彦个人照片" loading="lazy" /></div>
      <div className="aboutCopy">
        <h2 id="about-title">会做内容，也愿意从基础运营做起。</h2>
        <p>我是仲恺农业工程学院财务管理专业 2026 届毕业生。数据整理、用户调研与审计实习让我养成了细致和验证意识；小红书实践则让我开始把选题、视觉、发布与复盘串成一个完整过程。</p>
        <div className="aboutFacts">
          <div><strong>Top 15%</strong><span>专业成绩排名</span></div>
          <div><strong>300+</strong><span>调研问卷样本</span></div>
          <div><strong>AI + 内容</strong><span>视觉生产方式</span></div>
        </div>
        <p className="toolLine">工具：Gemini、Cursor、剪映、Photoshop、Premiere Pro、Excel、SPSS</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contactSection" id="contact">
      <div><h2>让真实内容，成为下一次面试的开始。</h2><p>求职方向：内容运营 / 新媒体运营 / 电商运营</p></div>
      <div className="contactActions">
        <a href="mailto:3694726863@qq.com"><Mail size={19} /> 3694726863@qq.com</a>
      </div>
      <div className="footerBottom"><span>陆双彦 · 2026</span><a href="#top" aria-label="回到顶部"><ArrowUpRight size={20} /></a></div>
    </footer>
  );
}

export default App;
