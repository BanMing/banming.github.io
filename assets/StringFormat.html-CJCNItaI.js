import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as p,o as t}from"./app-C0Rqci91.js";const e="/assets/stringbuilder-DvAdGPiS.png",o="/assets/stringbuilder_const-D03_lZ2W.png",c="/assets/interpolation-DMRYe5DE.png",l="/assets/format-C8Lc89Ft.png",i="/assets/format_const-BarFmh_c.png",u={};function r(k,n){return t(),a("div",null,n[0]||(n[0]=[p(`<h1 id="字符串格式化测试" tabindex="-1"><a class="header-anchor" href="#字符串格式化测试"><span>字符串格式化测试</span></a></h1><p>我们知道使用字符串优化的方式，就是尽量使用<code>StringBuilder</code>来处理需要经常修改的字符串。但是我们平时用到字符串格式化的时候呢？我做了一个测试。</p><h2 id="测试代码" tabindex="-1"><a class="header-anchor" href="#测试代码"><span>测试代码</span></a></h2><p>我们使用 <code>StringBuilder</code>、<code>Static StringBuilder</code>、<code>$</code>、<code>string.Format</code> ，分别调用100000 <code>Format</code> 次查看profile。</p><details><summary> 测试代码 </summary><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProfileTest</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MonoBehaviour</span></span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>StringBuilder</span> _sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> kFormator <span class="token operator">=</span> <span class="token string">&quot;2222 {0}&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _test <span class="token operator">=</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnGUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>GUILayout<span class="token punctuation">.</span><span class="token function">Button</span><span class="token punctuation">(</span><span class="token string">&quot;GC Collect&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            System<span class="token punctuation">.</span>GC<span class="token punctuation">.</span><span class="token function">Collect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>GUILayout<span class="token punctuation">.</span><span class="token function">Button</span><span class="token punctuation">(</span><span class="token string">&quot;StringBuilder&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                _sb<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                _sb<span class="token punctuation">.</span>Length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">                _sb<span class="token punctuation">.</span><span class="token function">AppendFormat</span><span class="token punctuation">(</span><span class="token string">&quot;in {0}&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                _test <span class="token operator">=</span> _sb<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            UnityEditor<span class="token punctuation">.</span>EditorApplication<span class="token punctuation">.</span>isPaused <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>GUILayout<span class="token punctuation">.</span><span class="token function">Button</span><span class="token punctuation">(</span><span class="token string">&quot;StringBuilder Const&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                _sb<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                _sb<span class="token punctuation">.</span>Length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">                _sb<span class="token punctuation">.</span><span class="token function">AppendFormat</span><span class="token punctuation">(</span>kFormator<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                _test <span class="token operator">=</span> _sb<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            UnityEditor<span class="token punctuation">.</span>EditorApplication<span class="token punctuation">.</span>isPaused <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>GUILayout<span class="token punctuation">.</span><span class="token function">Button</span><span class="token punctuation">(</span><span class="token string">&quot;Insert&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                _test <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">$&quot;sssss</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">i</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            UnityEditor<span class="token punctuation">.</span>EditorApplication<span class="token punctuation">.</span>isPaused <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>GUILayout<span class="token punctuation">.</span><span class="token function">Button</span><span class="token punctuation">(</span><span class="token string">&quot;Format&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                _test <span class="token operator">=</span> <span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;sss {0}&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            UnityEditor<span class="token punctuation">.</span>EditorApplication<span class="token punctuation">.</span>isPaused <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>GUILayout<span class="token punctuation">.</span><span class="token function">Button</span><span class="token punctuation">(</span><span class="token string">&quot;Format Const&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                _test <span class="token operator">=</span> <span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span>kFormator<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            UnityEditor<span class="token punctuation">.</span>EditorApplication<span class="token punctuation">.</span>isPaused <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="测试截图" tabindex="-1"><a class="header-anchor" href="#测试截图"><span>测试截图</span></a></h2><h3 id="stringbuilder" tabindex="-1"><a class="header-anchor" href="#stringbuilder"><span>StringBuilder</span></a></h3><figure><img src="`+e+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="stringbuilder-const" tabindex="-1"><a class="header-anchor" href="#stringbuilder-const"><span>StringBuilder Const</span></a></h3><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="interpolation" tabindex="-1"><a class="header-anchor" href="#interpolation"><span>Interpolation</span></a></h3><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="string-format" tabindex="-1"><a class="header-anchor" href="#string-format"><span>String Format</span></a></h3><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="string-format-const" tabindex="-1"><a class="header-anchor" href="#string-format-const"><span>String Format Const</span></a></h3><figure><img src="'+i+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="测试结论" tabindex="-1"><a class="header-anchor" href="#测试结论"><span>测试结论</span></a></h2><table><thead><tr><th>Test</th><th>GC Alloc</th><th>Time ms</th><th>Self ms</th></tr></thead><tbody><tr><td>StringBuilder</td><td>9.3MB</td><td>2235.08</td><td>59.78</td></tr><tr><td>StringBuilder Const</td><td>9.7MB</td><td>2282.98</td><td>61.95</td></tr><tr><td>Interpolation</td><td>9.7MB</td><td>2371.47</td><td>34.99</td></tr><tr><td>String Format</td><td>9.5MB</td><td>2368.92</td><td>34.66</td></tr><tr><td>String Format Const</td><td>9.7MB</td><td>2404.02</td><td>35.21</td></tr></tbody></table><p>我们看到最后一个数据Unity调用的花去的时间，直接使用格式化或者内插花去的时间少于<code>StringBuilder</code>花的时间少一半。但是所有的时间其实差距不是特别大。再从分配堆内存中看<code>StringBuilder</code>最少，但是差距也不是特别大。</p><p>所以：</p><ul><li>最求极致就使用<code>StringBuilder</code></li><li>一般直接使用<code>string.Format</code></li></ul>',21)]))}const m=s(u,[["render",r],["__file","StringFormat.html.vue"]]),b=JSON.parse('{"path":"/Basic/language/CSharp/StringFormat.html","title":"字符串格式化测试","lang":"en-US","frontmatter":{"date":"2021-07-22T17:46:36.000Z","tag":["C#"]},"headers":[{"level":2,"title":"测试代码","slug":"测试代码","link":"#测试代码","children":[]},{"level":2,"title":"测试截图","slug":"测试截图","link":"#测试截图","children":[{"level":3,"title":"StringBuilder","slug":"stringbuilder","link":"#stringbuilder","children":[]},{"level":3,"title":"StringBuilder Const","slug":"stringbuilder-const","link":"#stringbuilder-const","children":[]},{"level":3,"title":"Interpolation","slug":"interpolation","link":"#interpolation","children":[]},{"level":3,"title":"String Format","slug":"string-format","link":"#string-format","children":[]},{"level":3,"title":"String Format Const","slug":"string-format-const","link":"#string-format-const","children":[]}]},{"level":2,"title":"测试结论","slug":"测试结论","link":"#测试结论","children":[]}],"git":{"createdTime":1626947196000,"updatedTime":1707212881000,"contributors":[{"name":"BanMing","email":"ban-ming@foxmail.com","commits":2},{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":2}]},"readingTime":{"minutes":1.26,"words":378},"filePathRelative":"Basic/language/CSharp/StringFormat.md","localizedDate":"July 22, 2021","excerpt":"\\n<p>我们知道使用字符串优化的方式，就是尽量使用<code>StringBuilder</code>来处理需要经常修改的字符串。但是我们平时用到字符串格式化的时候呢？我做了一个测试。</p>\\n<h2>测试代码</h2>\\n<p>我们使用 <code>StringBuilder</code>、<code>Static StringBuilder</code>、<code>$</code>、<code>string.Format</code> ，分别调用100000 <code>Format</code> 次查看profile。</p>\\n<details>\\n<summary> 测试代码  </summary>  \\n<div class=\\"language-csharp line-numbers-mode\\" data-highlighter=\\"prismjs\\" data-ext=\\"cs\\" data-title=\\"cs\\"><pre><code><span class=\\"line\\"><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">ProfileTest</span> <span class=\\"token punctuation\\">:</span> <span class=\\"token type-list\\"><span class=\\"token class-name\\">MonoBehaviour</span></span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">System<span class=\\"token punctuation\\">.</span>Text<span class=\\"token punctuation\\">.</span>StringBuilder</span> _sb <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">System<span class=\\"token punctuation\\">.</span>Text<span class=\\"token punctuation\\">.</span>StringBuilder</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">const</span> <span class=\\"token class-name\\"><span class=\\"token keyword\\">string</span></span> kFormator <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"2222 {0}\\"</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\"><span class=\\"token keyword\\">string</span></span> _test <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">string</span><span class=\\"token punctuation\\">.</span>Empty<span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">    <span class=\\"token keyword\\">private</span> <span class=\\"token return-type class-name\\"><span class=\\"token keyword\\">void</span></span> <span class=\\"token function\\">OnGUI</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span></span>\\n<span class=\\"line\\">    <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>GUILayout<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Button</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"GC Collect\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span></span>\\n<span class=\\"line\\">        <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">            System<span class=\\"token punctuation\\">.</span>GC<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Collect</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">        <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>GUILayout<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Button</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"StringBuilder\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span></span>\\n<span class=\\"line\\">        <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">            <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\"><span class=\\"token keyword\\">int</span></span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">100000</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span></span>\\n<span class=\\"line\\">            <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">                _sb<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Clear</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">                _sb<span class=\\"token punctuation\\">.</span>Length <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">                _sb<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">AppendFormat</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"in {0}\\"</span><span class=\\"token punctuation\\">,</span> i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">                _test <span class=\\"token operator\\">=</span> _sb<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">ToString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">            <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">            UnityEditor<span class=\\"token punctuation\\">.</span>EditorApplication<span class=\\"token punctuation\\">.</span>isPaused <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">        <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>GUILayout<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Button</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"StringBuilder Const\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span></span>\\n<span class=\\"line\\">        <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">            <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\"><span class=\\"token keyword\\">int</span></span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">100000</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span></span>\\n<span class=\\"line\\">            <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">                _sb<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Clear</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">                _sb<span class=\\"token punctuation\\">.</span>Length <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">                _sb<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">AppendFormat</span><span class=\\"token punctuation\\">(</span>kFormator<span class=\\"token punctuation\\">,</span> i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">                _test <span class=\\"token operator\\">=</span> _sb<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">ToString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">            <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">            UnityEditor<span class=\\"token punctuation\\">.</span>EditorApplication<span class=\\"token punctuation\\">.</span>isPaused <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">        <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>GUILayout<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Button</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Insert\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span></span>\\n<span class=\\"line\\">        <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">            <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\"><span class=\\"token keyword\\">int</span></span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">100000</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span></span>\\n<span class=\\"line\\">            <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">                _test <span class=\\"token operator\\">=</span> <span class=\\"token interpolation-string\\"><span class=\\"token string\\">$\\"sssss</span><span class=\\"token interpolation\\"><span class=\\"token punctuation\\">{</span><span class=\\"token expression language-csharp\\">i</span><span class=\\"token punctuation\\">}</span></span><span class=\\"token string\\">\\"</span></span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">            <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">            UnityEditor<span class=\\"token punctuation\\">.</span>EditorApplication<span class=\\"token punctuation\\">.</span>isPaused <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">        <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>GUILayout<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Button</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Format\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span></span>\\n<span class=\\"line\\">        <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">            <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\"><span class=\\"token keyword\\">int</span></span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">100000</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span></span>\\n<span class=\\"line\\">            <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">                _test <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">string</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Format</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"sss {0}\\"</span><span class=\\"token punctuation\\">,</span> i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">            <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">            UnityEditor<span class=\\"token punctuation\\">.</span>EditorApplication<span class=\\"token punctuation\\">.</span>isPaused <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">        <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>GUILayout<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Button</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Format Const\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span></span>\\n<span class=\\"line\\">        <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">            <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\"><span class=\\"token keyword\\">int</span></span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">100000</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span></span>\\n<span class=\\"line\\">            <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">                _test <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">string</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Format</span><span class=\\"token punctuation\\">(</span>kFormator<span class=\\"token punctuation\\">,</span> i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">            <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">            UnityEditor<span class=\\"token punctuation\\">.</span>EditorApplication<span class=\\"token punctuation\\">.</span>isPaused <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">;</span></span>\\n<span class=\\"line\\">        <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">    <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div></details>"}');export{m as comp,b as data};