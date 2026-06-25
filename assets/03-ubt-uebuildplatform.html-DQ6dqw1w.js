import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as r,f as e,g as a,h as s,i as t,j as d,r as p,o as c}from"./app-B8yHr8Lm.js";const o={},u={id:"步骤-3-实现-ubt-unrealarchitectureconfig-配置类",tabindex:"-1"},m={class:"header-anchor",href:"#步骤-3-实现-ubt-unrealarchitectureconfig-配置类"};function v(b,n){const l=p("RouteLink");return c(),r("div",null,[n[3]||(n[3]=e(`<h1 id="ubt-·-uebuildplatform-平台构建核心" tabindex="-1"><a class="header-anchor" href="#ubt-·-uebuildplatform-平台构建核心"><span>UBT · UEBuildPlatform（平台构建核心）</span></a></h1><p>在 UBT 构建平台配置中，通常要实现五个功能模块，<strong>​</strong><code>UEBuildPlatform</code><strong>​</strong>​<strong>是其中的核心</strong>。</p><table><thead><tr><th>模块类名</th><th>定位</th><th>核心职责</th></tr></thead><tbody><tr><td>​<code>UnrealTargetPlatform</code></td><td>平台唯一标识符</td><td>使用 <code>partial struct</code> 模拟类型安全的枚举，提供全局唯一的平台 ID。</td></tr><tr><td>​<code>TargetRules</code></td><td>编译参数配置</td><td>存在于项目的 <code>.Target.cs</code> 文件中， 定义构建游戏客户端、服务器或编辑器所需的高级设置。</td></tr><tr><td>​<code>UnrealArchitectureConfig</code></td><td>平台架构配置</td><td>确定当前平台构建时支持哪些CPU架构。</td></tr><tr><td>​<code>UEBuildPlatform</code></td><td>平台构建逻辑</td><td>负责管理 SDK 检测、工具链路径和架构支持等支持。</td></tr><tr><td>​<code>UEBuildPlatformFactory</code></td><td>动态加载与注册</td><td>负责在 UBT 启动时实例化对应的 <code>UEBuildPlatform</code> 类并进行注册。</td></tr></tbody></table><p>我们将围绕这五个功能模块以 &quot;OpenHarmony&quot;平台为例介绍如何在UBT中添加对应的支持。</p><p>‍</p><h3 id="步骤-1-定义一个新的-unrealtargetplatform-标识符" tabindex="-1"><a class="header-anchor" href="#步骤-1-定义一个新的-unrealtargetplatform-标识符"><span>步骤 1：定义一个新的 <code>UnrealTargetPlatform</code> 标识符</span></a></h3><p>这是最基础的一步：告诉 UBT &quot;<code>OpenHarmony</code>&quot; 是一个合法的、可构建的平台。</p><h4 id="作用说明" tabindex="-1"><a class="header-anchor" href="#作用说明"><span>作用说明</span></a></h4><p>​<code>UnrealTargetPlatform</code> 是一个全局唯一的标识符，用于在整个引擎代码库中进行平台相关的判断（例如在 <code>.Build.cs</code> 文件中使用：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">if (Target.Platform == UnrealTargetPlatform.OpenHarmony)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>)。UBT 使用 <code>partial struct</code> 机制允许在不修改核心文件的前提下扩展此列表。</p><h4 id="指导操作" tabindex="-1"><a class="header-anchor" href="#指导操作"><span>指导操作</span></a></h4><p>在您的平台扩展模块中定义一个 partial struct：</p><div class="language-cpp line-numbers-mode" data-highlighter="prismjs" data-ext="cpp"><pre><code><span class="line"><span class="token keyword">namespace</span> UnrealBuildTool</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 注意：UnrealTargetPlatform 在核心 UBT 程序集中被定义为 partial</span></span>
<span class="line">    <span class="token keyword">public</span> partial <span class="token keyword">struct</span> <span class="token class-name">UnrealTargetPlatform</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">/// &lt;summary&gt;</span></span>
<span class="line">        <span class="token comment">/// OpenHarmony 平台标识符</span></span>
<span class="line">        <span class="token comment">/// &lt;/summary&gt;</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">static</span> readonly UnrealTargetPlatform OpenHarmony <span class="token operator">=</span> <span class="token function">FindOrAddByName</span><span class="token punctuation">(</span><span class="token string">&quot;OpenHarmony&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>‍</p><h3 id="步骤-2-定义平台特定的-targetrules-配置子对象" tabindex="-1"><a class="header-anchor" href="#步骤-2-定义平台特定的-targetrules-配置子对象"><span>步骤 2：定义平台特定的 <code>TargetRules</code> 配置子对象</span></a></h3><p>这一步旨在为 OpenHarmony 平台提供一套可配置的规则集，并将其集成到全局的 <code>TargetRules</code> 中。这样<strong>用户可以在他们的游戏项目中针对 OpenHarmony 进行配置。</strong></p><h4 id="作用说明-1" tabindex="-1"><a class="header-anchor" href="#作用说明-1"><span>作用说明</span></a></h4><p>我们定义独立的平台规则类 (<code>OpenHarmonyTargetRules</code>)，并通过 <code>partial class</code> 扩展核心 <code>TargetRules</code>，使用 <code>[ConfigureSubObject]</code> 属性将其挂载。这使得用户可以在项目的 <code>.Target.cs</code> 或 INI 配置文件中配置 OpenHarmony 特有的设置。</p><h4 id="指导操作-1" tabindex="-1"><a class="header-anchor" href="#指导操作-1"><span>指导操作</span></a></h4><p>分为三个子步骤实现读写分离和集成：</p><h5 id="_2a-定义可读写的-openharmonytargetrules" tabindex="-1"><a class="header-anchor" href="#_2a-定义可读写的-openharmonytargetrules"><span>2A. 定义可读写的 <code>OpenHarmonyTargetRules</code></span></a></h5><p>定义平台独有的配置属性：</p><div class="language-cpp line-numbers-mode" data-highlighter="prismjs" data-ext="cpp"><pre><code><span class="line"><span class="token keyword">namespace</span> UnrealBuildTool</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 代码片段</span></span>
<span class="line">    <span class="token keyword">public</span> partial <span class="token keyword">class</span> <span class="token class-name">OpenHarmonyTargetRules</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token function">ConfigFile</span><span class="token punctuation">(</span>ConfigHierarchyType<span class="token punctuation">.</span>Engine<span class="token punctuation">,</span> <span class="token string">&quot;OpenHarmonyRuntimeSettings&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">bool</span> bEnableCustomCrashHandling <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line">        </span>
<span class="line">        <span class="token punctuation">[</span><span class="token function">CommandLine</span><span class="token punctuation">(</span><span class="token string">&quot;-EnableUBSan&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">bool</span> bEnableUndefinedBehaviorSanitizer <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h5 id="_2b-实现只读的-readonlyopenharmonytargetrules-包装器" tabindex="-1"><a class="header-anchor" href="#_2b-实现只读的-readonlyopenharmonytargetrules-包装器"><span>2B. 实现只读的 <code>ReadOnlyOpenHarmonyTargetRules</code> 包装器</span></a></h5><p>提供一个只读接口供构建逻辑安全访问：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">namespace UnrealBuildTool</span>
<span class="line">{</span>
<span class="line">    // 代码片段</span>
<span class="line">    public partial class ReadOnlyOpenHarmonyTargetRules</span>
<span class="line">    {</span>
<span class="line">        private OpenHarmonyTargetRules Inner;</span>
<span class="line">        public ReadOnlyOpenHarmonyTargetRules(OpenHarmonyTargetRules Inner) =&gt; this.Inner = Inner;</span>
<span class="line"></span>
<span class="line">        public bool bEnableCustomCrashHandling =&gt; Inner.bEnableCustomCrashHandling;</span>
<span class="line">        // ... 其他只读属性 ...</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h5 id="_2c-使用分部类扩展核心-targetrules-和-readonlytargetrules" tabindex="-1"><a class="header-anchor" href="#_2c-使用分部类扩展核心-targetrules-和-readonlytargetrules"><span>2C. 使用分部类扩展核心 <code>TargetRules</code> 和 <code>ReadOnlyTargetRules</code></span></a></h5><p>关键点： 在您的平台模块内，使用 <code>partial class</code> 扩展核心 UBT 类，不要修改引擎核心文件。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">namespace UnrealBuildTool</span>
<span class="line">{</span>
<span class="line">    // 扩展核心 TargetRules，添加可读写配置子对象</span>
<span class="line">    partial class TargetRules</span>
<span class="line">    {</span>
<span class="line">        [ConfigureSubObject]</span>
<span class="line">        public OpenHarmonyTargetRules OpenHarmonyPlatform = new OpenHarmonyTargetRules();</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    // 扩展核心 ReadOnlyTargetRules，添加只读访问器</span>
<span class="line">    partial class ReadOnlyTargetRules</span>
<span class="line">    {</span>
<span class="line">        private ReadOnlyOpenHarmonyTargetRules? _OpenHarmonyPlatform = null;</span>
<span class="line">        public ReadOnlyOpenHarmonyTargetRules OpenHarmonyPlatform</span>
<span class="line">        {</span>
<span class="line">            get</span>
<span class="line">            {</span>
<span class="line">                if (_OpenHarmonyPlatform == null)</span>
<span class="line">                    _OpenHarmonyPlatform = new ReadOnlyOpenHarmonyTargetRules(Inner.OpenHarmonyPlatform);</span>
<span class="line">                return _OpenHarmonyPlatform;</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,33)),a("h3",u,[a("a",m,[a("span",null,[n[1]||(n[1]=s("步骤 3：实现 ")),t(l,{to:"/GameEngine/Unreal/Platform/UBT%20-%20UEBuildPlatform.cs/UBT%20-%20UnrealArchitectureConfig.html"},{default:d(()=>n[0]||(n[0]=[s("UBT - UnrealArchitectureConfig")])),_:1}),n[2]||(n[2]=s(" 配置类"))])])]),n[4]||(n[4]=e(`<p>这是构建系统用来管理目标平台的硬件 CPU 架构（例如 Arm64 或 x64）。</p><h4 id="作用说明-2" tabindex="-1"><a class="header-anchor" href="#作用说明-2"><span>作用说明</span></a></h4><p>​<code>UnrealArchitectureConfig</code> 确保编译器能够生成正确的机器码，并根据项目需求（例如支持哪些架构）进行灵活配置。</p><h4 id="指导操作-2" tabindex="-1"><a class="header-anchor" href="#指导操作-2"><span>指导操作</span></a></h4><p>实现<code>OpenHarmonyArchitectureConfig</code> 定义平台支持的架构并实现配置读取逻辑。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">namespace UnrealBuildTool</span>
<span class="line">{</span>
<span class="line">    class OpenHarmonyArchitectureConfig : UnrealArchitectureConfig</span>
<span class="line">    {</span>
<span class="line">        public OpenHarmonyArchitectureConfig()</span>
<span class="line">            // 使用 SingleTargetLinkSeparately 模式，并设置默认支持 Arm64 和 X64</span>
<span class="line">            : base(UnrealArchitectureMode.SingleTargetLinkSeparately, new[] { UnrealArch.Arm64, UnrealArch.X64 })</span>
<span class="line">        {</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        // 返回当前项目需要构建的活动架构列表</span>
<span class="line">        public override UnrealArchitectures ActiveArchitectures(FileReference? ProjectFile, string? TargetName) =&gt; GetProjectArchitectures(ProjectFile, false);</span>
<span class="line"></span>
<span class="line">        // 为特定的架构返回特定的文件夹后缀（例如在 Android 中是 &#39;arm64-v8a&#39;）</span>
<span class="line">        public override string GetFolderNameForArchitecture(UnrealArch Architecture)</span>
<span class="line">        {</span>
<span class="line">            // OpenHarmony 示例映射</span>
<span class="line">            return Architecture == UnrealArch.Arm64 ? &quot;arm64-v8a&quot; : &quot;x64&quot;;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        // 缓存机制和私有方法 GetProjectArchitectures 略...</span>
<span class="line">        // ... (此处省略读取配置INI并填充 ActiveArches 列表的私有实现) ...</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>‍</p><h3 id="步骤-4-实现-uebuildplatform-抽象类" tabindex="-1"><a class="header-anchor" href="#步骤-4-实现-uebuildplatform-抽象类"><span>步骤 4：实现 <code>UEBuildPlatform</code> 抽象类</span></a></h3><p>这是构建系统集成的核心，实现所有特定于 OpenHarmony 平台的构建逻辑。</p><h4 id="作用说明-3" tabindex="-1"><a class="header-anchor" href="#作用说明-3"><span>作用说明</span></a></h4><p>​<code>UEBuildPlatform</code> 负责管理目标平台的编译器、链接器、SDK 配置和构建环境。您需要实现关键方法来指导 UBT 如何编译和打包二进制文件。</p><h4 id="指导操作-3" tabindex="-1"><a class="header-anchor" href="#指导操作-3"><span>指导操作</span></a></h4><p>实现 <code>OpenHarmonyPlatform</code> 类，覆盖关键方法：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">namespace UnrealBuildTool</span>
<span class="line">{</span>
<span class="line">    class OpenHarmonyPlatform : UEBuildPlatform</span>
<span class="line">    {</span>
<span class="line">        // 构造函数略...</span>
<span class="line">        // public OpenHarmonyPlatform(OpenHarmonyPlatformSDK InSDK, ILogger InLogger) : base(...) { }</span>
<span class="line"></span>
<span class="line">        public override bool PlatformAvailable</span>
<span class="line">        {</span>
<span class="line">            get { return OpenHarmonySDK.IsSDKAvailable(); } // 实现 SDK 检测逻辑</span>
<span class="line">        }</span>
<span class="line">        </span>
<span class="line">        public override UEToolChain CreateToolChain(ReadOnlyTargetRules TargetRules)</span>
<span class="line">        {</span>
<span class="line">            // 返回一个负责实际编译/链接命令的 ToolChain 实例 (需要单独实现 OpenHarmonyToolChain 类)</span>
<span class="line">            // return new OpenHarmonyToolChain(TargetRules); </span>
<span class="line">            return base.CreateToolChain(TargetRules);</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        public override void GetBuildArchitectureNames(List&lt;string&gt; OutArchitectureNames)</span>
<span class="line">        {</span>
<span class="line">            OutArchitectureNames.Add(&quot;arm64-v8a&quot;); // 添加支持的 ABI</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        public override UEBuildPlatformType PlatformType =&gt; UEBuildPlatformType.Mobile; </span>
<span class="line">        </span>
<span class="line">        // ... 还需要实现其他抽象方法和属性，例如打包逻辑 ...</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>‍</p><h3 id="步骤-5-创建-uebuildplatformfactory" tabindex="-1"><a class="header-anchor" href="#步骤-5-创建-uebuildplatformfactory"><span>步骤 5：创建 <code>UEBuildPlatformFactory</code></span></a></h3><p>这是将上述平台实现动态加载到 UBT 运行时的最后一步。</p><h4 id="作用说明-4" tabindex="-1"><a class="header-anchor" href="#作用说明-4"><span>作用说明</span></a></h4><p>UBT 在启动时扫描所有程序集，查找实现了 <code>UEBuildPlatformFactory</code> 的类，并使用它们来实例化可用的构建平台，将其注册到 UBT 平台管理器中。</p><h4 id="指导操作-4" tabindex="-1"><a class="header-anchor" href="#指导操作-4"><span>指导操作</span></a></h4><p>实现工厂类，负责实例化和注册您的平台实现：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">namespace UnrealBuildTool</span>
<span class="line">{</span>
<span class="line">    class OpenHarmonyPlatformFactory : UEBuildPlatformFactory</span>
<span class="line">    {</span>
<span class="line">        public override UnrealTargetPlatform TargetPlatform =&gt; UnrealTargetPlatform.OpenHarmony;</span>
<span class="line"></span>
<span class="line">        public override void RegisterBuildPlatforms(ILogger Logger)</span>
<span class="line">        {</span>
<span class="line">            // 实例化 SDK 管理器 (OpenHarmonyPlatformSDK 需要单独实现)</span>
<span class="line">            OpenHarmonyPlatformSDK SDK = new(Logger);</span>
<span class="line">        </span>
<span class="line">            // 注册平台实例</span>
<span class="line">            UEBuildPlatform.RegisterBuildPlatform(new OpenHarmonyPlatform(SDK, Logger), Logger);</span>
<span class="line"></span>
<span class="line">            // 注册到特定平台组</span>
<span class="line">            UEBuildPlatform.RegisterPlatformWithGroup(UnrealTargetPlatform.OpenHarmony, UnrealPlatformGroup.HuaWei);</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>‍</p>`,26))])}const f=i(o,[["render",v],["__file","03-ubt-uebuildplatform.html.vue"]]),y=JSON.parse('{"path":"/GameEngine/Unreal/Platform/03-ubt-uebuildplatform.html","title":"UBT · UEBuildPlatform（平台构建核心）","lang":"en-US","frontmatter":{"date":"2026-12-25T00:00:00.000Z","tag":["Unreal Engine","OpenHarmony","UBT"]},"git":{"createdTime":1782388552000,"updatedTime":1782391338000,"contributors":[{"name":"BanMing","username":"BanMing","email":"ban-ming@foxmail.com","commits":2,"url":"https://github.com/BanMing"},{"name":"Claude Opus 4.7","username":"Claude Opus 4.7","email":"noreply@anthropic.com","commits":2,"url":"https://github.com/Claude Opus 4.7"}]},"readingTime":{"minutes":4.67,"words":1402},"filePathRelative":"GameEngine/Unreal/Platform/03-ubt-uebuildplatform.md","localizedDate":"December 25, 2026","excerpt":"\\n<p>在 UBT 构建平台配置中，通常要实现五个功能模块，<strong>​</strong><code>UEBuildPlatform</code><strong>​</strong>​<strong>是其中的核心</strong>。</p>\\n<table>\\n<thead>\\n<tr>\\n<th>模块类名</th>\\n<th>定位</th>\\n<th>核心职责</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>​<code>UnrealTargetPlatform</code></td>\\n<td>平台唯一标识符</td>\\n<td>使用 <code>partial struct</code> 模拟类型安全的枚举，提供全局唯一的平台 ID。</td>\\n</tr>\\n<tr>\\n<td>​<code>TargetRules</code></td>\\n<td>编译参数配置</td>\\n<td>存在于项目的 <code>.Target.cs</code> 文件中，   定义构建游戏客户端、服务器或编辑器所需的高级设置。</td>\\n</tr>\\n<tr>\\n<td>​<code>UnrealArchitectureConfig</code></td>\\n<td>平台架构配置</td>\\n<td>确定当前平台构建时支持哪些CPU架构。</td>\\n</tr>\\n<tr>\\n<td>​<code>UEBuildPlatform</code></td>\\n<td>平台构建逻辑</td>\\n<td>负责管理 SDK 检测、工具链路径和架构支持等支持。</td>\\n</tr>\\n<tr>\\n<td>​<code>UEBuildPlatformFactory</code></td>\\n<td>动态加载与注册</td>\\n<td>负责在 UBT 启动时实例化对应的 <code>UEBuildPlatform</code> 类并进行注册。</td>\\n</tr>\\n</tbody>\\n</table>"}');export{f as comp,y as data};
