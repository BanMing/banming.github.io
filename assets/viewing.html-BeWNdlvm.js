import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as p}from"./app-C7htUUIB.js";const t={};function o(c,n){return p(),a("div",null,n[0]||(n[0]=[e(`<h1 id="ray-tracing-view-transform" tabindex="-1"><a class="header-anchor" href="#ray-tracing-view-transform"><span>ray tracing view transform</span></a></h1><p>they will project any point on a given pixel’s viewing ray back to that pixel’s position in image space</p><div class="language-cpp line-numbers-mode" data-highlighter="prismjs" data-ext="cpp" data-title="cpp"><pre><code><span class="line"><span class="token keyword">float</span> ndcPixelx <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">0.5f</span> <span class="token operator">+</span> i<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span>scene<span class="token punctuation">.</span>width <span class="token operator">*</span> <span class="token number">1.f</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">float</span> ndcPixely <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">0.5f</span> <span class="token operator">+</span> j<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span>scene<span class="token punctuation">.</span>height <span class="token operator">*</span> <span class="token number">1.f</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// screen [-1,1],keep y &gt; 0  </span></span>
<span class="line"><span class="token comment">// screen orgin is the center </span></span>
<span class="line"><span class="token comment">// ndc、raster orgin is the left-top</span></span>
<span class="line"><span class="token keyword">float</span> screenPixelx <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> ndcPixelx <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">float</span> screenPixely <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">-</span> <span class="token number">2</span> <span class="token operator">*</span> ndcPixely<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// world space</span></span>
<span class="line"><span class="token comment">// camera-to-world matrix</span></span>
<span class="line"><span class="token keyword">float</span> tanFov <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span><span class="token function">tan</span><span class="token punctuation">(</span>scene<span class="token punctuation">.</span>fov <span class="token operator">/</span> <span class="token number">2</span> <span class="token operator">*</span> M_PI <span class="token operator">/</span> <span class="token number">180</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">float</span> cameraPixelx <span class="token operator">=</span> screenPixelx <span class="token operator">*</span> imageAspectRatio <span class="token operator">*</span> tanFov<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">float</span> cameraPixely <span class="token operator">=</span> screenPixely <span class="token operator">*</span> tanFov<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)]))}const r=s(t,[["render",o],["__file","viewing.html.vue"]]),k=JSON.parse('{"path":"/Graphic/basic/raytracing/viewing.html","title":"ray tracing view transform","lang":"en-US","frontmatter":{"date":"2020-10-22T13:46:37.000Z","tag":["Graphic"]},"headers":[],"git":{"createdTime":1603345597000,"updatedTime":1707214279000,"contributors":[{"name":"BanMing","email":"ban-ming@foxmail.com","commits":2},{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":2}]},"readingTime":{"minutes":0.36,"words":107},"filePathRelative":"Graphic/basic/raytracing/viewing.md","localizedDate":"October 22, 2020","excerpt":"\\n<p>they will project any point on\\na given pixel’s viewing ray back to that pixel’s position in image space</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-highlighter=\\"prismjs\\" data-ext=\\"cpp\\" data-title=\\"cpp\\"><pre><code><span class=\\"line\\"><span class=\\"token keyword\\">float</span> ndcPixelx <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0.5f</span> <span class=\\"token operator\\">+</span> i<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">/</span> <span class=\\"token punctuation\\">(</span>scene<span class=\\"token punctuation\\">.</span>width <span class=\\"token operator\\">*</span> <span class=\\"token number\\">1.f</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">float</span> ndcPixely <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0.5f</span> <span class=\\"token operator\\">+</span> j<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">/</span> <span class=\\"token punctuation\\">(</span>scene<span class=\\"token punctuation\\">.</span>height <span class=\\"token operator\\">*</span> <span class=\\"token number\\">1.f</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span class=\\"token comment\\">// screen [-1,1],keep y &gt; 0  </span></span>\\n<span class=\\"line\\"><span class=\\"token comment\\">// screen orgin is the center </span></span>\\n<span class=\\"line\\"><span class=\\"token comment\\">// ndc、raster orgin is the left-top</span></span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">float</span> screenPixelx <span class=\\"token operator\\">=</span> <span class=\\"token number\\">2</span> <span class=\\"token operator\\">*</span> ndcPixelx <span class=\\"token operator\\">-</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">float</span> screenPixely <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span> <span class=\\"token operator\\">-</span> <span class=\\"token number\\">2</span> <span class=\\"token operator\\">*</span> ndcPixely<span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span class=\\"token comment\\">// world space</span></span>\\n<span class=\\"line\\"><span class=\\"token comment\\">// camera-to-world matrix</span></span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">float</span> tanFov <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">float</span><span class=\\"token punctuation\\">)</span><span class=\\"token function\\">tan</span><span class=\\"token punctuation\\">(</span>scene<span class=\\"token punctuation\\">.</span>fov <span class=\\"token operator\\">/</span> <span class=\\"token number\\">2</span> <span class=\\"token operator\\">*</span> M_PI <span class=\\"token operator\\">/</span> <span class=\\"token number\\">180</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">float</span> cameraPixelx <span class=\\"token operator\\">=</span> screenPixelx <span class=\\"token operator\\">*</span> imageAspectRatio <span class=\\"token operator\\">*</span> tanFov<span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">float</span> cameraPixely <span class=\\"token operator\\">=</span> screenPixely <span class=\\"token operator\\">*</span> tanFov<span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\"></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{r as comp,k as data};