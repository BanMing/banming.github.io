import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as e,c as s,b as a}from"./app-tOoxT-3I.js";const i={},l=a(`<h1 id="visual-studio" tabindex="-1"><a class="header-anchor" href="#visual-studio" aria-hidden="true">#</a> Visual Studio</h1><h2 id="templateclass" tabindex="-1"><a class="header-anchor" href="#templateclass" aria-hidden="true">#</a> TemplateClass</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">/******************************************************************
** $safeitemrootname$.cpp
** @Author       : BanMing 
** @Date         : $time$
** @Description  : 
*******************************************************************/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-csharp line-numbers-mode" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">/******************************************************************
** @File         : $FILE_BASE$.$FILE_EXT$
** @Author       : BanMing 
** @Date         : $DATE$
** @Description  : 
*******************************************************************/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重置编辑器" tabindex="-1"><a class="header-anchor" href="#重置编辑器" aria-hidden="true">#</a> 重置编辑器</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>devenv.exe /resetsettings
devenv.exe /resetuserdata
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="输出在debug面板" tabindex="-1"><a class="header-anchor" href="#输出在debug面板" aria-hidden="true">#</a> 输出在debug面板</h2><p>使用函数：<code>OutputDebugString</code></p><h2 id="incredibuild" tabindex="-1"><a class="header-anchor" href="#incredibuild" aria-hidden="true">#</a> Incredibuild</h2><div class="language-log line-numbers-mode" data-ext="log"><pre class="language-log"><code><span class="token separator comment">--------------------</span>Build System Warning<span class="token separator comment">---------------------------------------</span>
<span class="token property">Checking MSBuild version:</span>
    <span class="token property">Cannot load version info from:</span> �l�R�ct Visual Studio Solution File<span class="token punctuation">,</span> Format VersionMSBuild\\Current\\Bin\\amd64\\<span class="token punctuation">,</span> Error<span class="token operator">:</span> <span class="token number">123</span>

<span class="token separator comment">-------------------------------------------------------------------------------</span>
<span class="token separator comment">--------------------</span>Build System Warning<span class="token separator comment">---------------------------------------</span>
<span class="token property">Visual Studio does not include an English language pack:</span>
    This version of Visual Studio does not include a built<span class="token operator">-</span>in English language pack<span class="token punctuation">.</span>
    
    For the best Incredibuild experience<span class="token punctuation">,</span> it is highly recommended to install a Visual Studio English language pack<span class="token punctuation">.</span>

<span class="token separator comment">-------------------------------------------------------------------------------</span>
 
<span class="token property">Build ID:</span> <span class="token operator">{</span><span class="token uuid constant">184494E3-2125-4767-B661-F6D0037AE45A</span><span class="token operator">}</span>
 
<span class="token property">Active code page:</span> <span class="token number">437</span>
The filename<span class="token punctuation">,</span> directory name<span class="token punctuation">,</span> or volume label syntax is incorrect<span class="token punctuation">.</span>
 
<span class="token number">2</span> build system warning<span class="token operator">(</span>s<span class="token operator">)</span><span class="token operator">:</span>
   <span class="token operator">-</span> Checking MSBuild version
   <span class="token operator">-</span> Visual Studio does not include an English language pack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方案：</p><ul><li>On your machine, in the Window Search, type in Region</li><li>A window should appear, go to the Administrative tab</li><li>A Region Settings window will pop up, ensure the Current system locale is English (United States), and the checkbox is uncheck for &#39;Beta: Use Unicode UTF-8 for worldwide language support&#39;. See screenshot below as reference.</li><li>You can try a build to see if this takes away the messages, but a machine restart may be needed after making any changes.</li></ul><p>https://stackoverflow.com/questions/77229261/incredibuild-add-in-fails-to-build-c-solution-in-visual-studio</p>`,13),t=[l];function d(r,o){return e(),s("div",null,t)}const p=n(i,[["render",d],["__file","VisualStudio.html.vue"]]);export{p as default};
