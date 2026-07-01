import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as s,f as a,o as i}from"./app-_JojGnWZ.js";const l={};function d(r,e){return i(),s("div",null,e[0]||(e[0]=[a(`<h1 id="p4ignore-与-typemap" tabindex="-1"><a class="header-anchor" href="#p4ignore-与-typemap"><span>P4IGNORE 与 Typemap</span></a></h1><p>新建一个 P4 仓库,头两件要配的事就是 P4IGNORE(别把临时文件、本地配置加进去)和 typemap(让二进制资源加锁、文本文件按文本处理)。这篇把这两块的配置方式和我用的模板攒在一起。</p><h2 id="p4ignore" tabindex="-1"><a class="header-anchor" href="#p4ignore"><span>P4IGNORE</span></a></h2><p>P4IGNORE 只对<strong>正在被 add 的文件</strong>生效,不会忽略已经在 depot 里的文件。</p><h3 id="默认文件名" tabindex="-1"><a class="header-anchor" href="#默认文件名"><span>默认文件名</span></a></h3><p>2023.2 之前的 Helix Core Server 没有默认规则文件名。从 2023.2 起,满足下列条件就会自动查找默认文件名:</p><ul><li>Helix Core Server 2023.2 及以上</li><li>兼容的客户端,比如 2023.2 Server 自带的 p4 client,或 P4V 2023.4 及以上</li></ul><table><thead><tr><th>操作系统</th><th>文件名</th><th>说明</th></tr></thead><tbody><tr><td>全部</td><td><code>.p4ignore</code>、<code>p4ignore.txt</code></td><td>先处理 <code>.p4ignore</code>(如存在),再处理 <code>p4ignore.txt</code></td></tr></tbody></table><p>查看当前机器生效的规则:<code>p4 ignores -v</code>。<br> 改默认文件名:<code>p4 set P4IGNORE=newname.txt</code>。</p><p>参考:<a href="https://www.perforce.com/manuals/cmdref/Content/CmdRef/P4IGNORE.html" target="_blank" rel="noopener noreferrer">P4IGNORE 文档</a>。</p><h3 id="配置-p4ignore" tabindex="-1"><a class="header-anchor" href="#配置-p4ignore"><span>配置 P4IGNORE</span></a></h3><p>通过 P4CONFIG 把 P4IGNORE 指到一个具体文件:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">$ cat ~/.bashrc | grep P4CONFIG</span>
<span class="line">export P4CONFIG=.p4c</span>
<span class="line"></span>
<span class="line">$ cat .p4c | grep P4IGNORE</span>
<span class="line">P4IGNORE=/home/perforce/.p4ignore</span>
<span class="line"></span>
<span class="line">$ p4 set | grep P4IGNORE</span>
<span class="line">P4IGNORE=/home/perforce/.p4ignore (config &#39;/home/perforce/.p4c&#39;)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写一个 ignore 文件验证:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">$ cat /home/perforce/.p4ignore</span>
<span class="line">*.blah</span>
<span class="line">*/#*</span>
<span class="line"></span>
<span class="line">$ p4 add -f \\#pound.txt</span>
<span class="line">//depot/main/release1/perl_proj/%23pound.txt#1 - opened for add</span>
<span class="line">/home/perforce/main/release1/perl_proj/#pound.txt - ignored file can&#39;t be added.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>P4IGNORE 也可以用非绝对路径:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">$ p4 set P4IGNORE=.p4ignore</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这样客户端会从当前工作目录一直往上找到文件系统根目录,把找到的每个 <code>.p4ignore</code> 累加成一套完整的忽略规则。</p><h3 id="查看生效的规则" tabindex="-1"><a class="header-anchor" href="#查看生效的规则"><span>查看生效的规则</span></a></h3><p><code>p4 ignores -v</code> 列出 server 找到的每个 P4IGNORE 文件以及它们各自展开的规则:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">$ p4 ignores -v</span>
<span class="line">#FILE - defaults</span>
<span class="line">#LINE 2:**/.p4root</span>
<span class="line">.../.p4root/...</span>
<span class="line">.../.p4root</span>
<span class="line">#FILE /home/perforce/workspace/.p4ignore</span>
<span class="line">#LINE 2:*/#*</span>
<span class="line">/home/perforce/workspace/.../#*/...</span>
<span class="line">#LINE 1:*.blah</span>
<span class="line">/home/perforce/workspace/....blah/...</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>-i</code> 可以查某个具体文件为什么被忽略,会告诉你是哪一行规则命中的:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">$ p4 ignores -v -i file.d</span>
<span class="line">/home/perforce/workspace/file.d not ignored</span>
<span class="line">$ p4 ignores -v -i file.blah</span>
<span class="line">/home/perforce/workspace/file.blah ignored by /home/perforce/workspace/.p4ignore:1:*.blah</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="规则示例" tabindex="-1"><a class="header-anchor" href="#规则示例"><span>规则示例</span></a></h3><p>忽略 P4IGNORE 和 P4CONFIG 文件本身(P4CONFIG 通常不适用于别人,P4IGNORE 你也未必想共享)。注意从 p4 2015.1 起,P4CONFIG 文件默认被忽略,真想入库可以用 <code>p4 add -I</code>:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">p4ignore.txt</span>
<span class="line">.p4ignore</span>
<span class="line">p4config.txt</span>
<span class="line">.p4config</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>忽略叫 <code>thingy</code> 的文件、<code>.rubbish</code> 后缀的文件,以及 <code>dubious</code> 文件夹的内容:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">thingy.*</span>
<span class="line">*.rubbish</span>
<span class="line">dubious/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>禁掉叫 <code>disallowed</code> 的条目,但允许它名下的文件(也允许名为 <code>disallowed</code> 的文件夹内部):</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">disallowed</span>
<span class="line">!disallowed/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>禁掉根目录的 <code>media</code> 文件夹,但允许出现在更深层的 <code>media</code>:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">!media/</span>
<span class="line">/media/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>这会允许 <code>C:\\p4client\\depot\\deeper\\media\\media-deeper</code>,禁掉 <code>C:\\p4client\\depot\\media\\media-in-root</code>。</p><h3 id="p4v-里启用-p4ignore" tabindex="-1"><a class="header-anchor" href="#p4v-里启用-p4ignore"><span>P4V 里启用 P4IGNORE</span></a></h3><p>从 2012.3 起 P4V 支持 P4IGNORE,通过 <code>p4 reconcile</code> 起作用。前提是 Server 至少 2012.1。配置两步:</p><ol><li>在 client root 建一个文本文件,列出要忽略的类型,文件名随意,建议起 <code>p4ignore.txt</code> 这种有意义的名字。</li><li>设环境变量 <code>p4 set P4IGNORE=p4ignore.txt</code>,然后<strong>重启 P4V</strong> 生效。</li></ol><p><strong>Windows 例子</strong>:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">cd C:\\Perforce</span>
<span class="line">notepad p4ignore.txt</span>
<span class="line">(写入)</span>
<span class="line">*.o</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">p4 set P4IGNORE=C:\\Perforce\\p4ignore.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>关掉再重启 P4V,然后试着在 P4V 里 add 一个 <code>.o</code> 文件,会看到提示 &quot;The following files were not marked for add, since they are &#39;ignored&#39;&quot;。在 Windows 上还可以把 P4V 图标的 &quot;Start in&quot; 目录改成 client workspace root。</p><p><strong>Mac 例子</strong>:Mac 上桌面程序不会启动 shell,所以要靠 <code>p4 set</code> 写进 <code>~/.p4enviro</code> 才能被 P4V 自动读到:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">p4 set P4IGNORE=.p4ignore</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>重启 P4V,选一个含可忽略文件的文件夹右键 &quot;Reconcile Offline Work&quot;,确认这些文件不出现在 &quot;Local Files not in depot&quot; 里。</p><p>参考:<a href="https://portal.perforce.com/s/article/1282" target="_blank" rel="noopener noreferrer">using P4IGNORE with Perforce Helix P4V</a>。</p><h2 id="typemap" tabindex="-1"><a class="header-anchor" href="#typemap"><span>Typemap</span></a></h2><p>typemap 决定每类文件按什么类型入库:文本走 <code>text</code>、二进制走 <code>binary</code>,需要独占编辑的二进制资源加 <code>+l</code>(exclusive lock),保留多版本加 <code>+Sn</code>,可写加 <code>+w</code>。新仓库必配。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">p4 typemap        # 编辑 typemap</span>
<span class="line">p4 typemap -o     # 查看整个 typemap</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ue-仓库的-typemap-charset-unicode" tabindex="-1"><a class="header-anchor" href="#ue-仓库的-typemap-charset-unicode"><span>UE 仓库的 typemap(Charset: Unicode)</span></a></h3><p>这是我给 UE 工程用的一版。<code>.uasset/.umap/.upk</code> 等资源加 <code>+l</code> 独占锁,引擎二进制 <code>.dll/.pdb/.exe</code> 用 <code>+S32</code> 只留最近 32 个版本:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">binary+w //....lib</span>
<span class="line">binary+w //....app</span>
<span class="line">binary+w //....dylib</span>
<span class="line">binary+w //....stub</span>
<span class="line">binary+w //....ipa</span>
<span class="line">binary //....bmp</span>
<span class="line">binary //....dat</span>
<span class="line">text //....ini</span>
<span class="line">text //....config</span>
<span class="line">text //....cpp</span>
<span class="line">text //....h</span>
<span class="line">text //....c</span>
<span class="line">text //....cs</span>
<span class="line">text //....m</span>
<span class="line">text //....mm</span>
<span class="line">text //....py</span>
<span class="line">text //....txt</span>
<span class="line">text //....xml</span>
<span class="line">text //....md</span>
<span class="line">text //....po</span>
<span class="line">text //....html</span>
<span class="line">text //....json</span>
<span class="line">text //....udn</span>
<span class="line">text //....js</span>
<span class="line">text //....hpp</span>
<span class="line">text //....inl</span>
<span class="line">text //....lua</span>
<span class="line">text //....yml</span>
<span class="line">text //....css</span>
<span class="line">text //....usf</span>
<span class="line">text //....ush</span>
<span class="line">text+w //....dll.config</span>
<span class="line">text+w //....exe.config</span>
<span class="line">binary+l //....uasset</span>
<span class="line">binary+l //....umap</span>
<span class="line">binary+l //....upk</span>
<span class="line">binary+l //....udk</span>
<span class="line">binary+l //....ubulk</span>
<span class="line">binary+S32w //....dll</span>
<span class="line">binary+S32w //....pdb</span>
<span class="line">text+S32w //....modules</span>
<span class="line">binary+S32w //....exe</span>
<span class="line">binary+S32w //....target</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完整的 UE 与 Unity typemap 模板,可以参考官方文档:<a href="https://dev.epicgames.com/documentation/en-us/unreal-engine/using-perforce-as-source-control-for-unreal-engine" target="_blank" rel="noopener noreferrer">Using Perforce as source control for Unreal Engine</a>、<a href="https://portal.perforce.com/s/article/15244" target="_blank" rel="noopener noreferrer">Perforce typemap for Unity</a>。</p><h3 id="只保留最近-n-个版本" tabindex="-1"><a class="header-anchor" href="#只保留最近-n-个版本"><span>只保留最近 n 个版本</span></a></h3><p><code>+Sn</code> 让仓库只存某文件最近的 n 个版本(n 取 1-10 或 16/32/64/128/256/512),对会频繁改的大二进制很有用:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">text+k //depot/project/src/....c</span>
<span class="line">text+k //depot/project/src/....h</span>
<span class="line">text   //depot/project/src/....txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,54)]))}const t=n(l,[["render",d],["__file","p4-ignore-typemap.html.vue"]]),o=JSON.parse('{"path":"/Tools/VCS/P4/p4-ignore-typemap.html","title":"P4IGNORE 与 Typemap","lang":"en-US","frontmatter":{"date":"2024-11-06T22:49:53.000Z","tag":["Tools","VCS","Perforce"]},"git":{"createdTime":1782480255000,"updatedTime":1782480255000,"contributors":[{"name":"BanMing","username":"BanMing","email":"ban-ming@foxmail.com","commits":1,"url":"https://github.com/BanMing"},{"name":"Claude Opus 4.7","username":"Claude Opus 4.7","email":"noreply@anthropic.com","commits":1,"url":"https://github.com/Claude Opus 4.7"}]},"readingTime":{"minutes":3.88,"words":1163},"filePathRelative":"Tools/VCS/P4/p4-ignore-typemap.md","localizedDate":"November 6, 2024","excerpt":"\\n<p>新建一个 P4 仓库,头两件要配的事就是 P4IGNORE(别把临时文件、本地配置加进去)和 typemap(让二进制资源加锁、文本文件按文本处理)。这篇把这两块的配置方式和我用的模板攒在一起。</p>\\n<h2>P4IGNORE</h2>\\n<p>P4IGNORE 只对<strong>正在被 add 的文件</strong>生效,不会忽略已经在 depot 里的文件。</p>\\n<h3>默认文件名</h3>\\n<p>2023.2 之前的 Helix Core Server 没有默认规则文件名。从 2023.2 起,满足下列条件就会自动查找默认文件名:</p>\\n<ul>\\n<li>Helix Core Server 2023.2 及以上</li>\\n<li>兼容的客户端,比如 2023.2 Server 自带的 p4 client,或 P4V 2023.4 及以上</li>\\n</ul>"}');export{t as comp,o as data};
