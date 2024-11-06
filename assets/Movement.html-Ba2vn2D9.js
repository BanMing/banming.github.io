import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-CpBQXjW7.js";const t="/assets/20211020103235-C83xhWgY.png",l="/assets/20211020104326-UTCXw0n3.png",p={};function c(o,n){return i(),a("div",null,n[0]||(n[0]=[e('<h1 id="movement" tabindex="-1"><a class="header-anchor" href="#movement"><span>Movement</span></a></h1><h2 id="basic-movement" tabindex="-1"><a class="header-anchor" href="#basic-movement"><span>Basic Movement</span></a></h2><p>移动算法的结构图 <img src="'+t+'" alt="" loading="lazy"></p><h3 id="_2d" tabindex="-1"><a class="header-anchor" href="#_2d"><span>2D</span></a></h3><p>角色在2维空间移动，大多数3维游戏也可以看做二维的移动。</p><figure><img src="'+l+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="statics" tabindex="-1"><a class="header-anchor" href="#statics"><span>Statics</span></a></h3><p>在处理角色的位置、转向这些数据使用的公式与算法叫做静态，因为这些数据不含有任何角色移动的数据。数据结构可以定义为：</p><div class="language-c++ line-numbers-mode" data-highlighter="prismjs" data-ext="c++" data-title="c++"><pre><code><span class="line">class Static:</span>
<span class="line">    position: Vector</span>
<span class="line">    orientation: float</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kinematic" tabindex="-1"><a class="header-anchor" href="#kinematic"><span>Kinematic</span></a></h3><p>如果一个角色正在向一个方向移动，突然改变他的速度与方向，这看起来有点突兀。为了让这个运动更加的丝滑，不让角色加速太快。我们就需要一些算法去考虑角色当前的速度，使用合理的加速度去改变速度。</p><p>我们就要记录这个角色的速度与转向的速度(角速度)，我们可以定义数据结构为：</p><div class="language-c++ line-numbers-mode" data-highlighter="prismjs" data-ext="c++" data-title="c++"><pre><code><span class="line">class Kinematic:</span>
<span class="line">    position: Vector</span>
<span class="line">    orientation: float</span>
<span class="line">    velocity: Vector</span>
<span class="line">    rotation: float</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kinematic-movement" tabindex="-1"><a class="header-anchor" href="#kinematic-movement"><span>Kinematic Movement</span></a></h2><h3 id="seek" tabindex="-1"><a class="header-anchor" href="#seek"><span>Seek</span></a></h3><p>给定一个角色的静态数据以及目标的静态数据。来计算角色到目标的方向以及一个直线速度。大概实现如下：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">KinematicSeek</span><span class="token punctuation">:</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个算法可以用于追击的一些情况。但是我们如果要让角色到一个点，然后停下来。我们可以添加一个以目标点为圆心的半径。当我们的角色到这个半径内时，就停止移动。当我们的设置半径不合理时，太小了，会使角色一直到不了目标点，还会看到角色的抖动。这里有几种解决方式：</p><ul><li>固定时间到达目标点，需要设置一个最大速度阀值</li><li>扩大半径</li></ul><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">KinematicSeek</span><span class="token punctuation">:</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wandering" tabindex="-1"><a class="header-anchor" href="#wandering"><span>Wandering</span></a></h3><h3 id="arrive" tabindex="-1"><a class="header-anchor" href="#arrive"><span>Arrive</span></a></h3><p>可以设置以目标点设置两个圈，一个大半径圈，当进入这个圈后，角色开始减速。小圈是判断角色是否已经到达。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Arrive</span><span class="token punctuation">:</span></span>
<span class="line">    haracter<span class="token punctuation">:</span> Kinematic</span>
<span class="line">    arget<span class="token punctuation">:</span> Kinematic</span>
<span class="line">    axAcceleration<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line">    axSpeed<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment"># The radius for arriving at the target.</span></span>
<span class="line">    argetRadius<span class="token punctuation">:</span> <span class="token builtin">float</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在很多实现中并没有使用到大圈这种方式，因为在减速是会有震荡的可能性</p><h3 id="align" tabindex="-1"><a class="header-anchor" href="#align"><span>ALIGN</span></a></h3><p>对齐使角色的转向与目标的转向相匹配。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Align</span><span class="token punctuation">:</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="velocity-matching" tabindex="-1"><a class="header-anchor" href="#velocity-matching"><span>VELOCITY MATCHING</span></a></h3><p>把角色的速度与目标的数据设置为一样</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">VelocityMatch</span><span class="token punctuation">:</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="face" tabindex="-1"><a class="header-anchor" href="#face"><span>FACE</span></a></h3><p>这个行为使角色看向目标,他委托对齐行为但是先计算目标的方向。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Face</span> extends Align<span class="token punctuation">:</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="looking-where-you-re-going" tabindex="-1"><a class="header-anchor" href="#looking-where-you-re-going"><span>LOOKING WHERE YOU\`RE GOING</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre><code><span class="line"> <span class="token keyword">class</span> <span class="token class-name">LookWhereYoureGoing</span> extends Align<span class="token punctuation">:</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wander" tabindex="-1"><a class="header-anchor" href="#wander"><span>WANDER</span></a></h3>`,37)]))}const d=s(p,[["render",c],["__file","Movement.html.vue"]]),v=JSON.parse('{"path":"/Gameplay/AI/Movement/Movement.html","title":"Movement","lang":"en-US","frontmatter":{"date":"2021-11-05T18:58:09.000Z","tag":["Game AI"]},"headers":[{"level":2,"title":"Basic Movement","slug":"basic-movement","link":"#basic-movement","children":[{"level":3,"title":"2D","slug":"_2d","link":"#_2d","children":[]},{"level":3,"title":"Statics","slug":"statics","link":"#statics","children":[]},{"level":3,"title":"Kinematic","slug":"kinematic","link":"#kinematic","children":[]}]},{"level":2,"title":"Kinematic Movement","slug":"kinematic-movement","link":"#kinematic-movement","children":[{"level":3,"title":"Seek","slug":"seek","link":"#seek","children":[]},{"level":3,"title":"Wandering","slug":"wandering","link":"#wandering","children":[]},{"level":3,"title":"Arrive","slug":"arrive","link":"#arrive","children":[]},{"level":3,"title":"ALIGN","slug":"align","link":"#align","children":[]},{"level":3,"title":"VELOCITY MATCHING","slug":"velocity-matching","link":"#velocity-matching","children":[]},{"level":3,"title":"FACE","slug":"face","link":"#face","children":[]},{"level":3,"title":"LOOKING WHERE YOU`RE GOING","slug":"looking-where-you-re-going","link":"#looking-where-you-re-going","children":[]},{"level":3,"title":"WANDER","slug":"wander","link":"#wander","children":[]}]}],"git":{"createdTime":1636109889000,"updatedTime":1707213711000,"contributors":[{"name":"BanMing","email":"ban-ming@foxmail.com","commits":2},{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":2}]},"readingTime":{"minutes":4.1,"words":1229},"filePathRelative":"Gameplay/AI/Movement/Movement.md","localizedDate":"November 5, 2021","excerpt":"\\n<h2>Basic Movement</h2>\\n<p>移动算法的结构图\\n</p>\\n<h3>2D</h3>\\n<p>角色在2维空间移动，大多数3维游戏也可以看做二维的移动。</p>\\n<figure><figcaption></figcaption></figure>\\n<h3>Statics</h3>\\n<p>在处理角色的位置、转向这些数据使用的公式与算法叫做静态，因为这些数据不含有任何角色移动的数据。数据结构可以定义为：</p>\\n<div class=\\"language-c++ line-numbers-mode\\" data-highlighter=\\"prismjs\\" data-ext=\\"c++\\" data-title=\\"c++\\"><pre><code><span class=\\"line\\">class Static:</span>\\n<span class=\\"line\\">    position: Vector</span>\\n<span class=\\"line\\">    orientation: float</span>\\n<span class=\\"line\\"></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{d as comp,v as data};
