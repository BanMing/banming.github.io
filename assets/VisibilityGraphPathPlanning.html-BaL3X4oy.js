import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as i,a as n}from"./app-DjCCowVD.js";const t="/assets/20210730162538-D8HhbZrI.png",l={},o=n('<h1 id="可见性路径规划" tabindex="-1"><a class="header-anchor" href="#可见性路径规划"><span>可见性路径规划</span></a></h1><p>我不知道翻译是不是对的,英文是：<code>Visibility Graph Path Planning</code>，简称：<code>VGAPH</code>。</p><h2 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么"><span>是什么</span></a></h2><p>我们从实际问题出发，如下图，当我们在游戏中需要使一个角色自动从<code>start</code>点移动到<code>goal</code>点并且绕开障碍物，蓝色为障碍物。</p><figure><img src="'+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们第一个想到的使用的方法就是寻路，那么我们说的<code>VGAPH</code>就是一种寻路的策略。</p><h2 id="为什么" tabindex="-1"><a class="header-anchor" href="#为什么"><span>为什么</span></a></h2><p>我们常见的寻路方案中，需要在角色移动或者是在规划路线时检测物理碰撞，从而找到顺畅通过的路线。检测碰撞也是一个比较耗时的工作，如果使用不当的话。 <code>VGAPH</code>这个寻路的方案是直接跳过碰撞检测。</p><h2 id="怎么用" tabindex="-1"><a class="header-anchor" href="#怎么用"><span>怎么用</span></a></h2><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现"><span>实现</span></a></h2><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><p>https://lis.csail.mit.edu/pubs/tlp/collision-free-planning-cacm.pdf</p><p>http://ntur.lib.ntu.edu.tw/bitstream/246246/200704191001565/1/01389835.pdf</p><p>https://github.com/christopher-boustros/Unity-Visibility-Graph-Path-Planning-Simulation</p><p>http://www.ijoar.org/journals/IJOARM/papers/Visibility-Graph-Shortest-Path-in-Polygonal-Arena-Motion-Planning.pdf</p><p>http://lavalle.pl/planning/</p>',16),s=[o];function p(c,r){return i(),e("div",null,s)}const g=a(l,[["render",p],["__file","VisibilityGraphPathPlanning.html.vue"]]),m=JSON.parse('{"path":"/Gameplay/AI/PathFinding/VisibilityGraphPathPlanning.html","title":"可见性路径规划","lang":"en-US","frontmatter":{"date":"2021-07-30T18:44:02.000Z","tag":["Game AI"]},"headers":[{"level":2,"title":"是什么","slug":"是什么","link":"#是什么","children":[]},{"level":2,"title":"为什么","slug":"为什么","link":"#为什么","children":[]},{"level":2,"title":"怎么用","slug":"怎么用","link":"#怎么用","children":[]},{"level":2,"title":"实现","slug":"实现","link":"#实现","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1627641842000,"updatedTime":1707213711000,"contributors":[{"name":"BanMing","email":"ban-ming@foxmail.com","commits":2},{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":2}]},"readingTime":{"minutes":0.81,"words":244},"filePathRelative":"Gameplay/AI/PathFinding/VisibilityGraphPathPlanning.md","localizedDate":"July 30, 2021","excerpt":"\\n<p>我不知道翻译是不是对的,英文是：<code>Visibility Graph Path Planning</code>，简称：<code>VGAPH</code>。</p>\\n<h2>是什么</h2>\\n<p>我们从实际问题出发，如下图，当我们在游戏中需要使一个角色自动从<code>start</code>点移动到<code>goal</code>点并且绕开障碍物，蓝色为障碍物。</p>\\n<figure><figcaption></figcaption></figure>\\n<p>我们第一个想到的使用的方法就是寻路，那么我们说的<code>VGAPH</code>就是一种寻路的策略。</p>"}');export{g as comp,m as data};