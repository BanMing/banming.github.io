import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,a as i,o as a}from"./app-C7htUUIB.js";const r={};function p(o,e){return a(),n("div",null,e[0]||(e[0]=[i('<h1 id="optimizing-the-animation-pipeline" tabindex="-1"><a class="header-anchor" href="#optimizing-the-animation-pipeline"><span>Optimizing the Animation Pipeline</span></a></h1><h2 id="pre-generating-the-skin-matrix" tabindex="-1"><a class="header-anchor" href="#pre-generating-the-skin-matrix"><span>Pre-generating the skin matrix</span></a></h2><p>顶点着色器的最大的问题是系统会占用大量的<code>Uniform</code>槽位。我们可以把<code>pose matrix</code>和<code>inverse bind pose</code>在CPU中计算好了再传入。这样我们就可以节约很多槽位（480个）。</p><p>我们可以统一先计算这两个矩阵相乘，然后修改CPU和GPU蒙皮的实现，使他们连个传入的参数都为这两个矩阵相乘。</p><h2 id="storing-the-skin-pallette-in-a-texture" tabindex="-1"><a class="header-anchor" href="#storing-the-skin-pallette-in-a-texture"><span>Storing the skin pallette in a texture</span></a></h2><p>我们可以使用<code>FLOAT32</code>的贴图来储存动画矩阵，这种贴图每个顶点中的每个元素都可以拥有32位的浮点数。我们可以把动画矩阵转存到贴图中去，然后在顶点函数中进行采样即可。这种方式我们可以减少槽位道一个。但是他的缺点也很明显就是速度。使用采样的速度比直接使用数组查询会慢很多。</p><h2 id="faster-sampling" tabindex="-1"><a class="header-anchor" href="#faster-sampling"><span>Faster sampling</span></a></h2><p>因为我们在对每个<code>Track</code>采样时，在给定时间后需要去定位这个时间是属于哪个<code>Frame</code>中的，然后对其插值。这样的话我们就需要去遍历整个<code>Frame</code>列表去找到合适两帧去插值。这个遍历就非常的消耗，因为我们需要对每个骨骼做这个操作。当这个动画切片时间非常长时，这个循环就会非常的久。</p><p>我们可以把所有<code>Frame</code>做归一化。把整个列表映射到一个固定的时间间隔的查询表中。比如说我们假设每秒钟采样60次，那么我们的时间键可以1/60，然后新建一个以1/60时间为间隔的列表，把<code>Frame</code>列表映射到这个列表中。</p><h2 id="the-pose-palette-generation" tabindex="-1"><a class="header-anchor" href="#the-pose-palette-generation"><span>The Pose palette generation</span></a></h2><p>在求得一个姿势的系列矩阵时，我们需要把每个节点的<code>Transform</code>转换为矩阵，同时他是世界坐标的，所以我们就需要把本地的转化为世界空间中。</p><p>在从本地空间转化到世界空间时，我们需要对每个节点迭代他的父节点，直到父节点为根节点时。</p><p>这个计算是有一点浪费的，我们遍历可能会多次计算同一个父节点。</p><p>如果说计算节点从骨骼的根节点计算到尾节点，也就是从上到下依次每层来计算。这样在计算时，我们就不需要每次重新计算当前节点的父节点的世界空间，因为之前我们就计算过了。</p><p>我们可以使用缓存世界空间的方式来做，可以分两个循环来做，第一个循环找到和缓存世界矩阵。如果节点的父节点的索引小于节点的索引，说明我们之前计算过这个父节点的世界矩阵，反之我们就需要跳出第一个循环。</p><p>第二循环是使用原来的方式跌代求每个节点的世界矩阵。</p><p>这个方式的前提就是需要我们把越上层的父节放在数组的越前面。</p><h2 id="exploring-pose-getglobaltransform" tabindex="-1"><a class="header-anchor" href="#exploring-pose-getglobaltransform"><span>Exploring Pose::GetGlobalTransform</span></a></h2><p>因为我们随时都可能获取一个节点的世界坐标，所以我们可以设置两个数组来缓存世界坐标，一个存储世界坐标，一个存储标记当前节点是否需要更新世界坐标。</p><p>这种做法唯一的缺点就是会增加大量的内存。</p><p>这里的的优化只适用于有很多关键帧的动画。如果帧少的话我们可以使用二分查找。</p>',21)]))}const m=t(r,[["render",p],["__file","OptimizePipeline.html.vue"]]),c=JSON.parse('{"path":"/Animation/gameOpenGL/OptimizePipeline.html","title":"Optimizing the Animation Pipeline","lang":"en-US","frontmatter":{"date":"2022-04-15T08:25:47.000Z","tag":["Animation"],"order":11},"headers":[{"level":2,"title":"Pre-generating the skin matrix","slug":"pre-generating-the-skin-matrix","link":"#pre-generating-the-skin-matrix","children":[]},{"level":2,"title":"Storing the skin pallette in a texture","slug":"storing-the-skin-pallette-in-a-texture","link":"#storing-the-skin-pallette-in-a-texture","children":[]},{"level":2,"title":"Faster sampling","slug":"faster-sampling","link":"#faster-sampling","children":[]},{"level":2,"title":"The Pose palette generation","slug":"the-pose-palette-generation","link":"#the-pose-palette-generation","children":[]},{"level":2,"title":"Exploring Pose::GetGlobalTransform","slug":"exploring-pose-getglobaltransform","link":"#exploring-pose-getglobaltransform","children":[]}],"git":{"createdTime":1649982347000,"updatedTime":1707215246000,"contributors":[{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":3},{"name":"BanMing","email":"ban-ming@foxmail.com","commits":2}]},"readingTime":{"minutes":3.11,"words":932},"filePathRelative":"Animation/gameOpenGL/OptimizePipeline.md","localizedDate":"April 15, 2022","excerpt":"\\n<h2>Pre-generating the skin matrix</h2>\\n<p>顶点着色器的最大的问题是系统会占用大量的<code>Uniform</code>槽位。我们可以把<code>pose matrix</code>和<code>inverse bind pose</code>在CPU中计算好了再传入。这样我们就可以节约很多槽位（480个）。</p>\\n<p>我们可以统一先计算这两个矩阵相乘，然后修改CPU和GPU蒙皮的实现，使他们连个传入的参数都为这两个矩阵相乘。</p>\\n<h2>Storing the skin pallette in a texture</h2>\\n<p>我们可以使用<code>FLOAT32</code>的贴图来储存动画矩阵，这种贴图每个顶点中的每个元素都可以拥有32位的浮点数。我们可以把动画矩阵转存到贴图中去，然后在顶点函数中进行采样即可。这种方式我们可以减少槽位道一个。但是他的缺点也很明显就是速度。使用采样的速度比直接使用数组查询会慢很多。</p>"}');export{m as comp,c as data};