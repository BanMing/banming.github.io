const n=JSON.parse('{"key":"v-168ba7fe","path":"/Basic/language/Cplusplus/vector.html","title":"Vector","lang":"en-US","frontmatter":{"date":"2023-03-16T07:51:44.000Z","tag":["C++"]},"headers":[{"level":2,"title":"emplace_back","slug":"emplace-back","link":"#emplace-back","children":[]}],"git":{"createdTime":1699280150000,"updatedTime":1707212881000,"contributors":[{"name":"BanMing","email":"ban-ming@foxmail.com","commits":3},{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":2}]},"readingTime":{"minutes":0.48,"words":143},"filePathRelative":"Basic/language/Cplusplus/vector.md","localizedDate":"March 16, 2023","excerpt":"<h1> Vector</h1>\\n<h2> emplace_back</h2>\\n<p>使用 <code>emplace_back</code> 添加数列中的元数可以减少复制构造函数的调用。但是前提是传入的是该数组类型构造函数的参数。例如：</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Vertex</span>\\n<span class=\\"token punctuation\\">{</span>\\n<span class=\\"token keyword\\">private</span><span class=\\"token operator\\">:</span>\\n    <span class=\\"token keyword\\">int</span> x<span class=\\"token punctuation\\">,</span> y<span class=\\"token punctuation\\">,</span> z<span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n    <span class=\\"token function\\">Vertex</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> a<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> b<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> c<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">:</span> <span class=\\"token function\\">x</span><span class=\\"token punctuation\\">(</span>a<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> <span class=\\"token function\\">y</span><span class=\\"token punctuation\\">(</span>b<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> <span class=\\"token function\\">z</span><span class=\\"token punctuation\\">(</span>c<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token function\\">Vertex</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">const</span> Vertex <span class=\\"token operator\\">&amp;</span>other<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"Copy!!!\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">Run</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>vector<span class=\\"token operator\\">&lt;</span>Vertex<span class=\\"token operator\\">&gt;</span> vertices<span class=\\"token punctuation\\">;</span>\\n    \\n    <span class=\\"token comment\\">// 该方式复制6次</span>\\n    <span class=\\"token comment\\">// vertices.push_back(Vertex(1, 2, 3));</span>\\n    <span class=\\"token comment\\">// vertices.push_back(Vertex(4, 5, 6));</span>\\n    <span class=\\"token comment\\">// vertices.push_back(Vertex(7, 8, 9));</span>\\n    \\n    <span class=\\"token comment\\">// 以下方式无复制</span>\\n    vertices<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">reserve</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    vertices<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">emplace_back</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    vertices<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">emplace_back</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">4</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    vertices<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">emplace_back</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">5</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{n as data};