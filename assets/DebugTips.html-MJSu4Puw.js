import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as n,e as t}from"./app-Kx2h4JBD.js";const i="/assets/2024-01-15-18-05-38-dvs0xIcA.png",s="/assets/2024-01-15-18-41-04-Ru30eTUw.png",l="/assets/2024-01-15-18-47-39-5WrNgs4c.png",o="/assets/2024-01-15-18-55-34-pnG-aQXo.png",d="/assets/2024-01-15-18-57-17-dX3j4yBM.png",c="/assets/2024-01-06-13-23-21-EbOPjd0M.png",r="/assets/2024-01-15-22-44-06-dVOEs1V6.png",p="/assets/2024-01-15-22-44-21-AIYPISR3.png",u="/assets/2024-01-15-22-44-32-SrbEI0rm.png",g="/assets/2024-01-15-22-43-52-6HVUoDZs.png",h="/assets/2024-01-15-22-43-23-WvSgKyoa.png",m="/assets/2024-01-15-22-47-30-xqleFrsQ.png",b="/assets/2024-01-15-23-39-20-I2nrSLlr.png",f="/assets/2024-01-15-23-54-57-Vo5WWEK3.png",k="/assets/2024-01-16-00-12-38-ivbEvcIu.png",x="/assets/2024-01-16-00-13-33-g5AyFggD.png",E="/assets/2024-01-16-00-15-07-MnukSonz.png",_={},v=t('<h1 id="debug-tips" tabindex="-1"><a class="header-anchor" href="#debug-tips" aria-hidden="true">#</a> Debug Tips</h1><h2 id="vs连接编辑器" tabindex="-1"><a class="header-anchor" href="#vs连接编辑器" aria-hidden="true">#</a> VS连接编辑器</h2><p>使用vs打开ue编辑器后，可以使用<code>death process</code>关闭调试，后面需要调试就使用<code>attach process</code>，这里需要选择<code>Native Code</code>。</p><h2 id="蓝图调试器" tabindex="-1"><a class="header-anchor" href="#蓝图调试器" aria-hidden="true">#</a> 蓝图调试器</h2><figure><img src="'+i+`" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure><h2 id="蓝图异常" tabindex="-1"><a class="header-anchor" href="#蓝图异常" aria-hidden="true">#</a> 蓝图异常</h2><h3 id="自动中断" tabindex="-1"><a class="header-anchor" href="#自动中断" aria-hidden="true">#</a> 自动中断</h3><ul><li>编辑器偏好设置-&gt;通用-实验性功能-&gt;蓝图-&gt;异常时中断蓝图</li><li>DefaultEditorPerProjectUserSettings.ini: <ul><li>[/Script/UnrealEd.EditorExperimentalSettings]</li><li>bBreakOnExceptions=True</li></ul></li></ul><h3 id="显示蓝图脚本调用堆栈" tabindex="-1"><a class="header-anchor" href="#显示蓝图脚本调用堆栈" aria-hidden="true">#</a> 显示蓝图脚本调用堆栈</h3><ul><li>DefaultEngine.ini：[Kismet] ScriptStackOnWarnings=true</li><li>添加启动参数：-ScriptStackOnWarning</li></ul><h2 id="在编辑器中调用函数-事件" tabindex="-1"><a class="header-anchor" href="#在编辑器中调用函数-事件" aria-hidden="true">#</a> 在编辑器中调用函数/事件</h2><h3 id="编辑器中调用" tabindex="-1"><a class="header-anchor" href="#编辑器中调用" aria-hidden="true">#</a> 编辑器中调用</h3><ul><li>仅针对<strong>无形参</strong>的函数/事件有效</li><li>C++ 函数在<strong>UFUNCTION</strong>声明中添加标记符<code>CallinEditor</code></li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>	<span class="token function">UFUNCTION</span><span class="token punctuation">(</span>BlueprintCallable<span class="token punctuation">,</span> CallInEditor<span class="token punctuation">,</span> Category <span class="token operator">=</span> <span class="token string">&quot;Default&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">void</span> <span class="token function">TestFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+s+'" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure><h3 id="编辑器工具控件-编辑器工具蓝图" tabindex="-1"><a class="header-anchor" href="#编辑器工具控件-编辑器工具蓝图" aria-hidden="true">#</a> 编辑器工具控件 / 编辑器工具蓝图</h3><ul><li>蓝图函数库（BlueprintFunctionLibrary）</li></ul><h3 id="python" tabindex="-1"><a class="header-anchor" href="#python" aria-hidden="true">#</a> Python</h3><h2 id="打印字符串" tabindex="-1"><a class="header-anchor" href="#打印字符串" aria-hidden="true">#</a> 打印字符串</h2><p>固定屏幕打印字符串的位置：</p><ul><li>使用Key属性替换HUD中已有的Log</li><li>C++下：GEngine-&gt;AddOnScreenDebugMessage</li><li>仅<strong>非Shipping</strong>下有效果</li></ul><figure><img src="'+l+`" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure><h2 id="画线" tabindex="-1"><a class="header-anchor" href="#画线" aria-hidden="true">#</a> 画线</h2><p>在需要进行射线碰撞的地方，使用 <code>DrawDebugLine</code> 函数来绘制射线：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;DrawDebugHelpers.h&quot;</span></span>

FVector StartLocation <span class="token operator">=</span> PlayerCamera<span class="token operator">-&gt;</span><span class="token function">GetComponentLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
FVector EndLocation <span class="token operator">=</span> StartLocation <span class="token operator">+</span> PlayerCamera<span class="token operator">-&gt;</span><span class="token function">GetForwardVector</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> MaxRaycastDistance<span class="token punctuation">;</span>

<span class="token comment">// 绘制射线</span>
<span class="token function">DrawDebugLine</span><span class="token punctuation">(</span><span class="token function">GetWorld</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> StartLocation<span class="token punctuation">,</span> EndLocation<span class="token punctuation">,</span> FColor<span class="token double-colon punctuation">::</span>Green<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>GetWorld()：获取当前场景的世界对象。</li><li>StartLocation 和 EndLocation：射线的起点和终点。</li><li>FColor::Green：指定绘制射线的颜色。</li></ul><p>在 DrawDebugLine 函数中，你还可以设置其他的参数，例如绘制持续时间、线条宽度等。</p><h2 id="日志" tabindex="-1"><a class="header-anchor" href="#日志" aria-hidden="true">#</a> 日志</h2><ul><li>保存在<code>Saved/Logs</code></li><li>仅<code>Dev/Debug</code>下有效 <ul><li>Shipping开启：bUseLoggingInShipping=true (adb log中不显示)</li></ul></li><li>启动参数 <code>-log</code>：在命令行中显示日志</li><li>声明和定义日志类别： <ul><li>DECLARE_LOG_CATEGORY_EXTERN</li><li>DEFINE_LOG_CATEGORY</li></ul></li><li>控制台命令 <code>log LogName NewVerbosity</code>:运行时修改日志的显示级别 <ul><li>控制台命令：<code>log global error</code></li><li>配置文件参数：DefaultEngine.ini: [Core.log] global=error</li><li>启动参数：<code>-ini.Engine:[Core.Log]:global=error</code></li></ul></li></ul><p>在VS中可以打开<code>Unreal Engine Log</code>窗口：</p><figure><img src="`+o+'" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure><p>需要安装VS对UE的支持模块： <img src="'+d+'" alt="Alt text" loading="lazy"></p><h2 id="可视化记录器-visual-logger" tabindex="-1"><a class="header-anchor" href="#可视化记录器-visual-logger" aria-hidden="true">#</a> 可视化记录器（Visual Logger）</h2><ul><li>可视化记录器 是一款强大的调试工具，可以创建记录游戏状态的视觉表示，并提供子啊编辑器中查看此数据的功能。</li></ul><p>https://www.unrealengine.com/zh-CN/blog/using-the-ue4-visual-logger</p><h2 id="作弊管理器-cheat-manager" tabindex="-1"><a class="header-anchor" href="#作弊管理器-cheat-manager" aria-hidden="true">#</a> 作弊管理器（Cheat Manager）</h2><p>引擎提供了内置的作弊管理器对象</p><ul><li>代码位于<code>CheatManager.h/cpp</code></li><li>使用<code>Exec</code>标记声明函数，例如： <ul><li>UFUNCTION(exec,BlueprintCallable)</li><li>ENGINE_API virtural void God();</li></ul></li><li>Shipping开启：UE_WITH_CHEAT_MANAGER=1</li><li>定义你自己的作弊管理器（Player Controller的成员）</li></ul><h3 id="调试相机-debug-camera" tabindex="-1"><a class="header-anchor" href="#调试相机-debug-camera" aria-hidden="true">#</a> 调试相机（Debug Camera）</h3><ul><li>快捷键开启 <ul><li>默认快捷键为“分号”</li><li>可以在<code>BaseInput.ini</code>中修改默认快捷/或在<code>UserInput.ini</code>中重载 <ul><li>[/Script/Engine.PlayerInput]</li><li>+DebugExecBindings=(Key=Semicolon,Command=&quot;ToggleDebugCamera&quot;)</li><li>+DebugExecBindings=(Key=Apostrophe,Command=&quot;ToggleForceDefaultMaterial&quot;)</li></ul></li><li>控制台命令 <code>ToggleDebugCamera</code></li><li>控制台命令 <code>Teleport</code>: 将角色移动到<code>debug</code>相机注视处</li><li>控制台命令 <code>slomo 0.1</code>：所有运动逻辑放缓10倍</li></ul></li></ul><figure><img src="'+c+'" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure><h3 id="obj-命令" tabindex="-1"><a class="header-anchor" href="#obj-命令" aria-hidden="true">#</a> obj 命令</h3><p>该命令最好在版本中运行，在编辑器下很多对象不会被释放。</p><ul><li>obj list package=X 查看<code>x资产内</code>所有的 <code>UObjects</code><img src="'+r+'" alt="Alt text" loading="lazy"></li><li>obj list outer=X 按<code>outer(直接)分组</code>查看所有<code>UObjects</code><img src="'+p+'" alt="Alt text" loading="lazy"></li><li>obj mem class=X 查看<code>所有X类型对象</code>的内存占用 <img src="'+u+'" alt="Alt text" loading="lazy"></li><li>obj dump /Path/To.Obj 打印一个对象的<code>所有 UPROPERTY</code><img src="'+g+'" alt="Alt text" loading="lazy"></li><li>obj refs name=/Path/To.Obj 列出该对象<code>被引用的堆栈</code><img src="'+h+'" alt="Alt text" loading="lazy"></li><li>obj gc 强制出发一次垃圾回收</li><li>更多查看<code>UEngine::HandleObjCommand</code></li></ul><h3 id="viual-studio-配置" tabindex="-1"><a class="header-anchor" href="#viual-studio-配置" aria-hidden="true">#</a> Viual Studio 配置</h3><ul><li>设置配置栏宽度 <br> <img src="'+m+`" alt="Alt text" loading="lazy"></li><li>多个分支叫做 UE5.sln <ul><li>设置环境变量<code>UE_NAME_PROJECT_AFTER_FOLDER=1</code></li><li>解决方案会被命名为<code>UE5_&lt;文件夹名&gt;.sln</code></li><li>该设置可在<code>\\Engine\\Source\\Programs\\UnrealBuildTool\\ProjectFiles\\ProjectFileGenerator.cs : GenerateProjectFiles</code>函数修改逻辑</li></ul></li><li>调试速度慢，单步执行耗时久 <ul><li>选项-&gt;调试-&gt;通用 <ul><li>关闭 “调试时启用诊断工具”（Enable Diagostic Tools while debugging）</li><li>关闭 “调试过程中显示运行时间”（Show elapsed time PerfTip while debugging）</li></ul></li></ul></li></ul><h3 id="构建配置-build-configurations" tabindex="-1"><a class="header-anchor" href="#构建配置-build-configurations" aria-hidden="true">#</a> 构建配置 （Build Configurations）</h3><table><thead><tr><th></th><th>Debug</th><th>Development</th><th>Test</th><th>Shipping</th></tr></thead><tbody><tr><td>IDE中调试</td><td>√</td><td>√</td><td>√</td><td>√</td></tr><tr><td>代码优化</td><td>×</td><td>√</td><td>√</td><td>√</td></tr><tr><td>调试符号</td><td>√</td><td>√</td><td>√</td><td>×<br>(unless IncludeDebugFiles=true)</td></tr><tr><td>控制台命令</td><td>√</td><td>√</td><td>√</td><td>×<br>(unless ALLOW_CONSOLE_IN_SHIPPING=true)</td></tr><tr><td>作弊管理器</td><td>√</td><td>√</td><td>√</td><td>×<br>(unless UE_WITH_CHEAT_MANAGER=true)</td></tr><tr><td>Insights&amp;可视化日志</td><td>√</td><td>√</td><td>√</td><td>×<br>(unless UE_TRACE_ENABLED=true)</td></tr><tr><td>checks / ensures</td><td>Show &amp; normal</td><td>Normal</td><td>×<br>(unless bUseChecksInShpping=true)</td><td>×<br>(unless bUseChecksInShpping=true)</td></tr><tr><td>日志</td><td>√</td><td>√</td><td>×<br>(unless bUseLoggingInShpping=true)</td><td>×<br>(unless bUseLoggingInShpping=true)</td></tr><tr><td>绘制调试图形</td><td>√</td><td>√</td><td>×<br>(unless UE_ENABLE_DEBUG_DRAWING=1)</td><td>×<br>(unless UE_ENABLE_DEBUG_DRAWING=1)</td></tr></tbody></table><p><strong>DebugGame</strong> : 游戏模块使用 <code>Debug</code>，引擎模块使用 <code>Development</code></p><h3 id="取消代码优化" tabindex="-1"><a class="header-anchor" href="#取消代码优化" aria-hidden="true">#</a> 取消代码优化</h3><ul><li><p>独立的C++文件：</p><ul><li>Checkout（使用P4）或修改文件（使用git），C++文件会因为<code>adaptive unity build</code>的机制单独编译 <ul><li>BuildConfiguration.xml: <code>&lt;BuildConfiguration&gt;&lt;bAdaptiveUnityDisableOptimizations&gt;true&lt;/..&gt;</code></li><li>Target.cs: <code>bAdaptiveUnityDisablesOptimizations = true;</code></li></ul></li></ul></li><li><p>单个模块：</p><ul><li>BuildConfiguration.xml:<code>&lt;ModuleConfiguration&gt;&lt;DisableOptimizeCode&gt;&lt;Item&gt;ModuleName&lt;/..&gt;</code></li><li>Build.cs: <code>OptimizeCode = CodeOptimization.InShippingBuildsOnly</code> or <code>CodeOptimization.Never</code></li><li>Target.cs: <code>DisableOptimizeCodeForModules</code> 数组</li></ul></li><li><p>代码块：</p><ul><li><code>UE_DISABLE_OPTIMIZATION</code> / <code>UE_ENABLE_OPTIMIZATION</code></li><li><code>UE_ENABLE_OPTIMIZATION_SHIP</code> / <code>UE_DISABLE_OPTIMIZATION_SHIP</code> (shipping)</li><li>Target.cs: <code>UE_CHECK_DISABLE_OPTIMIZATION=1</code> 在打包机上设置，避免包含代码为优化</li><li>PC: <code>#pragma optimize( &quot;&quot;, off )</code> / <code>#pragma optimize( &quot;&quot;, on )</code></li><li>Clang: <code>#pragma clang optimize off</code> / <code>#pragma clang optimize on</code></li></ul></li></ul><h3 id="条件断点" tabindex="-1"><a class="header-anchor" href="#条件断点" aria-hidden="true">#</a> 条件断点</h3><ul><li><code>FString</code>条件断点</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token function">wcsstr</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">wchar_t</span><span class="token operator">*</span><span class="token punctuation">)</span>MyString<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>AllocatorInstance<span class="token punctuation">.</span>Data<span class="token punctuation">,</span>L<span class="token string">&quot;Search substring&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>FName</code>条件断点</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token function">strstr</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>FNameEntry<span class="token operator">&amp;</span><span class="token punctuation">)</span>GNameBlocksDebug<span class="token punctuation">[</span>MyFName<span class="token punctuation">.</span>DisplayIndex<span class="token punctuation">.</span>Value <span class="token operator">&gt;&gt;</span> FNameDebugVisualizer<span class="token double-colon punctuation">::</span>OffsetBits<span class="token punctuation">]</span><span class="token punctuation">[</span>FNameDebugVisualizer<span class="token double-colon punctuation">::</span>EntryStride <span class="token operator">*</span> <span class="token punctuation">(</span>MyFName<span class="token punctuation">.</span>DisplayIndex<span class="token punctuation">.</span>Value <span class="token operator">&amp;</span> FNameDebugVisualizer<span class="token double-colon punctuation">::</span>OffsetMask<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>AnsiName<span class="token punctuation">,</span><span class="token string">&quot;Search substring&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看全局变量" tabindex="-1"><a class="header-anchor" href="#查看全局变量" aria-hidden="true">#</a> 查看全局变量</h3><p>在监视窗口中使用<code>ModuleName!VariableName</code>查看全局变量，在<code>Monolithic builds</code>中可以省略<code>ModuleName</code></p><ul><li>UnrealEditor-Core!GConfig</li><li>UnrealEditor-Engine!GPlayInEditorContextString</li><li>UnrealEditor-Core!GFrameCounter <img src="`+b+'" alt="Alt text" loading="lazy"></li></ul><h3 id="natvis" tabindex="-1"><a class="header-anchor" href="#natvis" aria-hidden="true">#</a> Natvis</h3><ul><li>Visual Studio Natvis 框架可以自定数据类型在调试器变量窗口中显示的方式</li><li>Unreal 的Natvis实现：<code>Engine\\Extras\\VisualStudioDebugging\\Unreal.Natvis</code><ul><li>安装方法：将<code>Unreal.Natvis</code>复制到<code>C:\\Users\\&lt;user&gt;\\Documents\\Visual Studio 2022\\Visualizers\\</code></li><li>修改立即生效</li></ul></li></ul><h2 id="启动参数" tabindex="-1"><a class="header-anchor" href="#启动参数" aria-hidden="true">#</a> 启动参数</h2><ul><li>阻塞游戏进程直到调试器挂载：<code>-WaitForAttach</code> / <code>-WaitForDebugger</code></li><li>从已有的打包程序中启动调试：<code>-basedir=E:\\path\\to\\GameName\\Binaries\\Win64</code></li><li>使用<code>-ini</code>参数覆盖ini文件中的配置参数：<code>ini:File:[SectionName]:Key=Value</code></li><li>使用<code>-DPCVars</code>覆盖DeviceProfile CVar：<code>-DPCVars=&quot;r.cvarname=foo,anothercvar=bar</code></li><li>使用<code>-execcmds</code>在启动后自动执行控制台命令：<code>-exccmds=&quot;log global error&quot;</code></li></ul><h3 id="cook确定性" tabindex="-1"><a class="header-anchor" href="#cook确定性" aria-hidden="true">#</a> Cook确定性</h3><ul><li>未修改任何资源多次Cook产物不一致</li><li>第二次Cook时添加参数<code>-DiffOnly</code></li></ul><figure><img src="'+f+'" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure><h3 id="内存分析" tabindex="-1"><a class="header-anchor" href="#内存分析" aria-hidden="true">#</a> 内存分析</h3><ul><li>控制台命令：<code>memreport -full [-csv|-name=X]</code><ul><li>生成完整内存报告，保存至<code>Engine/Saved/Profiling/MemReports</code></li></ul></li><li>启动参数：<code>-LLM -LLMcsv</code><ul><li>生成LLM记录，保存至<code>Engine/Saved/Profiling/LLM</code></li><li>CsvTools: <code>csvtosvg -csv xxx.csv -stats *</code></li></ul></li><li>特定内存问题：<code>-stompmalloc</code>或<code>ASAN</code></li><li>Unreal Insights</li></ul><h3 id="崩溃分析" tabindex="-1"><a class="header-anchor" href="#崩溃分析" aria-hidden="true">#</a> 崩溃分析</h3><ul><li><p>崩溃后游戏会创建一个文件<code>Saved/Crashes</code></p><ul><li>UEMinidump.dmp (MiniDumpWriteDump)</li><li>CrashContext.runtime-xml: 额外上下文的信息（-CrashReproter）</li><li>GameName.Log</li></ul></li><li><p>模拟产生崩溃</p><ul><li>控制台命令： <code>Debug Crash</code><ul><li>RenderCrash / ThreadCrash / GPUCrash /...</li><li>Abort / Stall / OOM / StackOverflow / Sleep /...</li></ul></li></ul></li></ul><p>-将dmp和pdb文件放在同一个路径下 - 打包时隐藏符号：<code>-nodebuginfo</code></p><h2 id="调试工具" tabindex="-1"><a class="header-anchor" href="#调试工具" aria-hidden="true">#</a> 调试工具</h2><h3 id="unreal-insights" tabindex="-1"><a class="header-anchor" href="#unreal-insights" aria-hidden="true">#</a> Unreal Insights</h3><p>启动方式：</p><ul><li><code>-trace=default,task,memory,cook -tracehost=127.0.0.1</code></li><li><code>-tracehost=127.0.0.1 -&gt; -tracefile</code></li></ul><p>文档： https://docs.unrealengine.com/5.3/zh-CN/unreal-insights-in-unreal-engine/</p><h3 id="renderdoc" tabindex="-1"><a class="header-anchor" href="#renderdoc" aria-hidden="true">#</a> RenderDoc</h3><p>启动方式：</p><ul><li>开启RenderDoc软件</li><li>并在<code>项目设置-&gt;插件-&gt;RenderDoc</code>中勾选 <code>启动时自动附加</code></li><li>点击<code>Viewport</code>右上角图标/控制台命令<code>Renderdoc.CaptureFrame</code></li><li>调试Shader额外操作： <ul><li>修改 <code>Engine/Config/ConsoleVariables.ini</code><ul><li>r.Shaders.Optimize=0</li><li>r.Shaders.Symbols=1</li></ul></li><li>默认RHI切换为<code>D3D11</code></li></ul></li></ul><h3 id="gpu调试-pix" tabindex="-1"><a class="header-anchor" href="#gpu调试-pix" aria-hidden="true">#</a> GPU调试 - PIX</h3><figure><img src="'+k+'" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure><h3 id="gpu调试-xcode" tabindex="-1"><a class="header-anchor" href="#gpu调试-xcode" aria-hidden="true">#</a> GPU调试 - Xcode</h3><ul><li>GPU Trace</li><li>Instruments</li></ul><figure><img src="'+x+'" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure><h3 id="gpu调试-dumpgpu" tabindex="-1"><a class="header-anchor" href="#gpu调试-dumpgpu" aria-hidden="true">#</a> GPU调试 - DumpGPU</h3><figure><img src="'+E+'" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure>',86),C=[v];function D(A,S){return a(),n("div",null,C)}const U=e(_,[["render",D],["__file","DebugTips.html.vue"]]);export{U as default};