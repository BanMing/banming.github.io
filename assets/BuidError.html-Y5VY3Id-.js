import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-Kx2h4JBD.js";const t={},o=e(`<h1 id="编译报错" tabindex="-1"><a class="header-anchor" href="#编译报错" aria-hidden="true">#</a> 编译报错</h1><div class="language-log line-numbers-mode" data-ext="log"><pre class="language-log"><code>Severity	Code	Description	Project	File	Line	Suppression State
Error	LNK2019	unresolved external symbol _main referenced in function <span class="token string">&quot;int __cdecl invoke_main(void)&quot;</span> <span class="token operator">(</span><span class="token operator">?</span>invoke_main<span class="token operator">@</span><span class="token operator">@</span>YAHXZ<span class="token operator">)</span>	C	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>缺少<code>main</code>函数，加入</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span><span class="token operator">*</span> argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即可</p><hr>`,6),r=[o];function c(p,i){return s(),a("div",null,r)}const u=n(t,[["render",c],["__file","BuidError.html.vue"]]);export{u as default};