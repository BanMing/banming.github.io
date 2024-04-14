import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as n,b as s}from"./app-gmnTxx6m.js";const t={},o=s(`<h1 id="command-line" tabindex="-1"><a class="header-anchor" href="#command-line" aria-hidden="true">#</a> Command Line</h1><h2 id="读取启动命令行命令" tabindex="-1"><a class="header-anchor" href="#读取启动命令行命令" aria-hidden="true">#</a> 读取启动命令行命令</h2><pre><code>\`\`\`cpp
FString ParameterValue;
if (FParse::Value(FCommandLine::Get(), TEXT(&quot;-LocalClientIndex=&quot;), ParameterValue))
{
	LocalUserIndex = FCString::Atoi((*ParameterValue));
	UE_LOG(LogBalor, Log, TEXT(&quot;Command Line LocalUserIndex@@@@@@: %s &quot;), *ParameterValue);
}
\`\`\`
</code></pre><h2 id="控制台命令行调用" tabindex="-1"><a class="header-anchor" href="#控制台命令行调用" aria-hidden="true">#</a> 控制台命令行调用</h2><p>直接在方法属性中添加<code>Exec</code>即可，在控制台直接使用函数名调用。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token function">UFUNCTION</span><span class="token punctuation">(</span> Exec <span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">Test</span><span class="token punctuation">(</span><span class="token keyword">const</span> FString TestStr<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>多人模式下，服务器可以直接使用函数名调用，客户端需要在函数名前加上<code>ServerExec</code>来调用。</p>`,7),c=[o];function r(d,i){return a(),n("div",null,c)}const u=e(t,[["render",r],["__file","Commandline.html.vue"]]);export{u as default};
