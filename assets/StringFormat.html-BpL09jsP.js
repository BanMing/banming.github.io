import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e as t}from"./app-Kx2h4JBD.js";const p="/assets/stringbuilder-7wHRj4kj.png",o="/assets/stringbuilder_const-9N_5Wdlj.png",e="/assets/interpolation-zEWHuQxG.png",i="/assets/format-vC3PPRbX.png",c="/assets/format_const-WqxZof3M.png",l={},u=t(`<h1 id="字符串格式化测试" tabindex="-1"><a class="header-anchor" href="#字符串格式化测试" aria-hidden="true">#</a> 字符串格式化测试</h1><p>我们知道使用字符串优化的方式，就是尽量使用<code>StringBuilder</code>来处理需要经常修改的字符串。但是我们平时用到字符串格式化的时候呢？我做了一个测试。</p><h2 id="测试代码" tabindex="-1"><a class="header-anchor" href="#测试代码" aria-hidden="true">#</a> 测试代码</h2><p>我们使用 <code>StringBuilder</code>、<code>Static StringBuilder</code>、<code>$</code>、<code>string.Format</code> ，分别调用100000 <code>Format</code> 次查看profile。</p><details><summary> 测试代码 </summary><div class="language-csharp line-numbers-mode" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProfileTest</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MonoBehaviour</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>StringBuilder</span> _sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> kFormator <span class="token operator">=</span> <span class="token string">&quot;2222 {0}&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _test <span class="token operator">=</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnGUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>GUILayout<span class="token punctuation">.</span><span class="token function">Button</span><span class="token punctuation">(</span><span class="token string">&quot;GC Collect&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            System<span class="token punctuation">.</span>GC<span class="token punctuation">.</span><span class="token function">Collect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>GUILayout<span class="token punctuation">.</span><span class="token function">Button</span><span class="token punctuation">(</span><span class="token string">&quot;StringBuilder&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                _sb<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                _sb<span class="token punctuation">.</span>Length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                _sb<span class="token punctuation">.</span><span class="token function">AppendFormat</span><span class="token punctuation">(</span><span class="token string">&quot;in {0}&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                _test <span class="token operator">=</span> _sb<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            UnityEditor<span class="token punctuation">.</span>EditorApplication<span class="token punctuation">.</span>isPaused <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>GUILayout<span class="token punctuation">.</span><span class="token function">Button</span><span class="token punctuation">(</span><span class="token string">&quot;StringBuilder Const&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                _sb<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                _sb<span class="token punctuation">.</span>Length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                _sb<span class="token punctuation">.</span><span class="token function">AppendFormat</span><span class="token punctuation">(</span>kFormator<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                _test <span class="token operator">=</span> _sb<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            UnityEditor<span class="token punctuation">.</span>EditorApplication<span class="token punctuation">.</span>isPaused <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>GUILayout<span class="token punctuation">.</span><span class="token function">Button</span><span class="token punctuation">(</span><span class="token string">&quot;Insert&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                _test <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">$&quot;sssss</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">i</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            UnityEditor<span class="token punctuation">.</span>EditorApplication<span class="token punctuation">.</span>isPaused <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>GUILayout<span class="token punctuation">.</span><span class="token function">Button</span><span class="token punctuation">(</span><span class="token string">&quot;Format&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                _test <span class="token operator">=</span> <span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;sss {0}&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            UnityEditor<span class="token punctuation">.</span>EditorApplication<span class="token punctuation">.</span>isPaused <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>GUILayout<span class="token punctuation">.</span><span class="token function">Button</span><span class="token punctuation">(</span><span class="token string">&quot;Format Const&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                _test <span class="token operator">=</span> <span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span>kFormator<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            UnityEditor<span class="token punctuation">.</span>EditorApplication<span class="token punctuation">.</span>isPaused <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="测试截图" tabindex="-1"><a class="header-anchor" href="#测试截图" aria-hidden="true">#</a> 测试截图</h2><h3 id="stringbuilder" tabindex="-1"><a class="header-anchor" href="#stringbuilder" aria-hidden="true">#</a> StringBuilder</h3><figure><img src="`+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="stringbuilder-const" tabindex="-1"><a class="header-anchor" href="#stringbuilder-const" aria-hidden="true">#</a> StringBuilder Const</h3><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="interpolation" tabindex="-1"><a class="header-anchor" href="#interpolation" aria-hidden="true">#</a> Interpolation</h3><figure><img src="'+e+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="string-format" tabindex="-1"><a class="header-anchor" href="#string-format" aria-hidden="true">#</a> String Format</h3><figure><img src="'+i+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="string-format-const" tabindex="-1"><a class="header-anchor" href="#string-format-const" aria-hidden="true">#</a> String Format Const</h3><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="测试结论" tabindex="-1"><a class="header-anchor" href="#测试结论" aria-hidden="true">#</a> 测试结论</h2><table><thead><tr><th>Test</th><th>GC Alloc</th><th>Time ms</th><th>Self ms</th></tr></thead><tbody><tr><td>StringBuilder</td><td>9.3MB</td><td>2235.08</td><td>59.78</td></tr><tr><td>StringBuilder Const</td><td>9.7MB</td><td>2282.98</td><td>61.95</td></tr><tr><td>Interpolation</td><td>9.7MB</td><td>2371.47</td><td>34.99</td></tr><tr><td>String Format</td><td>9.5MB</td><td>2368.92</td><td>34.66</td></tr><tr><td>String Format Const</td><td>9.7MB</td><td>2404.02</td><td>35.21</td></tr></tbody></table><p>我们看到最后一个数据Unity调用的花去的时间，直接使用格式化或者内插花去的时间少于<code>StringBuilder</code>花的时间少一半。但是所有的时间其实差距不是特别大。再从分配堆内存中看<code>StringBuilder</code>最少，但是差距也不是特别大。</p><p>所以：</p><ul><li>最求极致就使用<code>StringBuilder</code></li><li>一般直接使用<code>string.Format</code></li></ul>',21),r=[u];function d(k,m){return s(),a("div",null,r)}const g=n(l,[["render",d],["__file","StringFormat.html.vue"]]);export{g as default};