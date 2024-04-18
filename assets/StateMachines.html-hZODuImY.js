import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as s,e}from"./app-_BRcm9gM.js";const t="/assets/20211117115116-SeoJ0LsB.png",i={},c=e('<h1 id="state-machines" tabindex="-1"><a class="header-anchor" href="#state-machines" aria-hidden="true">#</a> State Machines</h1><p>AI角色在游戏中一般都是一直做一样的事情，直到收到某个信息才会改变角色现在做的事情。这我们就可以使用状态机来制作。</p><h3 id="a-basic-state-machine" tabindex="-1"><a class="header-anchor" href="#a-basic-state-machine" aria-hidden="true">#</a> A Basic State Machine</h3><p>在一个状态中每个角色都有一个状态变量。一个行为对应着一个状态，并且有一系列的条件。当满足状态切换条件时，这个叫做<code>触发（trigger）</code>,当切换到一个新的状态时，这叫<code>激活（fired）</code></p><figure><img src="'+t+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图展示了一个简单的状态机：巡逻，战斗，逃跑。每个状态都有自己的一些条件。</p><h3 id="finite-state-machines" tabindex="-1"><a class="header-anchor" href="#finite-state-machines" aria-hidden="true">#</a> Finite State Machines</h3><p>有限状态机就是一般状态机。</p><h2 id="the-problem" tabindex="-1"><a class="header-anchor" href="#the-problem" aria-hidden="true">#</a> The Problem</h2><p>我们想要一个支持具有任何类型转换条件的任意状态机的一般系统。状态机将符合上述结构，并且同一时刻只占据一种状态。</p><h2 id="the-algorithm" tabindex="-1"><a class="header-anchor" href="#the-algorithm" aria-hidden="true">#</a> The Algorithm</h2><p>为了实现这个，我们可以使用一个通用的状态接口，并且状态中用条件。一个状态机有着一些可能进入的状态和记录着当前的状态。</p><p>在每一帧我们就更新状态机，状态机去更新当前状态，从而检测是否切换状态。</p><h2 id="pseudo-code" tabindex="-1"><a class="header-anchor" href="#pseudo-code" aria-hidden="true">#</a> Pseudo-code</h2><p>这里我们一帧去检测当前状态是已经被切换了，并且调佣特定的切换的方法。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">StateMachine</span><span class="token punctuation">:</span>
    <span class="token comment"># We’re in one state at a time.</span>
    initialState<span class="token punctuation">:</span> State
    currentState<span class="token punctuation">:</span> State <span class="token operator">=</span> initialState
    targetState<span class="token punctuation">:</span> State

    <span class="token comment"># transfrom to next state </span>
    function transitionTo<span class="token punctuation">(</span>state<span class="token punctuation">)</span>
        targetState <span class="token operator">=</span>  state

    <span class="token comment"># Checks and applies transitions, returning current state actions.</span>
    function update<span class="token punctuation">(</span><span class="token punctuation">)</span> 
        currentState<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">if</span> targetState ! <span class="token operator">=</span> null then
            executeStateTransition<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># execute transition</span>
    funtion executeStateTransition<span class="token punctuation">(</span><span class="token punctuation">)</span>
        currentState<span class="token punctuation">.</span>exit<span class="token punctuation">(</span><span class="token punctuation">)</span>
        currentState <span class="token operator">=</span> targetState
        currentState<span class="token punctuation">.</span>OnTransitionTo <span class="token operator">=</span> transitionTo
        currentState<span class="token punctuation">.</span>entry<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="data-structures-and-interfaces" tabindex="-1"><a class="header-anchor" href="#data-structures-and-interfaces" aria-hidden="true">#</a> Data Structures and Interfaces</h2><p>状态的接口：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">IState</span><span class="token punctuation">:</span>
    Action<span class="token operator">&lt;</span>IState<span class="token operator">&gt;</span> OnTransitionTo
    function entry<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment"># do state actions</span>
    function update<span class="token punctuation">(</span><span class="token punctuation">)</span>
    function exit<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="weaknesses" tabindex="-1"><a class="header-anchor" href="#weaknesses" aria-hidden="true">#</a> Weaknesses</h2><p>TODO： 腾讯课程</p>`,21),o=[c];function p(r,l){return a(),s("div",null,o)}const h=n(i,[["render",p],["__file","StateMachines.html.vue"]]);export{h as default};
