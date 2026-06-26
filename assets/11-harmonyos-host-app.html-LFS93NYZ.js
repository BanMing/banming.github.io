import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as i,f as e,g as n,o as l}from"./app-A-4qaVhC.js";const t="/assets/image-20251217181646-pq9viro-C68SRL55.png",d="/assets/image-20251217181119-5gerppf-BLdnVdJ1.png",p="/assets/2-20251217181137-sqzhclr-CoD_sLdH.png",r="/assets/image-20251127173645-e1u93vp-Ch0z2CHy.png",c={};function o(u,s){return l(),i("div",null,s[0]||(s[0]=[e('<h1 id="harmonyos-宿主应用搭建" tabindex="-1"><a class="header-anchor" href="#harmonyos-宿主应用搭建"><span>HarmonyOS 宿主应用搭建</span></a></h1><h2 id="一-环境准备‌" tabindex="-1"><a class="header-anchor" href="#一-环境准备‌"><span>一. 环境准备‌</span></a></h2><table><thead><tr><th>步骤</th><th>详细说明</th><th>关键配置与要求</th></tr></thead><tbody><tr><td>安装 DevEco Studio</td><td>下载并安装最新版官方 IDE。 <code>DevEco Studio提供开箱即用的开发体验，将HarmonyOS SDK、Node.js、Hvigor、OHPM、模拟器平台等进行合一打包，简化DevEco Studio安装配置流程。</code></td><td>建议使用最新稳定版 DevEco Studio。</td></tr><tr><td>SDK</td><td>HarmonyOS SDK已嵌入DevEco Studio中，无需额外下载配置。 <code>HarmonyOS SDK可以在DevEco Studio安装位置下DevEco Studio\\sdk目录中查看。如需进行OpenHarmony应用开发，可通过File &gt; Settings &gt; OpenHarmony SDK页签下载OpenHarmony SDK。</code></td><td></td></tr><tr><td>开发者账号</td><td>注册华为开发者账号，完成实名认证（企业或个人）。</td><td>必须实名认证才能申请正式证书。</td></tr></tbody></table><p>​<code>注：OpenHarmony 是开源的技术底座（不含安卓代码），HarmonyOS 是兼容安卓应用的商业发行版，而 HarmonyOS Next 则是完全剥离安卓、仅支持原生应用（HAP）的纯血商用系统。</code></p><hr><h2 id="二-创建harmonyos工程" tabindex="-1"><a class="header-anchor" href="#二-创建harmonyos工程"><span>二. 创建HarmonyOS工程</span></a></h2><h4 id="a-创建流程" tabindex="-1"><a class="header-anchor" href="#a-创建流程"><span>a. 创建流程</span></a></h4><ol><li>在DevEco Studio的欢迎页，选择Create Project开始创建一个新工程。</li><li>根据工程创建向导，选择创建Application、Native C++，然后单击Next。<img src="'+t+'" alt="" loading="lazy"></li><li>在工程配置页面，需要根据向导配置工程的基本信息。</li></ol><ul><li>Project name：工程的名称，可以自定义，由大小写字母、数字和下划线组成，必须由大小写字母开头，长度为1~200个字符。</li><li>Bundle name：标识应用的包名，用于标识应用的唯一性。<br> ​<img src="'+d+'" alt="" loading="lazy"></li><li>Save location：工程文件本地存储路径，由大小写字母、数字和下划线等组成，不能包含中文字符。</li><li>Compatible SDK：兼容的最低API Version。</li><li>Module name： 模块的名称。</li><li>Device type：该工程模板支持的设备类型。设备类型说明请参考deviceTypes标签。</li><li>C++ Standard：C++标准库，取值包括：Toolchain Default、C++11、C++14。</li></ul><p><img src="'+p+`" alt="" loading="lazy"><br> 4. 单击Finish，工具会自动生成示例代码和相关资源，等待工程创建完成。</p><h4 id="b-项目文件结构" tabindex="-1"><a class="header-anchor" href="#b-项目文件结构"><span>b. 项目文件结构</span></a></h4><p>使用 Native C++模板创建项目会自动生成cpp文件夹、types文件夹、CMakeList.txt文件，开发者可以根据实际情况自行添加修改其他文件及文件夹。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">├── AppScope                                  // 项目配置：包名、版本号、游戏名等。</span>
<span class="line">├── entry/Build								  // 构建输出目录，编译后自动生成，存放最终的 .hap 或 .app 安装包。</span>
<span class="line">├── entry/libs								  // 预编译库目录，存放.so动态库，不同架构以目录区分。如：libs/arm64-v8a/...</span>
<span class="line">├── entry/src</span>
<span class="line">│       ├── main</span>
<span class="line">│       │   ├── cpp                           // C++代码区</span>
<span class="line">│       │   │   ├── CMakeLists.txt            // CMake编译配置文件</span>
<span class="line">│       │   │   ├── napi_init.cpp             // C++源代码，声明C++方法，供ArkTS调用</span>
<span class="line">│       │   │   └── types                     // 接口存放文件夹</span>
<span class="line">│       │   │       └── libentry</span>
<span class="line">│       │   │           ├── index.d.ts        // 接口文件</span>
<span class="line">│       │   │           └── oh-package.json5  // 接口注册配置文件</span>
<span class="line">│       │   ├── ets                           // 代码区</span>
<span class="line">│       │   │   ├── entryability</span>
<span class="line">│       │   │   │   └── EntryAbility.ts       // 程序入口类，进行一些必要设置和初始化。Unreal引擎的初始化通常在此被调用。</span>
<span class="line">│       │   │   └── pages                     // UI</span>
<span class="line">│       │   │       └── Index.ets             // 默认生成的UI页面</span>
<span class="line">│		│	├──	resources                     // 资源文件目录</span>
<span class="line">│		│	│	├──	base/media				  // 媒体资源, 存放应用内图标、启动图等。</span>
<span class="line">│       │ 	│	└── rawfile					  // 虚幻引擎的 .pak 资源文件必须放在此处，才能通过 ResourceManager 接口由 C++ 端读取。</span>
<span class="line">│ 		│ 	│</span>
<span class="line">│       │	└── module.json5                  // 模块配置，声明应用权限（网络、存储等）、窗口显示模式（全屏/横屏）。</span>
<span class="line">│       │  </span>
<span class="line">│       ├── build-profile.json5               // 模块构建配置</span>
<span class="line">│       └── oh-package.json5                  // 模块包管理信息，依赖配置</span>
<span class="line">├── hvigor                                    // 构建工具配置，可以修改Hvigor版本号</span>
<span class="line">├── build-profile.json5                       // 应用级构建配置</span>
<span class="line">└── oh-package.json5                          // 应用级包管理信息</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="三-工程实现" tabindex="-1"><a class="header-anchor" href="#三-工程实现"><span>三. 工程实现</span></a></h2><h4 id="a-应用级配置" tabindex="-1"><a class="header-anchor" href="#a-应用级配置"><span>a. 应用级配置</span></a></h4><ol><li>​<strong>​</strong><code>app.json5</code><strong>​</strong>用于定义全局属性，如唯一标识、厂商、版本号、版本名称、应用图标、版本号。</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  &quot;app&quot;: {</span>
<span class="line">    &quot;bundleName&quot;: &quot;com.example.game&quot;,</span>
<span class="line">    &quot;vendor&quot;: &quot;example&quot;,</span>
<span class="line">    &quot;versionCode&quot;: 1000000,</span>
<span class="line">    &quot;versionName&quot;: &quot;1.0.0&quot;,</span>
<span class="line">    &quot;icon&quot;: &quot;$media:app_icon&quot;,</span>
<span class="line">    &quot;label&quot;: &quot;$string:app_name&quot;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>​<strong>​</strong><code>build-profile.json5</code><strong>​</strong>用于配置整个项目的模块列表、签名信息以及编译方案。</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  &quot;app&quot;: {</span>
<span class="line">    &quot;signingConfigs&quot;: [], // 自动化签名生成的配置存放在此</span>
<span class="line">    &quot;compileSdkVersion&quot;: 12,</span>
<span class="line">    &quot;compatibleSdkVersion&quot;: 12,</span>
<span class="line">    &quot;products&quot;: [</span>
<span class="line">      {</span>
<span class="line">        &quot;name&quot;: &quot;default&quot;,</span>
<span class="line">        &quot;signingConfig&quot;: &quot;default&quot;,</span>
<span class="line">        &quot;compatibleSdkVersion&quot;: &quot;6.0.0(20)&quot;,</span>
<span class="line">        &quot;runtimeOS&quot;: &quot;HarmonyOS&quot;,  // 华为鸿蒙系统</span>
<span class="line">      }</span>
<span class="line">    ]</span>
<span class="line">  },</span>
<span class="line">  &quot;modules&quot;: [ // 定义项目包含的所有模块及其物理路径</span>
<span class="line">    { &quot;name&quot;: &quot;entry&quot;, &quot;srcPath&quot;: &quot;./entry&quot;, &quot;targets&quot;: [{ &quot;name&quot;: &quot;default&quot; }] }</span>
<span class="line">  ]</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>​<strong>​</strong><code>oh-package.json5</code><strong>​</strong>用于声明项目范围内公用的依赖包以及版本覆盖（Overrides）。</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  &quot;modelVersion&quot;: &quot;1.1.0&quot;, // 必须字段，定义 ohpm 包管理规范的版本</span>
<span class="line">   &quot;description&quot;: &quot;Please describe the basic information.&quot;,</span>
<span class="line"></span>
<span class="line">  // 项目全局依赖配置：</span>
<span class="line">  // 在这里定义的依赖可以被 entry 或其他 feature 模块引用。</span>
<span class="line">  &quot;dependencies&quot;: {    </span>
<span class="line">    &quot;@ohos/library_name&quot;: &quot;file:./libs/common_utils.har&quot;  // 示例：引用本地 HAR 包路径</span>
<span class="line">  },</span>
<span class="line"></span>
<span class="line">  // 开发环境依赖：</span>
<span class="line">  // 仅在编译和构建阶段使用的工具。</span>
<span class="line">  &quot;devDependencies&quot;: {</span>
<span class="line">    &quot;@ohos/hyperspace&quot;: &quot;1.0.0&quot;</span>
<span class="line">  },</span>
<span class="line"></span>
<span class="line">  // 版本约束/强制重写（可选）：</span>
<span class="line">  // 当多个模块依赖冲突时，强制指定全局使用的版本。</span>
<span class="line">  &quot;overrides&quot;: {</span>
<span class="line">    &quot;@ohos/lottie&quot;: &quot;2.0.0&quot;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="b-模块级配置" tabindex="-1"><a class="header-anchor" href="#b-模块级配置"><span>b. 模块级配置</span></a></h4><ol><li>​<strong>​</strong><code>module.json5</code><strong>​</strong>定义模块的基本信息，权限声明和页面属性。</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  &quot;module&quot;: {</span>
<span class="line">    &quot;name&quot;: &quot;entry&quot;,</span>
<span class="line">    &quot;type&quot;: &quot;entry&quot;,</span>
<span class="line">    &quot;description&quot;: &quot;$string:module_desc&quot;,</span>
<span class="line">    &quot;mainElement&quot;: &quot;EntryAbility&quot;,  // Module入口UIAbility</span>
<span class="line">    &quot;deviceTypes&quot;: [  // 可运行的设备类型</span>
<span class="line">        &quot;phone&quot;,</span>
<span class="line">        &quot;tablet&quot;</span>
<span class="line">    ],</span>
<span class="line">    &quot;requestPermissions&quot;: [</span>
<span class="line">      { &quot;name&quot;: &quot;ohos.permission.INTERNET&quot; }, // 申请网络权限</span>
<span class="line">      { &quot;name&quot;: &quot;ohos.permission.KEEP_RUNNING&quot; } // 申请常驻运行</span>
<span class="line">    ],</span>
<span class="line">    &quot;abilities&quot;: [</span>
<span class="line">      {</span>
<span class="line">        &quot;name&quot;: &quot;EntryAbility&quot;,</span>
<span class="line">        &quot;srcEntry&quot;: &quot;./ets/entryability/EntryAbility.ts&quot;,</span>
<span class="line">        &quot;orientation&quot;: &quot;landscape&quot; // 强制横屏（游戏常用）</span>
<span class="line">      }</span>
<span class="line">    ]</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>​<strong>​</strong><code>build-profile.json5</code><strong>​</strong>​ **(模块编译细节)**<strong>这是 Native 开发最关键的文件</strong>。它决定了 C++ 编译的架构、CMake 的参数以及 ABI 过滤。</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  &quot;apiType&quot;: &quot;stageMode&quot;,</span>
<span class="line">  &quot;buildOption&quot;: {</span>
<span class="line">    &quot;externalNativeOptions&quot;: {</span>
<span class="line">      &quot;path&quot;: &quot;./src/main/cpp/CMakeLists.txt&quot;, // 指定 CMakeLists 位置</span>
<span class="line">      &quot;arguments&quot;: &quot;&quot;, // 传递给 CMake 的额外参数（如 -D宏定义）</span>
<span class="line">      &quot;abiFilters&quot;: [&quot;arm64-v8a&quot;], // 指定打包对应的 SO 库，默认arm64-v8a</span>
<span class="line">      &quot;cppFlags&quot;: &quot;&quot; </span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>​<strong>​</strong><code>oh-package.json5</code><strong>​</strong>​ **(模块局部依赖)**声明当前模块运行所需的 HAR 包或三方库依赖。</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;entry&quot;,</span>
<span class="line">  &quot;version&quot;: &quot;1.0.0&quot;,</span>
<span class="line">  &quot;dependencies&quot;: {</span>
<span class="line">    &quot;libentry.so&quot;: &quot;file:./src/main/cpp/types/libentry&quot; // 关联 Native 接口</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="c-编写项目文件" tabindex="-1"><a class="header-anchor" href="#c-编写项目文件"><span>c. 编写项目文件</span></a></h4><ol><li>​<code>Native</code>层开发在 <code>CMakeLists.txt</code> 中配置你的 C++ 源码和依赖库。</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line"># the minimum version of CMake.</span>
<span class="line">cmake_minimum_required(VERSION 3.5.0)</span>
<span class="line"># 声明 CMake 最低版本要求</span>
<span class="line">project(Projects)</span>
<span class="line"></span>
<span class="line"># 引入预编译的虚幻引擎库 (UE4/UE5.so)</span>
<span class="line"># UBT 编译生成的 so 文件通常会被拷贝到 entry/libs/\${OHOS_ARCH} 目录下</span>
<span class="line">set(UE_LIB_PATH \${CMAKE_CURRENT_SOURCE_DIR}/../../../libs/arm64-v8a)</span>
<span class="line"></span>
<span class="line"># 自动生成的，将napi_init.cpp的C++方法暴露给ArkTS端</span>
<span class="line">add_library(entry SHARED napi_init.cpp)</span>
<span class="line"></span>
<span class="line"># 链接库文件</span>
<span class="line">target_link_libraries(entry PUBLIC libace_napi.z.so)</span>
<span class="line">target_link_libraries(\${PROJECT_NAME} PUBLIC \${UE_LIB_PATH}/libUnreal.so)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>​<strong>​</strong><code>EntryAbility.ets</code><strong>​</strong>程序入口实现​<code>EntryAbility</code> 是应用的生命周期管理中心。在虚幻引擎适配中，它负责加载 Native 库并通知引擎窗口已准备就绪。</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">import { AbilityConstant, UIAbility, Want } from &#39;@kit.AbilityKit&#39;;</span>
<span class="line">import { window } from &#39;@kit.ArkUI&#39;;</span>
<span class="line">import { hilog } from &#39;@kit.PerformanceAnalysisKit&#39;;</span>
<span class="line"></span>
<span class="line">export default class EntryAbility extends UIAbility {</span>
<span class="line">  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {</span>
<span class="line">    hilog.info(0x0000, &#39;testTag&#39;, &#39;%{public}s&#39;, &#39;Ability onCreate&#39;);</span>
<span class="line">    // 在此处可以进行一些不依赖 UI 的 Native 初始化</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  onWindowStageCreate(windowStage: window.WindowStage): void {</span>
<span class="line">    // 设置全屏，这是游戏开发的常规操作</span>
<span class="line">    let windowClass: window.Window = windowStage.getMainWindowSync();</span>
<span class="line">    windowClass.setWindowLayoutFullScreen(true);</span>
<span class="line"></span>
<span class="line">    // 加载 Index 页面</span>
<span class="line">    windowStage.loadContent(&#39;pages/Index&#39;, (err) =&gt; {</span>
<span class="line">      if (err.code) {</span>
<span class="line">        hilog.error(0x0000, &#39;testTag&#39;, &#39;Failed to load the content. Cause: %{public}s&#39;, JSON.stringify(err) ?? &#39;&#39;);</span>
<span class="line">        return;</span>
<span class="line">      }</span>
<span class="line">    });</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  onForeground(): void {</span>
<span class="line">    // 应用回到前台，通知虚幻引擎恢复运行/渲染</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  onBackground(): void {</span>
<span class="line">    // 应用进入后台，通知虚幻引擎暂停渲染以省电</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>​<strong>​</strong><code>ArkTS</code><strong>​</strong>​ 与 <strong>​</strong><code>Native</code><strong>​</strong> （跨语言）交互​<code>以下示例代码使用鸿蒙提供的 Node-API 完成。</code>​<code>另外，OpenHarmony 官方提供 aki(Alpha Kernel Interacting) 框架，为 OpenHarmony Native 开发提供 JS与C/C++ 跨语言访问支持。这里暂未做展示。</code></li></ol><ul><li><p>模块初始化</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// entry/src/main/cpp/napi_init.cpp</span>
<span class="line">EXTERN_C_START</span>
<span class="line">// 模块初始化</span>
<span class="line">static napi_value Init(napi_env env, napi_value exports) {</span>
<span class="line">    // ArkTS接口与C++接口的绑定和映射</span>
<span class="line">    napi_property_descriptor desc[] = {</span>
<span class="line">        // 注：仅需复制以下两行代码，Init在完成创建Native C++工程以后在napi_init.cpp中已配置好。</span>
<span class="line">        {&quot;callNative&quot;, nullptr, CallNative, nullptr, nullptr, nullptr, napi_default, nullptr},</span>
<span class="line">        {&quot;nativeCallArkTS&quot;, nullptr, NativeCallArkTS, nullptr, nullptr, nullptr, napi_default, nullptr}</span>
<span class="line">    };</span>
<span class="line">    // 在exports对象上挂载CallNative/NativeCallArkTS两个Native方法</span>
<span class="line">    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);</span>
<span class="line">    return exports;</span>
<span class="line">}</span>
<span class="line">EXTERN_C_END</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>在<code>index.d.ts</code>文件中，提供JS侧的接口方法。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// entry/src/main/cpp/types/libentry/index.d.ts</span>
<span class="line">export const callNative: (a: number, b: number) =&gt; number;</span>
<span class="line">export const nativeCallArkTS: (cb: (a: number) =&gt; number) =&gt; number;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>在 <code>oh-package.json5</code>​ 文件中将 <code>index.d.ts</code> 与 cpp 文件关联起来。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// entry/src/main/cpp/types/libentry/oh-package.json5</span>
<span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;libentry.so&quot;,</span>
<span class="line">  &quot;types&quot;: &quot;./index.d.ts&quot;,</span>
<span class="line">  &quot;version&quot;: &quot;&quot;,</span>
<span class="line">  &quot;description&quot;: &quot;Please describe the basic information.&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>在 <code>CMakeLists.txt</code> 文件中配置 CMake 打包参数。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line"># entry/src/main/cpp/CMakeLists.txt</span>
<span class="line">cmake_minimum_required(VERSION 3.4.1)</span>
<span class="line">project(MyApplication2)</span>
<span class="line"></span>
<span class="line">set(NATIVERENDER_ROOT_PATH \${CMAKE_CURRENT_SOURCE_DIR})</span>
<span class="line"></span>
<span class="line">include_directories(\${NATIVERENDER_ROOT_PATH}</span>
<span class="line">                    \${NATIVERENDER_ROOT_PATH}/include)</span>
<span class="line"></span>
<span class="line"># 添加名为entry的库</span>
<span class="line">add_library(entry SHARED napi_init.cpp)</span>
<span class="line"># 构建此可执行文件需要链接的库</span>
<span class="line">target_link_libraries(entry PUBLIC libace_napi.z.so)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>实现Native侧的<code>CallNative</code>​以及<code>NativeCallArkTS</code>接口。具体代码如下：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// entry/src/main/cpp/napi_init.cpp</span>
<span class="line">static napi_value CallNative(napi_env env, napi_callback_info info)</span>
<span class="line">{</span>
<span class="line">    size_t argc = 2;</span>
<span class="line">    // 声明参数数组</span>
<span class="line">    napi_value args[2] = {nullptr};</span>
<span class="line"></span>
<span class="line">    // 获取传入的参数并依次放入参数数组中</span>
<span class="line">    napi_get_cb_info(env, info, &amp;argc, args, nullptr, nullptr);</span>
<span class="line"></span>
<span class="line">    // 依次获取参数</span>
<span class="line">    double value0;</span>
<span class="line">    napi_get_value_double(env, args[0], &amp;value0);</span>
<span class="line">    double value1;</span>
<span class="line">    napi_get_value_double(env, args[1], &amp;value1);</span>
<span class="line"></span>
<span class="line">    // 返回两数相加的结果</span>
<span class="line">    napi_value sum;</span>
<span class="line">    napi_create_double(env, value0 + value1, &amp;sum);</span>
<span class="line">    return sum;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">static napi_value NativeCallArkTS(napi_env env, napi_callback_info info)</span>
<span class="line">{</span>
<span class="line">    size_t argc = 1;</span>
<span class="line">    // 声明参数数组</span>
<span class="line">    napi_value args[1] = {nullptr};</span>
<span class="line"></span>
<span class="line">    // 获取传入的参数并依次放入参数数组中</span>
<span class="line">    napi_get_cb_info(env, info, &amp;argc, args , nullptr, nullptr);</span>
<span class="line"></span>
<span class="line">    // 创建一个int，作为ArkTS的入参</span>
<span class="line">    napi_value argv = nullptr;</span>
<span class="line">    napi_create_int32(env, 2, &amp;argv );</span>
<span class="line"></span>
<span class="line">    // 调用传入的callback，并将其结果返回</span>
<span class="line">    napi_value result = nullptr;</span>
<span class="line">    napi_call_function(env, nullptr, args[0], 1, &amp;argv, &amp;result);</span>
<span class="line">    return result;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>ArkTS侧调用C/C++方法实现ArkTS侧通过import引入Native侧包含处理逻辑的so来使用C/C++的方法。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// entry/src/main/ets/pages/Index.ets</span>
<span class="line">// 通过import的方式，引入Native能力。</span>
<span class="line">import nativeModule from &#39;libentry.so&#39;</span>
<span class="line"></span>
<span class="line">@Entry</span>
<span class="line">@Component</span>
<span class="line">struct Index {</span>
<span class="line">  @State message: string = &#39;Test Node-API callNative result: &#39;;</span>
<span class="line">  @State message2: string = &#39;Test Node-API nativeCallArkTS result: &#39;;</span>
<span class="line">  build() {</span>
<span class="line">    Row() {</span>
<span class="line">      Column() {</span>
<span class="line">        // 第一个按钮，调用callNative方法，对应到Native侧的CallNative方法，进行两数相加。</span>
<span class="line">        Text(this.message)</span>
<span class="line">          .fontSize(50)</span>
<span class="line">          .fontWeight(FontWeight.Bold)</span>
<span class="line">          .onClick(() =&gt; {</span>
<span class="line">            this.message += nativeModule.callNative(2, 3);</span>
<span class="line">            })</span>
<span class="line">        // 第二个按钮，调用nativeCallArkTS方法，对应到Native的NativeCallArkTS，在Native调用ArkTS function。</span>
<span class="line">        Text(this.message2)</span>
<span class="line">          .fontSize(50)</span>
<span class="line">          .fontWeight(FontWeight.Bold)</span>
<span class="line">          .onClick(() =&gt; {</span>
<span class="line">            this.message2 += nativeModule.nativeCallArkTS((a: number)=&gt; {</span>
<span class="line">                return a * 2;</span>
<span class="line">            });</span>
<span class="line">          })</span>
<span class="line">      }</span>
<span class="line">      .width(&#39;100%&#39;)</span>
<span class="line">    }</span>
<span class="line">    .height(&#39;100%&#39;)</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><ol start="4"><li>​<strong>​</strong><code>Index.ets</code><strong>​</strong>UI 界面实现通过 <code>XComponent</code> 组件，将 ArkTS 的 UI 层与 Native 的渲染表面（Surface）进行绑定。</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// 导入 Native 模块</span>
<span class="line">import nativeModule from &#39;libentry.so&#39;;</span>
<span class="line"></span>
<span class="line">@Entry</span>
<span class="line">@Component</span>
<span class="line">struct Index {</span>
<span class="line">  private xComponentContext: Record&lt;string, Object&gt; | undefined = undefined;</span>
<span class="line"></span>
<span class="line">  // 软键盘、命令窗口、侧滑返回等功能处理。</span>
<span class="line"></span>
<span class="line">  build() {</span>
<span class="line">    Column() {</span>
<span class="line">      // XComponent 是承载虚幻引擎渲染画面的核心组件</span>
<span class="line">      XComponent({</span>
<span class="line">        id: &#39;UnrealXComponent&#39;,</span>
<span class="line">        type: XComponentType.SURFACE, // 类型必须为 surface 以获取渲染表面</span>
<span class="line">        libraryname: &#39;entry&#39; // 对应 CMake 中的库名</span>
<span class="line">      })</span>
<span class="line">        .onLoad((context) =&gt; {</span>
<span class="line">          this.xComponentContext = context as Record&lt;string, Object&gt;;</span>
<span class="line">          hilog.info(0x0000, &#39;testTag&#39;, &#39;XComponent onLoad&#39;);</span>
<span class="line">          </span>
<span class="line">          // 启动虚幻引擎</span>
<span class="line">          nativeModule.initUnreal();</span>
<span class="line">        })</span>
<span class="line">        .onDestroy(() =&gt; {</span>
<span class="line">          hilog.info(0x0000, &#39;testTag&#39;, &#39;XComponent onDestroy&#39;);</span>
<span class="line">        })</span>
<span class="line">        .width(&#39;100%&#39;)</span>
<span class="line">        .height(&#39;100%&#39;)</span>
<span class="line">    }</span>
<span class="line">    .width(&#39;100%&#39;)</span>
<span class="line">    .height(&#39;100%&#39;)</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="四-加载三方库" tabindex="-1"><a class="header-anchor" href="#四-加载三方库"><span>四. 加载三方库</span></a></h2><p>HarmonyOS 使用 <code>oh-package.json5</code> 进行包管理。</p><ol><li><strong>添加本地 HAR 包</strong>：将 <code>.har</code>​ 文件放入项目目录（如 <code>libs</code>）。</li><li><strong>配置依赖</strong>：在模块级 <code>oh-package.json5</code>​ 中添加：见第三点，工程实现中的配置。</li><li><strong>安装依赖：</strong> 在终端执行 <code>ohpm install</code>命令。</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">ohpm install [options] [[&lt;@group&gt;/]&lt;pkg&gt;[@&lt;version&gt; | @tag:&lt;tag&gt;]] ...</span>
<span class="line">ohpm install [options] &lt;folder&gt; </span>
<span class="line">ohpm install [options] &lt;har file&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：</p><ul><li>​<code>@group</code>：三方库的命名空间，可选。</li><li>​<code>pkg</code>​：三方库名称，可选；当 install 后面没有指定三方库名称时，会根据当前目录下 <code>oh-package.json5</code> 定义的依赖关系进行全量安装。</li><li>​<code>version</code>：三方库的版本号，可选。</li><li>​<code>tag</code>：三方库的标签，标签会标记三方库的某个版本号，可选。</li></ul><hr><h2 id="五-打包、签名与部署" tabindex="-1"><a class="header-anchor" href="#五-打包、签名与部署"><span>五. 打包、签名与部署</span></a></h2><h4 id="a-打包" tabindex="-1"><a class="header-anchor" href="#a-打包"><span>a. 打包</span></a></h4><p>构建命令完成后，工程或模块下build目录中会生成相应的hap/hsp/har/app编译产物。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line"># 根据业务情况，执行相应的构建命令, 示例如下</span>
<span class="line"># clean工程</span>
<span class="line">hvigorw clean --no-daemon</span>
<span class="line"># 构建Hap, 生成产物：\${PROJECT_PATH}/{moduleName}/build/{productName}/outputs/{targetName}/xxx.hap</span>
<span class="line">hvigorw assembleHap --mode module -p product=default -p buildMode=debug --no-daemon</span>
<span class="line"># 构建Hsp, 生成产物：\${PROJECT_PATH}/{moduleName}/build/{productName}/outputs/{targetName}/(xxx.har | xxx.hsp)</span>
<span class="line">hvigorw assembleHsp --mode module -p module=library@default -p product=default --no-daemon</span>
<span class="line"># 构建Har, 生成产物：\${PROJECT_PATH}/{moduleName}/build/{productName}/outputs/{targetName}/outputs/xxx.har</span>
<span class="line">hvigorw assembleHar --mode module -p module=library1@default -p product=default --no-daemon</span>
<span class="line"># 构建App, 生成产物: \${PROJECT_PATH}/build/outputs/{productName}/xxx.app</span>
<span class="line">hvigorw assembleApp --mode project -p product=default -p buildMode=debug --no-daemon</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>表1 HarmonyOS应用构建常用扩展参数</li></ul>`,51),n("table",null,[n("thead",null,[n("tr",null,[n("th",null,"选项"),n("th",null,"说明")])]),n("tbody",null,[n("tr",null,[n("td",{debug:"","|":"",release:""},"-p buildMode="),n("td",null,"采用debug/release模式进行编译构建。 缺省时：构建Hap/Hsp/Har时为debug模式，构建App时为release模式。")]),n("tr",null,[n("td",{ProductName:""},"-p product="),n("td",null,"指定product进行编译, 编译product下配置的module target。 缺省时：默认为default。")]),n("tr",null,[n("td",{TargetName:""},"-p module={ModuleName}@"),n("td",null,"指定模块及target进行编译，可指定多个相同类型的模块进行编译以逗号分割；TargetName不指定时默认为default。 限制：此参数需要与--mode module参数搭配使用。 缺省时：执行AssembleHap任务会编译工程下所有模块，默认指定target为default。")]),n("tr",null,[n("td",{true:"","|":"",false:""},"-p ohos-test-coverage="),n("td",null,"执行测试框架代码覆盖率插桩编译。")])])],-1),e('<ul><li>表2 HarmonyOS应用编译构建相关任务</li></ul><table><thead><tr><th>选项</th><th>说明</th></tr></thead><tbody><tr><td>clean</td><td>清理构建产物</td></tr><tr><td>assembleHap</td><td>构建Hap应用</td></tr><tr><td>assembleApp</td><td>构建App应用</td></tr><tr><td>assembleHsp</td><td>构建Hsp包</td></tr><tr><td>assembleHar</td><td>构建Har包</td></tr></tbody></table><h4 id="b-签名" tabindex="-1"><a class="header-anchor" href="#b-签名"><span>b. 签名</span></a></h4><h6 id="签名方式" tabindex="-1"><a class="header-anchor" href="#签名方式"><span>签名方式</span></a></h6><ol><li>自动签名 (Auto Signing)：通过 DevEco Studio 自动生成并配置调试证书，适合日常真机调试。</li></ol><ul><li><strong>操作方式</strong>：在 IDE 的 <code>Signing Configs</code>​ 中勾选 <strong>Automatically generate signature</strong>。</li><li><strong>资源文件获取</strong>：自动连接<strong>华为开发者帐号</strong>在线获取（需要连接外网）。</li></ul><hr><ol start="2"><li>手动签名 (Manual Signing)：由开发者自行管理密钥库文件，根据证书来源和工具不同分为两个子类：A. 官方渠道方式 (标准 App 开发)在官网申请合规证书后，在 IDE 中手动关联文件。</li></ol><ul><li><strong>操作方式</strong>：在 <code>Signing Configs</code>​ 中手动填入 <code>.p12</code>​、<code>.cer</code>​、<code>.p7b</code> 文件路径。</li><li><strong>资源文件获取</strong>：从 AppGallery Connect 或华为开发者联盟后台申请下载。</li></ul><p>B. 命令行方式 (系统级/定制化开发)使用内置工具对 HAP 包进行特权签名。</p><ul><li><strong>操作方式</strong>：使用 <strong>​</strong><code>hap-sign-tool</code><strong>​</strong> 命令行工具，通过指令配置私有密钥和 Profile。</li><li><strong>资源文件获取</strong>：从本地的 OpenHarmony SDK 中获取：秘钥库、Profile 证书、签名工具等文件。</li></ul><hr><h6 id="签名流程" tabindex="-1"><a class="header-anchor" href="#签名流程"><span>签名流程</span></a></h6><p>这里介绍的是以命令行方式进行手动签名的方法，签名所需文件如下：</p><ul><li>签名密钥库文件：<code>OpenHarmony.p12</code></li><li>​<code>Profile</code>​ 签名证书：<code>OpenHarmonyProfileRelease.pem</code>​、<code>OpenHarmonyProfileDebug.pem</code></li><li>​<code>Profile</code>​ 模板文件：<code>UnsgnedReleasedProfileTemplate.json</code>​、<code>UnsgnedDebugProfileTemplate.json</code></li><li>签名工具：<code>hap-sign-tool.jar</code></li></ul><p>以上文件可在SDK中会获得（也可以在 <a href="https://gitee.com/openharmony/developtools_hapsigner/tree/master/dist" target="_blank" rel="noopener noreferrer">dist · OpenHarmony/developtools_hapsigner</a> 里获取）：</p><figure><img src="'+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><hr><ul><li>​<code>rootCA.cer</code>：OpenHarmony 系统内置根签名文件</li><li>​<code>subCA.cer</code>：OpenHarmony 系统内置中间签名文件</li></ul><p>上述文件可以在 <a href="https://gitee.com/openharmony/developtools_hapsigner/tree/master/autosign/result" target="_blank" rel="noopener noreferrer">autosign/result · OpenHarmony/developtools_hapsigner</a> 里获取</p><hr><ol><li>生成密钥对(.p12)</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">java -jar hap-sign-tool.jar generate-keypair -keyAlias &quot;oh-app1-key-v1&quot; -keyAlg &quot;ECC&quot;  -keySize &quot;NIST-P-256&quot; -keystoreFile &quot;OpenHarmony.p12&quot; -keyPwd &quot;123456&quot; -keystorePwd &quot;123456&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>接口说明：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line"> generate-keypair : 生成密钥对</span>
<span class="line">     ├── -keyAlias          # 密钥别名，必填项，不区分大小写</span>
<span class="line">     ├── -keyPwd            # 密钥口令，可选项</span>
<span class="line">     ├── -keyAlg            # 密钥算法，必填项，包括RSA/ECC</span>
<span class="line">     ├── -keySize           # 密钥长度，必填项，RSA算法的长度为2048/3072/4096，ECC算法的长度NIST-P-256/NIST-P-384</span>
<span class="line">     ├── -keystoreFile      # 密钥库文件，必填项</span>
<span class="line">     ├── -keystorePwd       # 密钥库口令，可选项</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>生成应用签名证书(.pem)</li></ol><ul><li>格式： PEM（Privacy Enhanced Mail）是一种文本格式，使用 Base64 编码。</li><li>内容结构： .pem 格式的优势在于它可以包含多个证书，按照顺序堆叠在一起，从而形成完整的证书链 (Certificate Chain)（即：您的应用证书 + 中间 CA 证书 + 根 CA 证书）。</li><li>鸿蒙中使用： 在鸿蒙的 OpenHarmony 或某些手动签名场景中，appCertFile 参数要求传入的证书链通常是合并后的 .pem 格式。</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">java -jar hap-sign-tool.jar generate-app-cert -keyAlias &quot;oh-app1-key-v1&quot; -signAlg &quot;SHA256withECDSA&quot;  -issuer &quot;C=CN,O=OpenHarmony,OU=OpenHarmony Team,CN= OpenHarmony Application CA&quot; -issuerKeyAlias &quot;openharmony application ca&quot; -subject &quot;C=CN,O=OpenHarmony,OU=OpenHarmony Team,CN=OpenHarmony Application Release&quot; -keystoreFile &quot;OpenHarmony.p12&quot; -subCaCertFile &quot;subCA.cer&quot; -rootCaCertFile &quot;rootCA.cer&quot; -outForm &quot;certChain&quot; -outFile &quot;app1.pem&quot; -keyPwd &quot;123456&quot; -keystorePwd &quot;123456&quot; -issuerKeyPwd &quot;123456&quot; -validity &quot;365&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>接口说明：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">generate-app-cert：生成应用签名证书</span>
<span class="line">    ├── -keyAlias         # 用于生成应用签名证书的密钥别名，请与第一步生成密钥对的密钥别名-keyAlias保持一致</span>
<span class="line">    ├── -signAlg          # 签名算法，必填项，包括 SHA256withECDSA / SHA384withECDSA</span>
<span class="line">    ├── -issuer           # 颁发者主题，填写已提供的中间CA证书主题，该参数必填且不能修改</span>
<span class="line">    ├── -issuerKeyAlias   # 颁发者密钥别名，填写中间CA证书密钥别名，该参数必填且不能修改</span>
<span class="line">    ├── -subject          # 证书主题，请参照命令实例中内容保证顺序不变，该参数必填</span>
<span class="line">    ├── -issuerKeyPwd     # 颁发者密钥口令，填写中间CA证书密钥口令，该参数必填，指定“123456”，不可修改</span>
<span class="line">    ├── -keystoreFile     # 密钥库文件，指定使用提供的OpenHarmony.p12密钥库文件，该参数必填且不可修改</span>
<span class="line">    ├── -rootCaCertFile   # 根CA证书文件，指定为已提供的根CA证书，该参数必填且不可修改</span>
<span class="line">    ├── -subCaCertFile    # 中间CA证书文件，指定为已提供的中间CA证书，该参数必填且不可修改</span>
<span class="line">    ├── -outForm          # 输出证书文件格式，推荐使用certChain</span>
<span class="line">    ├── -outFile          # 可选项，建议填写，不填则默认输出到控制台</span>
<span class="line">    ├── -keyPwd           # 密钥口令，可选项，为第一步生成的密钥对口令</span>
<span class="line">    ├── -keystorePwd      # 密钥库口令，默认为“123456”</span>
<span class="line">    ├── -validity         # 证书有效期，可选项，默认为3650天</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>生成Profile文件(.p7b)</li></ol><ul><li>Profile模板文件中会定义当前应用名称&quot;bundle-name&quot;、应用的权限等级&quot;apl&quot;。</li><li>权限等级有normal、system_basic、system_core三种，默认等级为normal。</li><li>应用名称改为用户自定义的包名即可</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  &quot;version-name&quot;: &quot;2.0.0&quot;,                                                     // 应用版本号（供显示）</span>
<span class="line">  &quot;version-code&quot;: 2,                                                           // 应用内部版本代码（每次更新需递增）</span>
<span class="line">  &quot;app-distribution-type&quot;: &quot;os_integration&quot;,                                   // 应用分发渠道（如 os_integration, app_gallery）</span>
<span class="line">  &quot;uuid&quot;: &quot;5027b99e-5f9e-465d-9508-a9e0134ffe18&quot;,                              // 配置文件的唯一标识</span>
<span class="line">  &quot;validity&quot;: {                                                                // 配置文件的有效期范围</span>
<span class="line">    &quot;not-before&quot;: 1594865258,</span>
<span class="line">    &quot;not-after&quot;: 1689473258</span>
<span class="line">  },</span>
<span class="line">  &quot;type&quot;: &quot;release&quot;,                                                           // 配置文件类型（debug 或 release）</span>
<span class="line">  &quot;bundle-info&quot;: {                                                             // 应用包和开发者信息容器</span>
<span class="line">    &quot;developer-id&quot;: &quot;OpenHarmony&quot;,</span>
<span class="line">    // 发布版应用的签名证书内容</span>
<span class="line">    &quot;distribution-certificate&quot;: &quot;-----BEGIN CERTIFICATE-----\\nMIICFTCCAZmgAwIBAgIEFRGSbjAMBggqhkjOPQQDAwUAMGMxCzAJBgNVBAYTAkNO\\nMRQwEgYDVQQKEwtPcGVuSGFybW9ueTEZMBcGA1UECxMQT3Blbkhhcm1vbnkgVGVh\\nbTEjMCEGA1UEAxMaT3Blbkhhcm1vbnkgQXBwbGljYXRpb24gQ0EwHhcNMjIwNDAy\\nMDY1OTA4WhcNMzIwMzMwMDY1OTA4WjBKMRUwEwYDVQQDDAxpZGVfZGVtb19hcHAx\\nDTALBgNVBAsTBFVuaXQxFTATBgNVBAoTDE9yZ2FuaXphdGlvbjELMAkGA1UEBhMC\\nQ04wWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAARGc9ftjM6ncln8AqF0AhTsyphc\\nhmKWktwgsZwisqy7X+clViYnbw9WpRRoxJYeZ6GL3MUiOHiM9UDpwOmjdYPOo1Iw\\nUDAdBgNVHQ4EFgQUG91q9tKNxBRQgQFzfuSnhrP/mKcwDgYDVR0PAQH/BAQDAgeA\\nMB8GA1UdIwQYMBaAFNuGtyIW1QuhS7fdJXu58QV9oi1HMAwGCCqGSM49BAMDBQAD\\naAAwZQIweNK78cfmJdBVSMowMukZoIevBFNRNVYaUxxWpbn+X2Y9x8STmxqHhPj6\\np0wKd9qnAjEAuU/AuW9NO04joHCJnM0I2PkDWJKw+eJiVc3ggLAOJTE9TfXyN0JM\\nUdjqqzpQQj4u\\n-----END CERTIFICATE-----\\n&quot;,</span>
<span class="line">    &quot;bundle-name&quot;: &quot;com.example.zjxapp&quot;,                                       // 应用的唯一包名</span>
<span class="line">    &quot;apl&quot;: &quot;system_core&quot;,                                                      // 应用权限级别（Ability Privilege Level，如 system_core）</span>
<span class="line">    &quot;app-feature&quot;: &quot;hos_system_app&quot;                                            // 应用类型标识（如 hos_system_app）</span>
<span class="line">  },</span>
<span class="line">  &quot;acls&quot;: {                                                                    // 访问控制列表</span>
<span class="line">    &quot;allowed-acls&quot;: [</span>
<span class="line">      &quot;&quot;</span>
<span class="line">    ]</span>
<span class="line">  },</span>
<span class="line">  &quot;permissions&quot;: {                                                             // 应用请求的受限权限列表</span>
<span class="line">    &quot;restricted-permissions&quot;: [</span>
<span class="line">     </span>
<span class="line">    ]</span>
<span class="line">  },</span>
<span class="line">  &quot;issuer&quot;: &quot;pki_internal&quot;                                                     // 配置文件颁发者</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 hap-sign-tool.jar 工具生成签名Profile。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">java -jar hap-sign-tool.jar  sign-profile -keyAlias &quot;openharmony application profile release&quot; -signAlg &quot;SHA256withECDSA&quot; -mode &quot;localSign&quot; -profileCertFile &quot;OpenHarmonyProfileRelease.pem&quot; -inFile &quot;UnsgnedReleasedProfileTemplate.json&quot; -keystoreFile &quot;OpenHarmony.p12&quot; -outFile &quot;app1-profile.p7b&quot; -keyPwd &quot;123456&quot; -keystorePwd &quot;123456&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>接口说明：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">sign-profile : ProvisionProfile文件签名</span>
<span class="line">      ├── -mode            # 签名模式，必填项，包括localSign，remoteSign</span>
<span class="line">      ├── -keyAlias        # 密钥别名，必填项，不区分大小写</span>
<span class="line">      ├── -keyPwd          # 密钥口令，可选项</span>
<span class="line">      ├── -profileCertFile # Profile签名证书（证书链，顺序为实体证书-中间CA证书-根证书），必填项</span>
<span class="line">      ├── -inFile          # 输入的原始Provision Profile文件，必填项</span>
<span class="line">      ├── -signAlg         # 签名算法，必填项，包括SHA256withECDSA / SHA384withECDSA</span>
<span class="line">      ├── -keystoreFile    # 密钥库文件，localSign模式时为必填项</span>
<span class="line">      ├── -keystorePwd     # 密钥库口令，可选项</span>
<span class="line">      ├── -outFile         # 输出签名后的Provision Profile文件，p7b格式，必填项</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>生成签名应用包经过上面的步骤之后，得到了如下信息：</li></ol><ul><li>Store file(*.p12)：OpenHarmony.12</li><li>keyAlias：oh-app1-key-v1</li><li>Store Password：123456</li><li>key Password：123456</li><li>Profile file(*.p7b)：app1-profile.p7b</li><li>certChain file(*.pem)：app1.pem</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">java -jar hap-sign-tool.jar sign-app -keyAlias &quot;oh-app1-key-v1&quot; -signAlg &quot;SHA256withECDSA&quot; -mode &quot;localSign&quot; -appCertFile &quot;app1.pem&quot; -profileFile &quot;app1-profile.p7b&quot; -inFile &quot;app1-unsigned.zip&quot; -keystoreFile &quot;OpenHarmony.p12&quot; -outFile &quot;app1-signed.hap&quot; -keyPwd &quot;123456&quot; -keystorePwd &quot;123456&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>接口说明：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">sign-app : 应用包和二进制工具签名</span>
<span class="line">      ├── -mode          # 签名模式，必填项，包括localSign，remoteSign</span>
<span class="line">      ├── -keyAlias      # 密钥别名，必填项，不区分大小写</span>
<span class="line">      ├── -keyPwd        # 密钥口令，可选项</span>
<span class="line">      ├── -appCertFile   # 应用签名证书文件（证书链，顺序为实体证书-中间CA证书-根证书），必填项</span>
<span class="line">      ├── -profileFile   # 签名后的Provision Profile文件名，profileSigned为1时为p7b格式，profileSigned为0时为json格式，应用包签名必填项，二进制工具签名选填</span>
<span class="line">      ├── -profileSigned # 指示profile文件是否带有签名，1表示有签名，0表示没有签名，默认为1。可选项</span>
<span class="line">      ├── -inForm        # 输入的原始文件的格式，枚举值：zip、elf或bin；zip应用包对应zip，二进制工具对应elf，bin应用包为bin，默认zip；可选项</span>
<span class="line">      ├── -inFile        # 输入的原始文件，应用包、elf或bin文件，必填项</span>
<span class="line">      ├── -signAlg       # 签名算法，必填项，包括SHA256withECDSA / SHA384withECDSA</span>
<span class="line">      ├── -keystoreFile  # 密钥库文件，localSign模式时为必填项</span>
<span class="line">      ├── -keystorePwd   # 密钥库口令，可选项</span>
<span class="line">      ├── -outFile       # 输出签名后的包文件，必填项</span>
<span class="line">      ├── -signCode      # 是否启用代码签名，1表示开启代码签名，0表示关闭代码签名。可选项。默认对hap、hsp、hqf、elf开启代码签名，通过参数配置为0关闭。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="c-部署" tabindex="-1"><a class="header-anchor" href="#c-部署"><span>c. 部署</span></a></h4><p>略</p><hr><p>‍</p>`,46)]))}const b=a(c,[["render",o],["__file","11-harmonyos-host-app.html.vue"]]),g=JSON.parse('{"path":"/GameEngine/Unreal/Platform/HarmonyOS/11-harmonyos-host-app.html","title":"HarmonyOS 宿主应用搭建","lang":"en-US","frontmatter":{"date":"2025-12-25T00:00:00.000Z","tag":["Unreal Engine","OpenHarmony","HarmonyOS","鸿蒙"]},"git":{"createdTime":1782388552000,"updatedTime":1782474564000,"contributors":[{"name":"BanMing","username":"BanMing","email":"ban-ming@foxmail.com","commits":3,"url":"https://github.com/BanMing"},{"name":"Claude Opus 4.7","username":"Claude Opus 4.7","email":"noreply@anthropic.com","commits":3,"url":"https://github.com/Claude Opus 4.7"}]},"readingTime":{"minutes":16.82,"words":5046},"filePathRelative":"GameEngine/Unreal/Platform/HarmonyOS/11-harmonyos-host-app.md","localizedDate":"December 25, 2025","excerpt":"\\n<h2>一. 环境准备‌</h2>\\n<table>\\n<thead>\\n<tr>\\n<th>步骤</th>\\n<th>详细说明</th>\\n<th>关键配置与要求</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>安装 DevEco Studio</td>\\n<td>下载并安装最新版官方 IDE。   <code>DevEco Studio提供开箱即用的开发体验，将HarmonyOS SDK、Node.js、Hvigor、OHPM、模拟器平台等进行合一打包，简化DevEco Studio安装配置流程。</code></td>\\n<td>建议使用最新稳定版 DevEco Studio。</td>\\n</tr>\\n<tr>\\n<td>SDK</td>\\n<td>HarmonyOS SDK已嵌入DevEco Studio中，无需额外下载配置。   <code>HarmonyOS SDK可以在DevEco Studio安装位置下DevEco Studio\\\\sdk目录中查看。如需进行OpenHarmony应用开发，可通过File &gt; Settings &gt; OpenHarmony SDK页签下载OpenHarmony SDK。</code></td>\\n<td></td>\\n</tr>\\n<tr>\\n<td>开发者账号</td>\\n<td>注册华为开发者账号，完成实名认证（企业或个人）。</td>\\n<td>必须实名认证才能申请正式证书。</td>\\n</tr>\\n</tbody>\\n</table>"}');export{b as comp,g as data};
