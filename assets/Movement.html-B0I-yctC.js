import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as t,f as e,g as s,h as a,o as i}from"./app-BeQLnLll.js";const p="/assets/20211020103235-C83xhWgY.png",c="/assets/20211020104326-UTCXw0n3.png",o={},r={class:"MathJax",jax:"SVG",style:{position:"relative"}},u={style:{"vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"6.287ex",height:"2.262ex",role:"img",focusable:"false",viewBox:"0 -750 2778.7 1000","aria-hidden":"true"},d={class:"MathJax",jax:"SVG",style:{position:"relative"}},m={style:{"vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"4.526ex",height:"2.262ex",role:"img",focusable:"false",viewBox:"0 -750 2000.7 1000","aria-hidden":"true"};function v(k,n){return i(),t("div",null,[n[11]||(n[11]=e('<h1 id="movement" tabindex="-1"><a class="header-anchor" href="#movement"><span>Movement</span></a></h1><h2 id="basic-movement" tabindex="-1"><a class="header-anchor" href="#basic-movement"><span>Basic Movement</span></a></h2><p>移动算法的结构图<br><img src="'+p+'" alt="" loading="lazy"></p><h3 id="_2d" tabindex="-1"><a class="header-anchor" href="#_2d"><span>2D</span></a></h3><p>角色在2维空间移动，大多数3维游戏也可以看做二维的移动。</p><figure><img src="'+c+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="statics" tabindex="-1"><a class="header-anchor" href="#statics"><span>Statics</span></a></h3><p>在处理角色的位置、转向这些数据使用的公式与算法叫做静态，因为这些数据不含有任何角色移动的数据。数据结构可以定义为：</p><div class="language-c++ line-numbers-mode" data-highlighter="prismjs" data-ext="c++"><pre><code><span class="line">class Static:</span>
<span class="line">    position: Vector</span>
<span class="line">    orientation: float</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kinematic" tabindex="-1"><a class="header-anchor" href="#kinematic"><span>Kinematic</span></a></h3><p>如果一个角色正在向一个方向移动，突然改变他的速度与方向，这看起来有点突兀。为了让这个运动更加的丝滑，不让角色加速太快。我们就需要一些算法去考虑角色当前的速度，使用合理的加速度去改变速度。</p><p>我们就要记录这个角色的速度与转向的速度(角速度)，我们可以定义数据结构为：</p><div class="language-c++ line-numbers-mode" data-highlighter="prismjs" data-ext="c++"><pre><code><span class="line">class Kinematic:</span>
<span class="line">    position: Vector</span>
<span class="line">    orientation: float</span>
<span class="line">    velocity: Vector</span>
<span class="line">    rotation: float</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kinematic-movement" tabindex="-1"><a class="header-anchor" href="#kinematic-movement"><span>Kinematic Movement</span></a></h2><h3 id="seek" tabindex="-1"><a class="header-anchor" href="#seek"><span>Seek</span></a></h3><p>给定一个角色的静态数据以及目标的静态数据。来计算角色到目标的方向以及一个直线速度。大概实现如下：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">KinematicSeek</span><span class="token punctuation">:</span></span>
<span class="line">    character<span class="token punctuation">:</span> Static</span>
<span class="line">    target<span class="token punctuation">:</span> Static</span>
<span class="line"></span>
<span class="line">    maxSpeed<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line"></span>
<span class="line">    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> KinematicSteeringOutput<span class="token punctuation">:</span></span>
<span class="line">        result <span class="token operator">=</span> new KinematicSteeringOutput<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment"># Get the direction to the target.</span></span>
<span class="line">        result<span class="token punctuation">.</span>velocity <span class="token operator">=</span> target<span class="token punctuation">.</span>position <span class="token operator">-</span> character<span class="token punctuation">.</span>position</span>
<span class="line"></span>
<span class="line">        <span class="token comment"># The velocity is along this direction, at full speed.</span></span>
<span class="line">        result<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        result<span class="token punctuation">.</span>velocity <span class="token operator">*=</span> maxSpeed</span>
<span class="line"></span>
<span class="line">        <span class="token comment"># Face in the direction we want to move.</span></span>
<span class="line">        character<span class="token punctuation">.</span>orientation <span class="token operator">=</span> newOrientation<span class="token punctuation">(</span></span>
<span class="line">        character<span class="token punctuation">.</span>orientation<span class="token punctuation">,</span></span>
<span class="line">        result<span class="token punctuation">.</span>velocity<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        result<span class="token punctuation">.</span>rotation <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">        <span class="token keyword">return</span> result</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个算法可以用于追击的一些情况。但是我们如果要让角色到一个点，然后停下来。我们可以添加一个以目标点为圆心的半径。当我们的角色到这个半径内时，就停止移动。当我们的设置半径不合理时，太小了，会使角色一直到不了目标点，还会看到角色的抖动。这里有几种解决方式：</p><ul><li>固定时间到达目标点，需要设置一个最大速度阀值</li><li>扩大半径</li></ul><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">KinematicSeek</span><span class="token punctuation">:</span></span>
<span class="line">    character<span class="token punctuation">:</span> Static</span>
<span class="line">    target<span class="token punctuation">:</span> Static</span>
<span class="line"></span>
<span class="line">    maxSpeed<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line"></span>
<span class="line">    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> KinematicSteeringOutput<span class="token punctuation">:</span></span>
<span class="line">        result <span class="token operator">=</span> new KinematicSteeringOutput<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment"># Get the direction to the target.</span></span>
<span class="line">        result<span class="token punctuation">.</span>velocity <span class="token operator">=</span> target<span class="token punctuation">.</span>position <span class="token operator">-</span> character<span class="token punctuation">.</span>position</span>
<span class="line"></span>
<span class="line">         <span class="token comment"># Check if we’re within radius.</span></span>
<span class="line">        <span class="token keyword">if</span> result<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> radius<span class="token punctuation">:</span></span>
<span class="line">            <span class="token comment"># Request no steering.</span></span>
<span class="line">            <span class="token keyword">return</span> null</span>
<span class="line">       </span>
<span class="line">        <span class="token comment"># We need to move to our target, we’d like to</span></span>
<span class="line">        <span class="token comment"># get there in timeToTarget seconds.</span></span>
<span class="line">        result<span class="token punctuation">.</span>velocity <span class="token operator">/=</span> timeToTarget</span>
<span class="line">       </span>
<span class="line">        <span class="token comment"># If this is too fast, clip it to the max speed.</span></span>
<span class="line">        <span class="token keyword">if</span> result<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> maxSpeed<span class="token punctuation">:</span></span>
<span class="line">            result<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            result<span class="token punctuation">.</span>velocity <span class="token operator">*=</span> maxSpeed</span>
<span class="line"></span>
<span class="line">        <span class="token comment"># Face in the direction we want to move.</span></span>
<span class="line">        character<span class="token punctuation">.</span>orientation <span class="token operator">=</span> newOrientation<span class="token punctuation">(</span></span>
<span class="line">        character<span class="token punctuation">.</span>orientation<span class="token punctuation">,</span></span>
<span class="line">        result<span class="token punctuation">.</span>velocity<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        result<span class="token punctuation">.</span>rotation <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">        <span class="token keyword">return</span> result</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wandering" tabindex="-1"><a class="header-anchor" href="#wandering"><span>Wandering</span></a></h3><p>Wandering（漫游）是一种让角色产生平滑随机游走效果的转向行为，其核心思想是：在角色前方一段固定距离处投射一个小圆（wander circle），目标点始终被约束在该圆的圆周上，每帧对目标点的角度施加一个小幅随机扰动（wander angle jitter），从而驱动角色连续、平滑地改变方向。</p><p>与简单地&quot;每帧随机选一个新方向&quot;相比，Wandering 的优势在于：随机量只作用于圆上的角度偏移，而非整体速度方向，因此方向变化是渐进的，视觉上不会产生抖动或突然转弯的不自然感。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Wander</span><span class="token punctuation">:</span></span>
<span class="line">    character<span class="token punctuation">:</span> Kinematic</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 投射到角色前方的距离</span></span>
<span class="line">    wanderOffset<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line">    <span class="token comment"># 投射圆的半径</span></span>
<span class="line">    wanderRadius<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line">    <span class="token comment"># 每帧最大角度扰动量（弧度）</span></span>
<span class="line">    wanderRate<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line">    <span class="token comment"># 当前目标点在圆上的角度（随帧累积）</span></span>
<span class="line">    wanderOrientation<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line"></span>
<span class="line">    maxAcceleration<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line"></span>
<span class="line">    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> SteeringOutput<span class="token punctuation">:</span></span>
<span class="line">        result <span class="token operator">=</span> new SteeringOutput<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment"># 在当前朝向上随机扰动 wander 角度</span></span>
<span class="line">        wanderOrientation <span class="token operator">+=</span> randomBinomial<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> wanderRate</span>
<span class="line"></span>
<span class="line">        <span class="token comment"># 目标朝向 = 角色朝向 + 本帧 wander 角度</span></span>
<span class="line">        targetOrientation <span class="token operator">=</span> wanderOrientation <span class="token operator">+</span> character<span class="token punctuation">.</span>orientation</span>
<span class="line"></span>
<span class="line">        <span class="token comment"># 投射圆的圆心（角色前方 wanderOffset 处）</span></span>
<span class="line">        wanderCenter <span class="token operator">=</span> character<span class="token punctuation">.</span>position <span class="token operator">+</span></span>
<span class="line">            wanderOffset <span class="token operator">*</span> asVector<span class="token punctuation">(</span>character<span class="token punctuation">.</span>orientation<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment"># 目标点 = 圆心 + wanderRadius * 目标朝向对应的单位向量</span></span>
<span class="line">        target <span class="token operator">=</span> wanderCenter <span class="token operator">+</span> wanderRadius <span class="token operator">*</span> asVector<span class="token punctuation">(</span>targetOrientation<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment"># 以最大加速度朝目标点施力</span></span>
<span class="line">        result<span class="token punctuation">.</span>linear <span class="token operator">=</span> maxAcceleration <span class="token operator">*</span> <span class="token punctuation">(</span>target <span class="token operator">-</span> character<span class="token punctuation">.</span>position<span class="token punctuation">)</span><span class="token punctuation">.</span>normalized<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        result<span class="token punctuation">.</span>angular <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">        <span class="token keyword">return</span> result</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24)),s("p",null,[n[4]||(n[4]=a("其中 ")),n[5]||(n[5]=s("code",null,"randomBinomial()",-1)),n[6]||(n[6]=a(" 返回 ")),s("mjx-container",r,[(i(),t("svg",u,n[0]||(n[0]=[e('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mo"><path data-c="5B" d="M118 -250V750H255V710H158V-210H255V-250H118Z"></path></g><g data-mml-node="mo" transform="translate(278,0)"><path data-c="2212" d="M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z"></path></g><g data-mml-node="mn" transform="translate(1056,0)"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"></path></g><g data-mml-node="mo" transform="translate(1556,0)"><path data-c="2C" d="M78 35T78 60T94 103T137 121Q165 121 187 96T210 8Q210 -27 201 -60T180 -117T154 -158T130 -185T117 -194Q113 -194 104 -185T95 -172Q95 -168 106 -156T131 -126T157 -76T173 -3V9L172 8Q170 7 167 6T161 3T152 1T140 0Q113 0 96 17Z"></path></g><g data-mml-node="mn" transform="translate(2000.7,0)"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"></path></g><g data-mml-node="mo" transform="translate(2500.7,0)"><path data-c="5D" d="M22 710V750H159V-250H22V-210H119V710H22Z"></path></g></g></g>',1)]))),n[1]||(n[1]=s("mjx-assistive-mml",{unselectable:"on",display:"inline"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mo",{stretchy:"false"},"["),s("mo",null,"−"),s("mn",null,"1"),s("mo",null,","),s("mn",null,"1"),s("mo",{stretchy:"false"},"]")])],-1))]),n[7]||(n[7]=a(" 范围内的随机值（通常用两个 ")),s("mjx-container",d,[(i(),t("svg",m,n[2]||(n[2]=[e('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mo"><path data-c="5B" d="M118 -250V750H255V710H158V-210H255V-250H118Z"></path></g><g data-mml-node="mn" transform="translate(278,0)"><path data-c="30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path></g><g data-mml-node="mo" transform="translate(778,0)"><path data-c="2C" d="M78 35T78 60T94 103T137 121Q165 121 187 96T210 8Q210 -27 201 -60T180 -117T154 -158T130 -185T117 -194Q113 -194 104 -185T95 -172Q95 -168 106 -156T131 -126T157 -76T173 -3V9L172 8Q170 7 167 6T161 3T152 1T140 0Q113 0 96 17Z"></path></g><g data-mml-node="mn" transform="translate(1222.7,0)"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"></path></g><g data-mml-node="mo" transform="translate(1722.7,0)"><path data-c="5D" d="M22 710V750H159V-250H22V-210H119V710H22Z"></path></g></g></g>',1)]))),n[3]||(n[3]=s("mjx-assistive-mml",{unselectable:"on",display:"inline"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mo",{stretchy:"false"},"["),s("mn",null,"0"),s("mo",null,","),s("mn",null,"1"),s("mo",{stretchy:"false"},"]")])],-1))]),n[8]||(n[8]=a(" 随机数相减近似正态分布），")),n[9]||(n[9]=s("code",null,"asVector(orientation)",-1)),n[10]||(n[10]=a(" 将朝向角转换为单位向量。"))]),n[12]||(n[12]=e(`<h3 id="arrive" tabindex="-1"><a class="header-anchor" href="#arrive"><span>Arrive</span></a></h3><p>可以设置以目标点设置两个圈，一个大半径圈，当进入这个圈后，角色开始减速。小圈是判断角色是否已经到达。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Arrive</span><span class="token punctuation">:</span></span>
<span class="line">    character<span class="token punctuation">:</span> Kinematic</span>
<span class="line">    target<span class="token punctuation">:</span> Kinematic</span>
<span class="line">    maxAcceleration<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line">    maxSpeed<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment"># The radius for arriving at the target.</span></span>
<span class="line">    targetRadius<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment"># The radius for beginning to slow down.</span></span>
<span class="line">    slowRadius<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment"># The time over which to achieve target speed.</span></span>
<span class="line">    timeToTarget<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">0.1</span></span>
<span class="line">    </span>
<span class="line">    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> SteeringOutput<span class="token punctuation">:</span></span>
<span class="line">        result <span class="token operator">=</span> new SteeringOutput<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment"># Get the direction to the target.</span></span>
<span class="line">        direction <span class="token operator">=</span> target<span class="token punctuation">.</span>position <span class="token operator">-</span> character<span class="token punctuation">.</span>position</span>
<span class="line">        distance <span class="token operator">=</span> direction<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment"># Check if we are there, return no steering.</span></span>
<span class="line">        <span class="token keyword">if</span> distance <span class="token operator">&lt;</span> targetRadius<span class="token punctuation">:</span></span>
<span class="line">            <span class="token keyword">return</span> null</span>
<span class="line">        </span>
<span class="line">        <span class="token comment"># If we are outside the slowRadius, then move at max speed.</span></span>
<span class="line">        <span class="token keyword">if</span> distance <span class="token operator">&gt;</span> slowRadius<span class="token punctuation">:</span></span>
<span class="line">            targetSpeed <span class="token operator">=</span> maxSpeed</span>
<span class="line">        <span class="token comment"># Otherwise calculate a scaled speed.</span></span>
<span class="line">        <span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">            targetSpeed <span class="token operator">=</span> maxSpeed <span class="token operator">*</span> distance <span class="token operator">/</span> slowRadius</span>
<span class="line">        </span>
<span class="line">        <span class="token comment"># The target velocity combines speed and direction</span></span>
<span class="line">        targetVelocity <span class="token operator">=</span> direction</span>
<span class="line">        targetVelocity<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        targetVelocity <span class="token operator">*=</span> targetSpeed</span>
<span class="line">        </span>
<span class="line">        <span class="token comment"># Acceleration tries to get to the target velocity.</span></span>
<span class="line">        result<span class="token punctuation">.</span>linear <span class="token operator">=</span> targetVelocity <span class="token operator">-</span> character<span class="token punctuation">.</span>velocity</span>
<span class="line">        result<span class="token punctuation">.</span>linear <span class="token operator">/=</span> timeToTarget</span>
<span class="line">        </span>
<span class="line">        <span class="token comment"># Check if the acceleration is too fast.</span></span>
<span class="line">        <span class="token keyword">if</span> result<span class="token punctuation">.</span>linear<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> maxAcceleration<span class="token punctuation">:</span></span>
<span class="line">            result<span class="token punctuation">.</span>linear<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            result<span class="token punctuation">.</span>linear <span class="token operator">*=</span> maxAcceleration</span>
<span class="line">        </span>
<span class="line">        result<span class="token punctuation">.</span>angular <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">return</span> result</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在很多实现中并没有使用到大圈这种方式，因为在减速是会有震荡的可能性</p><h3 id="align" tabindex="-1"><a class="header-anchor" href="#align"><span>ALIGN</span></a></h3><p>对齐使角色的转向与目标的转向相匹配。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Align</span><span class="token punctuation">:</span></span>
<span class="line">    character<span class="token punctuation">:</span> Kinematic</span>
<span class="line">    target<span class="token punctuation">:</span> Kinematic</span>
<span class="line"></span>
<span class="line">    maxAngularAcceleration<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line">    maxRotation<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># The radius for arriving at the target.</span></span>
<span class="line">    targetRadius<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># The radius for beginning to slow down.</span></span>
<span class="line">    slowRadius<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># The time over which to achieve target speed.</span></span>
<span class="line">    timeToTarget<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">0.1</span></span>
<span class="line"></span>
<span class="line">    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> SteeringOutput<span class="token punctuation">:</span></span>
<span class="line">    result <span class="token operator">=</span> new SteeringOutput<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># Get the naive direction to the target.</span></span>
<span class="line">    rotation <span class="token operator">=</span> target<span class="token punctuation">.</span>orientation <span class="token operator">-</span> character<span class="token punctuation">.</span>orientation</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># Map the result to the (-pi, pi) interval.</span></span>
<span class="line">    rotation <span class="token operator">=</span> mapToRange<span class="token punctuation">(</span>rotation<span class="token punctuation">)</span></span>
<span class="line">    rotationSize <span class="token operator">=</span> <span class="token builtin">abs</span><span class="token punctuation">(</span>rotation<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># Check if we are there, return no steering.</span></span>
<span class="line">    <span class="token keyword">if</span> rotationSize <span class="token operator">&lt;</span> targetRadius<span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> null</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># If we are outside the slowRadius, then use maximum  tation.</span></span>
<span class="line">    <span class="token keyword">if</span> rotationSize <span class="token operator">&gt;</span> slowRadius<span class="token punctuation">:</span></span>
<span class="line">        targetRotation <span class="token operator">=</span> maxRotation</span>
<span class="line">     <span class="token comment"># Otherwise calculate a scaled rotation.</span></span>
<span class="line">    <span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">        targetRotation <span class="token operator">=</span> maxRotation <span class="token operator">*</span> rotationSize <span class="token operator">/</span> slowRadius</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># The final target rotation combines speed (already inthe</span></span>
<span class="line">    <span class="token comment"># variable) and direction.</span></span>
<span class="line">    targetRotation <span class="token operator">*=</span> rotation <span class="token operator">/</span> rotationSize</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># Acceleration tries to get to the target rotation.</span></span>
<span class="line">    result<span class="token punctuation">.</span>angular <span class="token operator">=</span> targetRotation <span class="token operator">-</span> character<span class="token punctuation">.</span>rotation</span>
<span class="line">    result<span class="token punctuation">.</span>angular <span class="token operator">/=</span> timeToTarget</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># Check if the acceleration is too great.</span></span>
<span class="line">    angularAcceleration <span class="token operator">=</span> <span class="token builtin">abs</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>angular<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> angularAcceleration <span class="token operator">&gt;</span> maxAngularAcceleration<span class="token punctuation">:</span></span>
<span class="line">        result<span class="token punctuation">.</span>angular <span class="token operator">/=</span> angularAcceleration</span>
<span class="line">        result<span class="token punctuation">.</span>angular <span class="token operator">*=</span> maxAngularAcceleration</span>
<span class="line"></span>
<span class="line">    result<span class="token punctuation">.</span>linear <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">        <span class="token keyword">return</span> result</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="velocity-matching" tabindex="-1"><a class="header-anchor" href="#velocity-matching"><span>VELOCITY MATCHING</span></a></h3><p>把角色的速度与目标的数据设置为一样</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">VelocityMatch</span><span class="token punctuation">:</span></span>
<span class="line">    character<span class="token punctuation">:</span> Kinematic</span>
<span class="line">    target<span class="token punctuation">:</span> Kinematic</span>
<span class="line"></span>
<span class="line">    maxAcceleration<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># The time over which to achieve target speed.</span></span>
<span class="line">    timeToTarget <span class="token operator">=</span> <span class="token number">0.1</span></span>
<span class="line"></span>
<span class="line">    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> SteeringOutput<span class="token punctuation">:</span></span>
<span class="line">        result <span class="token operator">=</span> new SteeringOutput<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment"># Acceleration tries to get to the target velocity.</span></span>
<span class="line">        result<span class="token punctuation">.</span>linear <span class="token operator">=</span> target<span class="token punctuation">.</span>velocity <span class="token operator">-</span> character<span class="token punctuation">.</span>velocity</span>
<span class="line">        result<span class="token punctuation">.</span>linear <span class="token operator">/=</span> timeToTarget</span>
<span class="line"></span>
<span class="line">        <span class="token comment"># Check if the acceleration is too fast.</span></span>
<span class="line">        <span class="token keyword">if</span> result<span class="token punctuation">.</span>linear<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> maxAcceleration<span class="token punctuation">:</span></span>
<span class="line">            result<span class="token punctuation">.</span>linear<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            result<span class="token punctuation">.</span>linear <span class="token operator">*=</span> maxAcceleration</span>
<span class="line"></span>
<span class="line">        result<span class="token punctuation">.</span>angular <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">        <span class="token keyword">return</span> result</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="face" tabindex="-1"><a class="header-anchor" href="#face"><span>FACE</span></a></h3><p>这个行为使角色看向目标,他委托对齐行为但是先计算目标的方向。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Face</span> extends Align<span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment"># Overrides the Align.target member.</span></span>
<span class="line">    target<span class="token punctuation">:</span> Kinematic</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># ... Other data is derived from the superclass ...</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># Implemented as it was in Pursue.</span></span>
<span class="line">    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> SteeringOutput<span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment"># 1. Calculate the target to delegate to align</span></span>
<span class="line">    Work out the direction to target<span class="token punctuation">.</span></span>
<span class="line">    direction <span class="token operator">=</span> target<span class="token punctuation">.</span>position <span class="token operator">-</span> character<span class="token punctuation">.</span>position</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># Check for a zero direction, and make no change if so.</span></span>
<span class="line">    <span class="token keyword">if</span> direction<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> target</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 2. Delegate to align.</span></span>
<span class="line">    Align<span class="token punctuation">.</span>target <span class="token operator">=</span> explicitTarget</span>
<span class="line">    Align<span class="token punctuation">.</span>target<span class="token punctuation">.</span>orientation <span class="token operator">=</span> atan2<span class="token punctuation">(</span><span class="token operator">-</span>direction<span class="token punctuation">.</span>x<span class="token punctuation">,</span> direction<span class="token punctuation">.</span>z<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> Align<span class="token punctuation">.</span>getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="looking-where-you-re-going" tabindex="-1"><a class="header-anchor" href="#looking-where-you-re-going"><span>LOOKING WHERE YOU\`RE GOING</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"> <span class="token keyword">class</span> <span class="token class-name">LookWhereYoureGoing</span> extends Align<span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment"># No need for an overridden target member, we have</span></span>
<span class="line">    <span class="token comment"># no explicit target to set.</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># ... Other data is derived from the superclass ...</span></span>
<span class="line"></span>
<span class="line">    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> SteeringOutput<span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment"># 1. Calculate the target to delegate to align</span></span>
<span class="line">        <span class="token comment"># Check for a zero direction, and make no change if so.</span></span>
<span class="line">        velocity<span class="token punctuation">:</span> Vector <span class="token operator">=</span> character<span class="token punctuation">.</span>velocity</span>
<span class="line">        <span class="token keyword">if</span> velocity<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token keyword">return</span> null</span>
<span class="line"></span>
<span class="line">        <span class="token comment"># Otherwise set the target based on the velocity.</span></span>
<span class="line">        target<span class="token punctuation">.</span>orientation <span class="token operator">=</span> atan2<span class="token punctuation">(</span><span class="token operator">-</span>velocity<span class="token punctuation">.</span>x<span class="token punctuation">,</span> velocity<span class="token punctuation">.</span>z<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment"># 2. Delegate to align.</span></span>
<span class="line">        <span class="token keyword">return</span> Align<span class="token punctuation">.</span>getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wander" tabindex="-1"><a class="header-anchor" href="#wander"><span>WANDER</span></a></h3>`,16))])}const h=l(o,[["render",v],["__file","Movement.html.vue"]]),f=JSON.parse('{"path":"/Gameplay/AI/Movement/Movement.html","title":"Movement","lang":"en-US","frontmatter":{"date":"2021-11-05T18:58:09.000Z","tag":["Game AI"]},"git":{"createdTime":1636109889000,"updatedTime":1782370825000,"contributors":[{"name":"BanMing","username":"BanMing","email":"ban-ming@foxmail.com","commits":7,"url":"https://github.com/BanMing"},{"name":"wupeng","username":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":2,"url":"https://github.com/wupeng"},{"name":"Claude Opus 4.7","username":"Claude Opus 4.7","email":"noreply@anthropic.com","commits":2,"url":"https://github.com/Claude Opus 4.7"}]},"readingTime":{"minutes":5.35,"words":1604},"filePathRelative":"Gameplay/AI/Movement/Movement.md","localizedDate":"November 5, 2021","excerpt":"\\n<h2>Basic Movement</h2>\\n<p>移动算法的结构图<br>\\n</p>\\n<h3>2D</h3>\\n<p>角色在2维空间移动，大多数3维游戏也可以看做二维的移动。</p>\\n<figure><figcaption></figcaption></figure>\\n<h3>Statics</h3>\\n<p>在处理角色的位置、转向这些数据使用的公式与算法叫做静态，因为这些数据不含有任何角色移动的数据。数据结构可以定义为：</p>\\n<div class=\\"language-c++ line-numbers-mode\\" data-highlighter=\\"prismjs\\" data-ext=\\"c++\\"><pre><code><span class=\\"line\\">class Static:</span>\\n<span class=\\"line\\">    position: Vector</span>\\n<span class=\\"line\\">    orientation: float</span>\\n<span class=\\"line\\"></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{h as comp,f as data};
