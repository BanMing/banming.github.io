import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as e,a as s}from"./app-BiyDVjIV.js";const t="/assets/20211108115347-1euTlnL7.png",i="/assets/20211110105040-Dg64bZxG.png",o="/assets/20211110114917-D-KDyebS.png",p="/assets/20211110210140-tDNPUkow.png",c={},l=s('<h1 id="the-pathingfinding-graph" tabindex="-1"><a class="header-anchor" href="#the-pathingfinding-graph"><span>The PathingFinding Graph</span></a></h1><p>寻路都可以使用数据结构图中的一种类型来表示：有方向非负权重图。</p><h2 id="graphs" tabindex="-1"><a class="header-anchor" href="#graphs"><span>GRAPHS</span></a></h2><p>图是有两种元素类型：</p><ul><li>节点：常常被画成点或者圆圈</li><li>连接线：连接点的线 图是由一堆点和一堆先组成的。在寻路里每一个节点代表这一个区域或者位置信息啥的，连接线代表角色可以行走的路径。</li></ul><p>我的寻路就是确定角色当前在那个节点，要去往那个节点，找到怎么从角色节点到目标节点的所有连接线。把所有连接线加起来就是我们的寻路路径。</p><figure><img src="'+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="weghted-graphs" tabindex="-1"><a class="header-anchor" href="#weghted-graphs"><span>WEGHTED GRAPHS</span></a></h3><p>前面我们知道了怎么找到寻路路径，但是路径可能会是有多种方式。那我们如何选出最优的路径呢？</p><p>其中有一种方式就是在每一条连接线上都增加一个数值。这个数值常常叫做<code>权重</code>，有的游戏设计里叫做<code>花销</code>。</p><figure><img src="'+i+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>权重一般代表时间或者距离，当然很多开发者也会把权重的数值设置成一个复合参数，也就是把时间、距离和其他因素混合成一个数值。</p><p>使用权重我们就可以在多个路径中选取权重和最小的路径。</p><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果我们是需要从<code>A</code>点到<code>C</code>点，可以直接看出来有两条路径：</p><ul><li>A -&gt; B -&gt; C : 权重和为9</li><li>A -&gt; D -&gt; B -&gt; C ：权重和为16</li></ul><p>所以我们选择第一个。</p><h3 id="directed-weighted-graphs" tabindex="-1"><a class="header-anchor" href="#directed-weighted-graphs"><span>DIRECTED WEIGHTED GRAPHS</span></a></h3><p>两个节点A,B如果是有连接线联通，在一般的图里既是A可以走到B，B可以走到A。假设有一种情况，角色从二楼直接跳到一楼，但是不能从一楼直接跳到二楼。这个时候的连接线就需要增加一个方向的属性，这样的图可以叫做<code>方向权重图</code>。</p><figure><img src="'+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="data-structure" tabindex="-1"><a class="header-anchor" href="#data-structure"><span>Data Structure</span></a></h3><p>我们可以简单的把图抽象为：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Graph</span><span class="token punctuation">:</span>
    <span class="token comment"># An array of connections outgoing from the given node.</span>
    function getConnections<span class="token punctuation">(</span>fromNode<span class="token punctuation">:</span> Node<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> Connection<span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token keyword">class</span> <span class="token class-name">Connection</span><span class="token punctuation">:</span>
    <span class="token comment"># The node that this connection came from.</span>
    fromNode<span class="token punctuation">:</span> Node
    <span class="token comment"># The node that this connection leads to.</span>
    toNode<span class="token punctuation">:</span> Node

    <span class="token comment"># The non-negative cost of this connection.</span>
    function getCost<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">float</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),r=[l];function d(g,h){return e(),a("div",null,r)}const f=n(c,[["render",d],["__file","PathingFindingGraph.html.vue"]]),v=JSON.parse('{"path":"/Gameplay/AI/PathFinding/PathingFindingGraph.html","title":"The PathingFinding Graph","lang":"en-US","frontmatter":{"date":"2021-11-10T19:26:32.000Z","tag":["Game AI"]},"headers":[{"level":2,"title":"GRAPHS","slug":"graphs","link":"#graphs","children":[{"level":3,"title":"WEGHTED GRAPHS","slug":"weghted-graphs","link":"#weghted-graphs","children":[]},{"level":3,"title":"DIRECTED WEIGHTED GRAPHS","slug":"directed-weighted-graphs","link":"#directed-weighted-graphs","children":[]},{"level":3,"title":"Data Structure","slug":"data-structure","link":"#data-structure","children":[]}]}],"git":{"createdTime":1636543592000,"updatedTime":1707213711000,"contributors":[{"name":"BanMing","email":"ban-ming@foxmail.com","commits":2},{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":2}]},"readingTime":{"minutes":1.91,"words":572},"filePathRelative":"Gameplay/AI/PathFinding/PathingFindingGraph.md","localizedDate":"November 10, 2021","excerpt":"\\n<p>寻路都可以使用数据结构图中的一种类型来表示：有方向非负权重图。</p>\\n<h2>GRAPHS</h2>\\n<p>图是有两种元素类型：</p>\\n<ul>\\n<li>节点：常常被画成点或者圆圈</li>\\n<li>连接线：连接点的线\\n图是由一堆点和一堆先组成的。在寻路里每一个节点代表这一个区域或者位置信息啥的，连接线代表角色可以行走的路径。</li>\\n</ul>\\n<p>我的寻路就是确定角色当前在那个节点，要去往那个节点，找到怎么从角色节点到目标节点的所有连接线。把所有连接线加起来就是我们的寻路路径。</p>\\n<figure><figcaption></figcaption></figure>\\n<h3>WEGHTED GRAPHS</h3>"}');export{f as comp,v as data};