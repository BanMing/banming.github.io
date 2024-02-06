import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as i,b as n}from"./app-5CF5CBXP.js";const s={},d=n(`<h1 id="unreal-park" tabindex="-1"><a class="header-anchor" href="#unreal-park" aria-hidden="true">#</a> Unreal Park</h1><p>https://ue5wiki.com/wiki/35741/</p><p>UnrealPak.exe在<code>Engine\\Binaries\\Win64</code>这其中。</p><p>源码在<code>PakFileUtilities</code>这里面，这里所有的输出路径根节点都是UnrealPak.exe的路径。</p><h2 id="audit" tabindex="-1"><a class="header-anchor" href="#audit" aria-hidden="true">#</a> Audit</h2><p>查看这个包中有那些资源并导出csv。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>UnrealPak &lt;PakFolder&gt; -AuditFiles [-OnlyDeleted] [-CSV=&lt;filename&gt;] [-order=&lt;OrderingFile&gt;] [-SortByOrdering]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Example:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>UnrealPak.exe E:\\Paks -AuditFiles -CSV=audit.csv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="extract" tabindex="-1"><a class="header-anchor" href="#extract" aria-hidden="true">#</a> Extract</h2><p>解压pak文件到某个路径，并且需要生成responsefile后来重新打包。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>UnrealPak &lt;PakFilename&gt; -Extract &lt;ExtractDir&gt; [-Filter=&lt;filename&gt;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Example:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>UnrealPak.exe -Extract E:\\Paks\\pakchunk0-Stadia.pak E:\\Paks\\chunk0 -responsefile= E:\\Paks\\chunk0.response
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="create" tabindex="-1"><a class="header-anchor" href="#create" aria-hidden="true">#</a> Create</h2><p>重新打包资源</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>UnrealPak &lt;PakFilename&gt; -Create=&lt;ResponseFile&gt; [Options]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Example:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>UnrealPak.exe E:\\Paks\\repack\\pakchunk0-Stadia.pak -Create=E:\\Paks\\chunk0.response
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bat line-numbers-mode" data-ext="bat"><pre class="language-bat"><code>@echo off

set Paks_Exe=..\\Engine\\Binaries\\Win64\\UnrealPak-Win64-Test.exe
set Paks_Path=%~dp0WindowsNoEditor\\DH\\Content\\Paks
set CSV_Path=%~dp0audit.csv
set Pak_Name=pakchunk0-WindowsNoEditor.pak
set Chunk_Name=chunk0

%Paks_Exe% %Paks_Path% -AuditFiles -CSV=%CSV_Path%

%Paks_Exe% -Extract %Paks_Path%\\%Pak_Name% %Paks_Path%\\%Chunk_Name% -responseFile=%Paks_Path%\\%Chunk_Name%.response

%Paks_Exe% %Paks_Path%\\%Pak_Name% -Create=%Paks_Path%\\%Chunk_Name%.response

pause
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code></code></pre><div class="line-numbers" aria-hidden="true"></div></div>`,21),t=[d];function r(l,c){return a(),i("div",null,t)}const o=e(s,[["render",r],["__file","UnrealPak.html.vue"]]);export{o as default};
