import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,b as e}from"./app-D53c36U9.js";const t="/assets/20211020103235-vN8YVoGF.png",i="/assets/20211020104326-FEwl8NJ9.png",o={},p=e('<h1 id="movement" tabindex="-1"><a class="header-anchor" href="#movement" aria-hidden="true">#</a> Movement</h1><h2 id="basic-movement" tabindex="-1"><a class="header-anchor" href="#basic-movement" aria-hidden="true">#</a> Basic Movement</h2><p>移动算法的结构图 <img src="'+t+'" alt="" loading="lazy"></p><h3 id="_2d" tabindex="-1"><a class="header-anchor" href="#_2d" aria-hidden="true">#</a> 2D</h3><p>角色在2维空间移动，大多数3维游戏也可以看做二维的移动。</p><figure><img src="'+i+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="statics" tabindex="-1"><a class="header-anchor" href="#statics" aria-hidden="true">#</a> Statics</h3><p>在处理角色的位置、转向这些数据使用的公式与算法叫做静态，因为这些数据不含有任何角色移动的数据。数据结构可以定义为：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>class Static:
    position: Vector
    orientation: float
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kinematic" tabindex="-1"><a class="header-anchor" href="#kinematic" aria-hidden="true">#</a> Kinematic</h3><p>如果一个角色正在向一个方向移动，突然改变他的速度与方向，这看起来有点突兀。为了让这个运动更加的丝滑，不让角色加速太快。我们就需要一些算法去考虑角色当前的速度，使用合理的加速度去改变速度。</p><p>我们就要记录这个角色的速度与转向的速度(角速度)，我们可以定义数据结构为：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>class Kinematic:
    position: Vector
    orientation: float
    velocity: Vector
    rotation: float
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kinematic-movement" tabindex="-1"><a class="header-anchor" href="#kinematic-movement" aria-hidden="true">#</a> Kinematic Movement</h2><h3 id="seek" tabindex="-1"><a class="header-anchor" href="#seek" aria-hidden="true">#</a> Seek</h3><p>给定一个角色的静态数据以及目标的静态数据。来计算角色到目标的方向以及一个直线速度。大概实现如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">KinematicSeek</span><span class="token punctuation">:</span>
    character<span class="token punctuation">:</span> Static
    target<span class="token punctuation">:</span> Static

    maxSpeed<span class="token punctuation">:</span> <span class="token builtin">float</span>

    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> KinematicSteeringOutput<span class="token punctuation">:</span>
        result <span class="token operator">=</span> new KinematicSteeringOutput<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment"># Get the direction to the target.</span>
        result<span class="token punctuation">.</span>velocity <span class="token operator">=</span> target<span class="token punctuation">.</span>position <span class="token operator">-</span> character<span class="token punctuation">.</span>position

        <span class="token comment"># The velocity is along this direction, at full speed.</span>
        result<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span><span class="token punctuation">)</span>
        result<span class="token punctuation">.</span>velocity <span class="token operator">*=</span> maxSpeed

        <span class="token comment"># Face in the direction we want to move.</span>
        character<span class="token punctuation">.</span>orientation <span class="token operator">=</span> newOrientation<span class="token punctuation">(</span>
        character<span class="token punctuation">.</span>orientation<span class="token punctuation">,</span>
        result<span class="token punctuation">.</span>velocity<span class="token punctuation">)</span>

        result<span class="token punctuation">.</span>rotation <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">return</span> result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个算法可以用于追击的一些情况。但是我们如果要让角色到一个点，然后停下来。我们可以添加一个以目标点为圆心的半径。当我们的角色到这个半径内时，就停止移动。当我们的设置半径不合理时，太小了，会使角色一直到不了目标点，还会看到角色的抖动。这里有几种解决方式：</p><ul><li>固定时间到达目标点，需要设置一个最大速度阀值</li><li>扩大半径</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">KinematicSeek</span><span class="token punctuation">:</span>
    character<span class="token punctuation">:</span> Static
    target<span class="token punctuation">:</span> Static

    maxSpeed<span class="token punctuation">:</span> <span class="token builtin">float</span>

    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> KinematicSteeringOutput<span class="token punctuation">:</span>
        result <span class="token operator">=</span> new KinematicSteeringOutput<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment"># Get the direction to the target.</span>
        result<span class="token punctuation">.</span>velocity <span class="token operator">=</span> target<span class="token punctuation">.</span>position <span class="token operator">-</span> character<span class="token punctuation">.</span>position

         <span class="token comment"># Check if we’re within radius.</span>
        <span class="token keyword">if</span> result<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> radius<span class="token punctuation">:</span>
            <span class="token comment"># Request no steering.</span>
            <span class="token keyword">return</span> null
       
        <span class="token comment"># We need to move to our target, we’d like to</span>
        <span class="token comment"># get there in timeToTarget seconds.</span>
        result<span class="token punctuation">.</span>velocity <span class="token operator">/=</span> timeToTarget
       
        <span class="token comment"># If this is too fast, clip it to the max speed.</span>
        <span class="token keyword">if</span> result<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> maxSpeed<span class="token punctuation">:</span>
            result<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span><span class="token punctuation">)</span>
            result<span class="token punctuation">.</span>velocity <span class="token operator">*=</span> maxSpeed

        <span class="token comment"># Face in the direction we want to move.</span>
        character<span class="token punctuation">.</span>orientation <span class="token operator">=</span> newOrientation<span class="token punctuation">(</span>
        character<span class="token punctuation">.</span>orientation<span class="token punctuation">,</span>
        result<span class="token punctuation">.</span>velocity<span class="token punctuation">)</span>

        result<span class="token punctuation">.</span>rotation <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">return</span> result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wandering" tabindex="-1"><a class="header-anchor" href="#wandering" aria-hidden="true">#</a> Wandering</h3><h3 id="arrive" tabindex="-1"><a class="header-anchor" href="#arrive" aria-hidden="true">#</a> Arrive</h3><p>可以设置以目标点设置两个圈，一个大半径圈，当进入这个圈后，角色开始减速。小圈是判断角色是否已经到达。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Arrive</span><span class="token punctuation">:</span>
    haracter<span class="token punctuation">:</span> Kinematic
    arget<span class="token punctuation">:</span> Kinematic
    axAcceleration<span class="token punctuation">:</span> <span class="token builtin">float</span>
    axSpeed<span class="token punctuation">:</span> <span class="token builtin">float</span>
    
    <span class="token comment"># The radius for arriving at the target.</span>
    argetRadius<span class="token punctuation">:</span> <span class="token builtin">float</span>
    
    <span class="token comment"># The radius for beginning to slow down.</span>
    slowRadius<span class="token punctuation">:</span> <span class="token builtin">float</span>
    
    <span class="token comment"># The time over which to achieve target speed.</span>
    timeToTarget<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">0.1</span>
    
    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> SteeringOutput<span class="token punctuation">:</span>
        result <span class="token operator">=</span> new SteeringOutput<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment"># Get the direction to the target.</span>
        direction <span class="token operator">=</span> target<span class="token punctuation">.</span>position <span class="token operator">-</span> character<span class="token punctuation">.</span>position
        distance <span class="token operator">=</span> direction<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment"># Check if we are there, return no steering.</span>
        <span class="token keyword">if</span> distance <span class="token operator">&lt;</span> targetRadius<span class="token punctuation">:</span>
            <span class="token keyword">return</span> null
        
        <span class="token comment"># If we are outside the slowRadius, then move at max speed.</span>
        <span class="token keyword">if</span> distance <span class="token operator">&gt;</span> slowRadius<span class="token punctuation">:</span>
            targetSpeed <span class="token operator">=</span> maxSpeed
        <span class="token comment"># Otherwise calculate a scaled speed.</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            targetSpeed <span class="token operator">=</span> maxSpeed <span class="token operator">*</span> distance <span class="token operator">/</span> slowRadius
        
        <span class="token comment"># The target velocity combines speed and direction</span>
        targetVelocity <span class="token operator">=</span> direction
        targetVelocity<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span><span class="token punctuation">)</span>
        targetVelocity <span class="token operator">*=</span> targetSpeed
        
        <span class="token comment"># Acceleration tries to get to the target velocity.</span>
        result<span class="token punctuation">.</span>linear <span class="token operator">=</span> targetVelocity <span class="token operator">-</span> character<span class="token punctuation">.</span>velocity
        result<span class="token punctuation">.</span>linear <span class="token operator">/=</span> timeToTarget
        
        <span class="token comment"># Check if the acceleration is too fast.</span>
        <span class="token keyword">if</span> result<span class="token punctuation">.</span>linear<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> maxAcceleration<span class="token punctuation">:</span>
            result<span class="token punctuation">.</span>linear<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span><span class="token punctuation">)</span>
            result<span class="token punctuation">.</span>linear <span class="token operator">*=</span> maxAcceleration
        
        result<span class="token punctuation">.</span>angular <span class="token operator">=</span> <span class="token number">0</span>

        <span class="token keyword">return</span> result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在很多实现中并没有使用到大圈这种方式，因为在减速是会有震荡的可能性</p><h3 id="align" tabindex="-1"><a class="header-anchor" href="#align" aria-hidden="true">#</a> ALIGN</h3><p>对齐使角色的转向与目标的转向相匹配。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Align</span><span class="token punctuation">:</span>
    character<span class="token punctuation">:</span> Kinematic
    target<span class="token punctuation">:</span> Kinematic

    maxAngularAcceleration<span class="token punctuation">:</span> <span class="token builtin">float</span>
    maxRotation<span class="token punctuation">:</span> <span class="token builtin">float</span>

    <span class="token comment"># The radius for arriving at the target.</span>
    targetRadius<span class="token punctuation">:</span> <span class="token builtin">float</span>

    <span class="token comment"># The radius for beginning to slow down.</span>
    slowRadius<span class="token punctuation">:</span> <span class="token builtin">float</span>

    <span class="token comment"># The time over which to achieve target speed.</span>
    timeToTarget<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">0.1</span>

    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> SteeringOutput<span class="token punctuation">:</span>
    result <span class="token operator">=</span> new SteeringOutput<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># Get the naive direction to the target.</span>
    rotation <span class="token operator">=</span> target<span class="token punctuation">.</span>orientation <span class="token operator">-</span> character<span class="token punctuation">.</span>orientation

    <span class="token comment"># Map the result to the (-pi, pi) interval.</span>
    rotation <span class="token operator">=</span> mapToRange<span class="token punctuation">(</span>rotation<span class="token punctuation">)</span>
    rotationSize <span class="token operator">=</span> <span class="token builtin">abs</span><span class="token punctuation">(</span>rotation<span class="token punctuation">)</span>

    <span class="token comment"># Check if we are there, return no steering.</span>
    <span class="token keyword">if</span> rotationSize <span class="token operator">&lt;</span> targetRadius<span class="token punctuation">:</span>
        <span class="token keyword">return</span> null

    <span class="token comment"># If we are outside the slowRadius, then use maximum  tation.</span>
    <span class="token keyword">if</span> rotationSize <span class="token operator">&gt;</span> slowRadius<span class="token punctuation">:</span>
        targetRotation <span class="token operator">=</span> maxRotation
     <span class="token comment"># Otherwise calculate a scaled rotation.</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        targetRotation <span class="token operator">=</span> maxRotation <span class="token operator">*</span> rotationSize <span class="token operator">/</span> slowRadius

    <span class="token comment"># The final target rotation combines speed (already inthe</span>
    <span class="token comment"># variable) and direction.</span>
    targetRotation <span class="token operator">*=</span> rotation <span class="token operator">/</span> rotationSize

    <span class="token comment"># Acceleration tries to get to the target rotation.</span>
    result<span class="token punctuation">.</span>angular <span class="token operator">=</span> targetRotation <span class="token operator">-</span> character<span class="token punctuation">.</span>rotation
    result<span class="token punctuation">.</span>angular <span class="token operator">/=</span> timeToTarget

    <span class="token comment"># Check if the acceleration is too great.</span>
    angularAcceleration <span class="token operator">=</span> <span class="token builtin">abs</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>angular<span class="token punctuation">)</span>
    <span class="token keyword">if</span> angularAcceleration <span class="token operator">&gt;</span> maxAngularAcceleration<span class="token punctuation">:</span>
        result<span class="token punctuation">.</span>angular <span class="token operator">/=</span> angularAcceleration
        result<span class="token punctuation">.</span>angular <span class="token operator">*=</span> maxAngularAcceleration

    result<span class="token punctuation">.</span>linear <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">return</span> result

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="velocity-matching" tabindex="-1"><a class="header-anchor" href="#velocity-matching" aria-hidden="true">#</a> VELOCITY MATCHING</h3><p>把角色的速度与目标的数据设置为一样</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">VelocityMatch</span><span class="token punctuation">:</span>
    character<span class="token punctuation">:</span> Kinematic
    target<span class="token punctuation">:</span> Kinematic

    maxAcceleration<span class="token punctuation">:</span> <span class="token builtin">float</span>

    <span class="token comment"># The time over which to achieve target speed.</span>
    timeToTarget <span class="token operator">=</span> <span class="token number">0.1</span>

    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> SteeringOutput<span class="token punctuation">:</span>
        result <span class="token operator">=</span> new SteeringOutput<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment"># Acceleration tries to get to the target velocity.</span>
        result<span class="token punctuation">.</span>linear <span class="token operator">=</span> target<span class="token punctuation">.</span>velocity <span class="token operator">-</span> character<span class="token punctuation">.</span>velocity
        result<span class="token punctuation">.</span>linear <span class="token operator">/=</span> timeToTarget

        <span class="token comment"># Check if the acceleration is too fast.</span>
        <span class="token keyword">if</span> result<span class="token punctuation">.</span>linear<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> maxAcceleration<span class="token punctuation">:</span>
            result<span class="token punctuation">.</span>linear<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span><span class="token punctuation">)</span>
            result<span class="token punctuation">.</span>linear <span class="token operator">*=</span> maxAcceleration

        result<span class="token punctuation">.</span>angular <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">return</span> result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="face" tabindex="-1"><a class="header-anchor" href="#face" aria-hidden="true">#</a> FACE</h3><p>这个行为使角色看向目标,他委托对齐行为但是先计算目标的方向。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Face</span> extends Align<span class="token punctuation">:</span>
    <span class="token comment"># Overrides the Align.target member.</span>
    target<span class="token punctuation">:</span> Kinematic

    <span class="token comment"># ... Other data is derived from the superclass ...</span>

    <span class="token comment"># Implemented as it was in Pursue.</span>
    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> SteeringOutput<span class="token punctuation">:</span>
    <span class="token comment"># 1. Calculate the target to delegate to align</span>
    Work out the direction to target<span class="token punctuation">.</span>
    direction <span class="token operator">=</span> target<span class="token punctuation">.</span>position <span class="token operator">-</span> character<span class="token punctuation">.</span>position

    <span class="token comment"># Check for a zero direction, and make no change if so.</span>
    <span class="token keyword">if</span> direction<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> target

    <span class="token comment"># 2. Delegate to align.</span>
    Align<span class="token punctuation">.</span>target <span class="token operator">=</span> explicitTarget
    Align<span class="token punctuation">.</span>target<span class="token punctuation">.</span>orientation <span class="token operator">=</span> atan2<span class="token punctuation">(</span><span class="token operator">-</span>direction<span class="token punctuation">.</span>x<span class="token punctuation">,</span> direction<span class="token punctuation">.</span>z<span class="token punctuation">)</span>
    <span class="token keyword">return</span> Align<span class="token punctuation">.</span>getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="looking-where-you-re-going" tabindex="-1"><a class="header-anchor" href="#looking-where-you-re-going" aria-hidden="true">#</a> LOOKING WHERE YOU\`RE GOING</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code> <span class="token keyword">class</span> <span class="token class-name">LookWhereYoureGoing</span> extends Align<span class="token punctuation">:</span>
    <span class="token comment"># No need for an overridden target member, we have</span>
    <span class="token comment"># no explicit target to set.</span>

    <span class="token comment"># ... Other data is derived from the superclass ...</span>

    function getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> SteeringOutput<span class="token punctuation">:</span>
        <span class="token comment"># 1. Calculate the target to delegate to align</span>
        <span class="token comment"># Check for a zero direction, and make no change if so.</span>
        velocity<span class="token punctuation">:</span> Vector <span class="token operator">=</span> character<span class="token punctuation">.</span>velocity
        <span class="token keyword">if</span> velocity<span class="token punctuation">.</span>length<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> null

        <span class="token comment"># Otherwise set the target based on the velocity.</span>
        target<span class="token punctuation">.</span>orientation <span class="token operator">=</span> atan2<span class="token punctuation">(</span><span class="token operator">-</span>velocity<span class="token punctuation">.</span>x<span class="token punctuation">,</span> velocity<span class="token punctuation">.</span>z<span class="token punctuation">)</span>

        <span class="token comment"># 2. Delegate to align.</span>
        <span class="token keyword">return</span> Align<span class="token punctuation">.</span>getSteering<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wander" tabindex="-1"><a class="header-anchor" href="#wander" aria-hidden="true">#</a> WANDER</h3>`,37),l=[p];function c(r,u){return s(),a("div",null,l)}const m=n(o,[["render",c],["__file","Movement.html.vue"]]);export{m as default};
