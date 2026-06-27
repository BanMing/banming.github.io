import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as s,f as a,o as i}from"./app-BeQLnLll.js";const l={};function t(o,e){return i(),s("div",null,e[0]||(e[0]=[a(`<h1 id="用-gdk-给-pc-打-msixvc-包" tabindex="-1"><a class="header-anchor" href="#用-gdk-给-pc-打-msixvc-包"><span>用 GDK 给 PC 打 MSIXVC 包</span></a></h1><p>微软商店的 PC 包是 MSIXVC 格式,靠 GDK 里的 MakePkg 工具生成。核心三步:写 <code>MicrosoftGame.config</code>、用 <code>MakePkg genmap</code> 生成 layout、用 <code>MakePkg validate/pack</code> 校验并打包。</p><p>官方文档:<a href="https://learn.microsoft.com/en-us/gaming/gdk/docs/features/common/packaging/overviews/packaging-getting-started-for-pc" target="_blank" rel="noopener noreferrer">https://learn.microsoft.com/en-us/gaming/gdk/docs/features/common/packaging/overviews/packaging-getting-started-for-pc</a></p><div class="hint-container warning"><p class="hint-container-title">Warning</p><ul><li><code>SubmissionValidator.dll</code> 在 <code>GDK\\bin</code> 下。</li><li>要提交给微软的版本,打包前 <code>SubmissionValidator.dll</code> 必须是最新的,去 <a href="https://aka.ms/gdkdl" target="_blank" rel="noopener noreferrer">Xbox Developer Downloads → GDK → Submission Validator</a> 下。</li><li>GDK 装完没有这个 dll 也去同一处下载。</li></ul></div><h2 id="前置检查" tabindex="-1"><a class="header-anchor" href="#前置检查"><span>前置检查</span></a></h2><p>确认目标 Windows 10 版本满足 GDK 的最低要求(比如 GDK Feb 版要求 18362 以上)。查版本:<code>win+R</code> → <code>winver</code>。</p><h2 id="准备内容" tabindex="-1"><a class="header-anchor" href="#准备内容"><span>准备内容</span></a></h2><p>把所有源材料放一个目录,移除不兼容 MSIXVC 或不该进零售包的文件:</p><ul><li>PDB 文件</li><li>UWP/Appx 的 footprint 文件,包括 <code>AppxSignature.p7x</code>、<code>AppxBlockMap.xml</code>(以前发过 UWP 版会带这些,必须删)</li><li>任何指向其他 PC 商店的引用:资源、二进制等</li></ul><h2 id="microsoftgame-config" tabindex="-1"><a class="header-anchor" href="#microsoftgame-config"><span>MicrosoftGame.config</span></a></h2><p>在游戏根目录建 <code>MicrosoftGame.config</code>。从 Partner Center 的 Package Setup → Identity 拿四个值填进去:<code>Package/Identity/Name</code>、<code>Package/Identity/Publisher</code>、<code>Package/Properties/PublisherDisplayName</code>、<code>Store ID</code>。模板:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
<span class="line">&lt;Game configVersion=&quot;0&quot;&gt;</span>
<span class="line"></span>
<span class="line">  &lt;Identity Name=&#39;REPLACE:&lt;Package/Identity/Name&gt;&#39; Version=&quot;0.0.84.0&quot; Publisher=&#39;REPLACE:&lt;Package/Identity/Publisher&gt;&#39; /&gt;</span>
<span class="line">  &lt;TitleId&gt;REPLACE:&lt;Title ID (hexadecimal)&gt;&lt;/TitleId&gt;</span>
<span class="line">  &lt;!-- The fourth digit of the version number is reserved for Microsoft Store use --&gt;</span>
<span class="line">  &lt;!-- Optional: Use StoreId if your product will offer durable DLC packages.</span>
<span class="line">       Look up the Store ID (12 character alphanumeric string) of your main application package. (Example: 9PNX12345AAA)</span>
<span class="line">  --&gt;</span>
<span class="line">  &lt;StoreId&gt;REPLACE:&lt;Store ID&gt;&lt;/StoreId&gt;</span>
<span class="line"></span>
<span class="line">  &lt;!-- Include any additional languages your title supports --&gt;</span>
<span class="line">  &lt;Resources&gt;</span>
<span class="line">    &lt;Resource Language=&quot;en-US&quot; /&gt;</span>
<span class="line">    &lt;Resource Language=&quot;ja-JP&quot; /&gt;</span>
<span class="line">    &lt;Resource Language=&quot;fr-FR&quot; /&gt;</span>
<span class="line">    &lt;Resource Language=&quot;es-ES&quot; /&gt;</span>
<span class="line">    &lt;Resource Language=&quot;de-DE&quot; /&gt;</span>
<span class="line">    &lt;Resource Language=&quot;it-IT&quot; /&gt;</span>
<span class="line">    &lt;Resource Language=&quot;ko-KR&quot; /&gt;</span>
<span class="line">    &lt;Resource Language=&quot;zh-TW&quot; /&gt;</span>
<span class="line">  &lt;/Resources&gt;</span>
<span class="line"></span>
<span class="line">  &lt;ExecutableList&gt;</span>
<span class="line">    &lt;Executable Name=&quot;REPLACE:&lt;Executable Name&gt;&quot;</span>
<span class="line">                Id=&quot;App&quot;</span>
<span class="line">                OverrideDisplayName=&quot;REPLACE&quot;/&gt;</span>
<span class="line">  &lt;/ExecutableList&gt;</span>
<span class="line"></span>
<span class="line">  &lt;!-- Asset sizes: StoreLogo 100x100, Square150x150Logo 150x150,</span>
<span class="line">       Square44x44Logo 44x44, SplashScreenImage 1920x1080 or 3840x2160 --&gt;</span>
<span class="line">  &lt;ShellVisuals DefaultDisplayName=&quot;REPLACE:&lt;Package/Identity/Name&gt;&quot;</span>
<span class="line">                PublisherDisplayName=&quot;REPLACE:&lt;Package/Identity/Publisher&gt;&quot;</span>
<span class="line">                StoreLogo=&quot;StoreLogo.png&quot;</span>
<span class="line">                Square150x150Logo=&quot;Logo.png&quot;</span>
<span class="line">                Square44x44Logo=&quot;SmallLogo.png&quot;</span>
<span class="line">                Description=&quot;REPLACE&quot;</span>
<span class="line">                ForegroundText=&quot;light&quot;</span>
<span class="line">                BackgroundColor=&quot;#464646&quot;</span>
<span class="line">                SplashScreenImage=&quot;SplashScreen.png&quot;/&gt;</span>
<span class="line"></span>
<span class="line">  &lt;DesktopRegistration&gt;</span>
<span class="line">    &lt;!-- 需要首次运行以管理员权限跑自定义安装动作时用 CustomInstallActions,</span>
<span class="line">         指定的 exe 必须放在游戏根目录下的 Installers 文件夹里</span>
<span class="line">    &lt;CustomInstallActions&gt;</span>
<span class="line">      &lt;Folder&gt;Installers&lt;/Folder&gt;</span>
<span class="line">      &lt;InstallActionList&gt;</span>
<span class="line">        &lt;InstallAction File=&quot;CustomInstaller.exe&quot; Name=&quot;UniqueInstallTaskName&quot; Arguments=&quot;/silent /example&quot; /&gt;</span>
<span class="line">      &lt;/InstallActionList&gt;</span>
<span class="line">    &lt;/CustomInstallActions&gt;</span>
<span class="line">    --&gt;</span>
<span class="line">    &lt;DependencyList&gt;</span>
<span class="line">      &lt;!-- 不需要可整段省略;VCLibs 版本以实际为准 --&gt;</span>
<span class="line">      &lt;Dependency Name=&quot;Microsoft.VCLibs.110.00.UWPDesktop&quot; MinVersion=&quot;11.0.61135.0&quot;/&gt;</span>
<span class="line">    &lt;/DependencyList&gt;</span>
<span class="line">    &lt;ProcessorArchitecture&gt;x64&lt;/ProcessorArchitecture&gt;</span>
<span class="line"></span>
<span class="line">    &lt;!-- 启用 mod 时取消注释,Name 改成你游戏唯一的值</span>
<span class="line">    &lt;ModFolder Name=&quot;REPLACE_MyGameName&quot;/&gt; --&gt;</span>
<span class="line"></span>
<span class="line">    &lt;!-- 仅当游戏需要做系统级注册表/文件写入时才取消注释</span>
<span class="line">    &lt;DisableRegistryWriteVirtualization&gt;true&lt;/DisableRegistryWriteVirtualization&gt;</span>
<span class="line">    &lt;DisableFilesystemWriteVirtualization&gt;true&lt;/DisableFilesystemWriteVirtualization&gt;</span>
<span class="line">    --&gt;</span>
<span class="line"></span>
<span class="line">    &lt;!-- 用到 Xbox Live 多人邀请时</span>
<span class="line">    &lt;MultiplayerProtocol&gt;true&lt;/MultiplayerProtocol&gt;</span>
<span class="line">    --&gt;</span>
<span class="line">  &lt;/DesktopRegistration&gt;</span>
<span class="line"></span>
<span class="line">  &lt;!-- 游戏会往安装目录写文件、又改不了源码时</span>
<span class="line">  &lt;ExtendedAttributeList&gt;</span>
<span class="line">    &lt;ExtendedAttribute Name=&quot;RestrictedCapability&quot; Value=&quot;packageWriteRedirectionCompatibilityShim&quot;/&gt;</span>
<span class="line">  &lt;/ExtendedAttributeList&gt;</span>
<span class="line">  --&gt;</span>
<span class="line">&lt;/Game&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="准备图标和-vc-运行库" tabindex="-1"><a class="header-anchor" href="#准备图标和-vc-运行库"><span>准备图标和 VC 运行库</span></a></h2><p>检查包对 Visual C/C++ 运行库的依赖,把它们列进 <code>MicrosoftGame.config</code> 的 DependencyList 或直接拷进 payload。按 ShellVisuals 里列的尺寸,把对应图标放进游戏根目录。</p><h2 id="装-gdk-配-makepkg" tabindex="-1"><a class="header-anchor" href="#装-gdk-配-makepkg"><span>装 GDK,配 MakePkg</span></a></h2><p>GDK 命令提示符默认在 <code>C:\\Program Files (x86)\\Microsoft GDK\\Command Prompts</code>。建议把 <code>C:\\Program Files (x86)\\Microsoft GDK\\bin</code> 加进环境变量 Path。</p><h2 id="生成-layout-映射" tabindex="-1"><a class="header-anchor" href="#生成-layout-映射"><span>生成 layout 映射</span></a></h2><p>在含游戏内容单一目录的上层打开 GDK 命令提示符:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">MakePkg genmap /f layout.xml /d &lt;Your_game_folder&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>layout.xml 的名字随意。注意它不能包含 pdb、UWP footprint 文件或指向其他商店的引用,且必须包含 <code>MicrosoftGame.config</code>、各图标 png(SplashScreen / Logo / SmallLogo / StoreLogo / WideLogo)。生成后可手动调整 Chunk 分组(下例按数据子目录拆 chunk,实现分块流式下载):</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;Package&gt;</span>
<span class="line">  &lt;Chunk Id=&quot;1000&quot; Marker=&quot;Launch&quot;&gt;</span>
<span class="line">    &lt;FileGroup DestinationPath=&quot;\\&quot; Include=&quot;*.dll&quot; SourcePath=&quot;.\\&quot;/&gt;</span>
<span class="line">    &lt;FileGroup DestinationPath=&quot;\\&quot; Include=&quot;*.png&quot; SourcePath=&quot;.\\&quot;/&gt;</span>
<span class="line">    &lt;FileGroup DestinationPath=&quot;\\&quot; Include=&quot;*.exe&quot; SourcePath=&quot;.\\&quot;/&gt;</span>
<span class="line">    &lt;FileGroup DestinationPath=&quot;\\&quot; Include=&quot;*.config&quot; SourcePath=&quot;.\\&quot;/&gt;</span>
<span class="line">    &lt;FileGroup DestinationPath=&quot;\\&quot; Include=&quot;*.dat&quot; SourcePath=&quot;.\\&quot;/&gt;</span>
<span class="line">    &lt;FileGroup DestinationPath=&quot;\\data&quot; SourcePath=&quot;.\\data&quot; Include=&quot;*.*&quot; /&gt;</span>
<span class="line">  &lt;/Chunk&gt;</span>
<span class="line">  &lt;Chunk Id=&quot;1073741823&quot;&gt;</span>
<span class="line">    &lt;FileGroup DestinationPath=&quot;\\&quot; Include=&quot;Update.AlignmentChunk&quot; SourcePath=&quot;.\\&quot;/&gt;</span>
<span class="line">  &lt;/Chunk&gt;</span>
<span class="line">&lt;/Package&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="符号文件" tabindex="-1"><a class="header-anchor" href="#符号文件"><span>符号文件</span></a></h2><p>为了让微软能更好归类 RETAIL 的崩溃 dump,准备一个 symbol 文件夹,打成 zip,包含 exe、dll 以及对应的 pdb。符号文件夹结构要和游戏文件夹一致。</p><h2 id="校验与打包" tabindex="-1"><a class="header-anchor" href="#校验与打包"><span>校验与打包</span></a></h2><p>先 validate,确认 <code>&lt;Output_Folder&gt;</code> 里的 <code>Validator_xxx.xml</code> 没有 <code>&lt;failure&gt;</code> 节点:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">MakePkg validate /f layout.xml /lt /d &lt;Your_game_folder&gt; /nogameos /pc /pd &lt;Output_Folder&gt; /ContentId 00000000-0000-0000-0000-000000000001 /symbolpaths &lt;your_symbol_folder&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>再 pack:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">MakePkg pack /f layout.xml /lt /d &lt;Your_game_folder&gt; /nogameos /pc /pd &lt;Output_Folder&gt; /ContentId 00000000-0000-0000-0000-000000000001 /symbolpaths &lt;your_symbol_folder&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>ContentId 可以换成你自己的 GUID 或整个省略,仅用于开发。算内容更新大小时,比较的两个包必须用同一个 GUID。</p><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>用了 <code>/ContentId</code>,装新版前必须先 <code>wdapp uninstall &lt;Last_Version_package_name&gt;</code> 卸掉旧版。</p></div><h2 id="安装测试" tabindex="-1"><a class="header-anchor" href="#安装测试"><span>安装测试</span></a></h2><p>目标 PC 先开发者模式:设置 → 搜 Developer → Use developer features → Developer mode,等它装完功能。然后:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">Wdapp install &lt;Your_Package.msixvc&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>包必须在本地盘或映射成盘符的网络位置,UNC 共享暂不支持。看不到进度可以去 Microsoft Store 的 Downloads and updates 里看。某些 Insider 版本有 wdapp 不显示进度的 bug,可临时用 PowerShell 的 <code>add-appxpackage &lt;Your_Package.msixvc&gt;</code> 顶一下(但它不支持 Intelligent Delivery 相关特性)。</p><h2 id="提交前最终打包" tabindex="-1"><a class="header-anchor" href="#提交前最终打包"><span>提交前最终打包</span></a></h2><p>之前用 <code>/LT</code> 是开发密钥加密,不能用于提交。最终提交要用 <code>/L</code> 重新打,用唯一密钥加密。这个包不能 sideload 测试,所以要用和 sideload 测试包完全相同的内容来跑。提交校验器过期时去 <a href="http://aka.ms/xgddl" target="_blank" rel="noopener noreferrer">http://aka.ms/xgddl</a>(Xbox One Software → Submission Validator)下最新版。</p><h2 id="几个进阶点" tabindex="-1"><a class="header-anchor" href="#几个进阶点"><span>几个进阶点</span></a></h2><ul><li><strong>写数据</strong>:MSIXVC 是只读卷,存档/设置要写用户 AppData,改不了源码就用 <code>packageWriteRedirectionCompatibilityShim</code> 受限能力自动重定向。</li><li><strong>框架包依赖</strong>:依赖的 redist 若在商店里有框架包(如 <code>Microsoft.DirectXRuntime</code>),用 DependencyList 声明依赖比 chain-install redist 更好,商店能自动更新。</li><li><strong>受限能力</strong>:Mod、CustomInstallActions、关写虚拟化、写安装目录这几类能力,除了配 config,还要邮件你的 Account Manager 开权限。</li></ul>`,38)]))}const r=n(l,[["render",t],["__file","gdk-packaging.html.vue"]]),p=JSON.parse('{"path":"/Tools/Publish/MSStore/gdk-packaging.html","title":"用 GDK 给 PC 打 MSIXVC 包","lang":"en-US","frontmatter":{"date":"2024-07-24T08:12:54.000Z","tag":["MSStore","Publish"]},"git":{"createdTime":1782546800000,"updatedTime":1782546800000,"contributors":[{"name":"BanMing","username":"BanMing","email":"ban-ming@foxmail.com","commits":1,"url":"https://github.com/BanMing"},{"name":"Claude Opus 4.7","username":"Claude Opus 4.7","email":"noreply@anthropic.com","commits":1,"url":"https://github.com/Claude Opus 4.7"}]},"readingTime":{"minutes":4.5,"words":1351},"filePathRelative":"Tools/Publish/MSStore/gdk-packaging.md","localizedDate":"July 24, 2024","excerpt":"\\n<p>微软商店的 PC 包是 MSIXVC 格式,靠 GDK 里的 MakePkg 工具生成。核心三步:写 <code>MicrosoftGame.config</code>、用 <code>MakePkg genmap</code> 生成 layout、用 <code>MakePkg validate/pack</code> 校验并打包。</p>\\n<p>官方文档:<a href=\\"https://learn.microsoft.com/en-us/gaming/gdk/docs/features/common/packaging/overviews/packaging-getting-started-for-pc\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://learn.microsoft.com/en-us/gaming/gdk/docs/features/common/packaging/overviews/packaging-getting-started-for-pc</a></p>"}');export{r as comp,p as data};
