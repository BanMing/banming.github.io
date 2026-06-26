import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e,f as s,o as i}from"./app-A-4qaVhC.js";const l="/assets/0199eaee-9f48-73f8-ac23-b175aba0537b-BCRRUwhf.png",t="/assets/0199eaee-e59b-7039-b837-5b3d07b50cbf-CIQlHn-3.png",r={};function d(c,a){return i(),e("div",null,a[0]||(a[0]=[s(`<h1 id="gcs-initialization-update" tabindex="-1"><a class="header-anchor" href="#gcs-initialization-update"><span>GCS Initialization &amp; Update</span></a></h1><p>在介绍GCS在运行时如何去使用配置的CameraDirector, CameraRig和Transition内容前，先简单回顾下上一节中介绍的 <strong>IGameplayCameraSystemHost</strong> 。</p><p><strong>IGameplayCameraSystemHost</strong> 是虚幻引擎 Gameplay Camera System (GCS) 的核心接口，GCS 的启动依赖于至少存在一个实现此接口的宿主对象。该接口定义了摄像机系统宿主必须遵守的行为和访问规则，负责管理和维护自身的摄像机评估器实例（FCameraSystemEvaluator​）。</p><p>系统在运行时会根据 PlayerController 的 PlayerCameraManager​ 或当前 ViewTarget​，动态选定唯一一个激活的宿主作为摄像机系统的主体控制者，确保摄像机评估和视角切换由该集中化宿主统一管理。</p><p>对原版摄像机系统的主要影响包括：</p><ul><li>若支持 GCS 的 PlayerCameraManager​ 存在，实现了接口的摄像机组件由该 PlayerCameraManager​ 统一管理和调度ViewTarget变化， 以及GCS的更新；</li><li>若无支持 GCS 的 PlayerCameraManager​，实现了接口的摄像机组件将独立维护和管理自身摄像机系统；</li><li>支持 GCS 的 PlayerCameraManager​会确保原版的摄像机流程在 GCS 环境下也能正常工作。</li></ul><div class="hint-container info"><p class="hint-container-title">Info</p><p>“支持GCS 的 PlayerCameraManager​&quot; 是指项目配置了实现 IGameplayCameraSystemHost 接口的 AGameplayCamerasPlayerCameraManager（及其派生类）作为 PlayerCameraManager</p></div><h2 id="gcs-的初始化" tabindex="-1"><a class="header-anchor" href="#gcs-的初始化"><span>GCS 的初始化</span></a></h2><p>为了方便理解GCS各种子系统之间的关系，这里主要以 UGameplayCameraComponent 来展开。</p><h3 id="仅存在-ugameplaycameracomponent" tabindex="-1"><a class="header-anchor" href="#仅存在-ugameplaycameracomponent"><span>仅存在 UGameplayCameraComponent</span></a></h3><img src="https://www.plantuml.com/plantuml/svg/bPFDJiCm3CVlVGeVEmbUO0T4L_6n0wBI-3XRdUaYsgHAt6rmGq92I3m0Gd3ameMt6Zm6IRhHbHKXUcWRvsVxRoVUDOoQgo8FC6MbONHbc8gWj4QHYX8bm-a15bJcU1NRhyPO5QMI97c0XW0DE4FB8KeiJ3fMahNASzAEIk8Miry7gzFjJJ6lqAMte5jqeKj8AEa2qvn7ZEcby_0_GP1fLPKmb885vkBQev1ebP8n0TYdJWRRErvo7mQK2UcqXZs_xwpDRfIoc29JdNrVwRggeHpJF5px_uTlqv7mfs4BM5Uq1Kbb9hs0v7XLpxdWYQhuE-GOelPvc6KelpX2YHdf3abxqbIQrhj-g0ntLlxTmXOU9gYnC7-Nkt5GNSLEX5aLknxF-VRXWBZpUYpLkhM3_RbxkljkBF7wdZIyoxfIjk5OkqZ515fa4mPriVBRO67nylfvz_RhWAmVusavjWs2Cq6p4zGPiS-Jn4vN4lTXHDpiXSSpIJfo0zcbn_4D0Ol7zyN3pUBv_bSXyF5qQwSIPz9BshKlE_5V" alt=""><ul><li>当前环境下，实现IGameplayCameraSystemHost​ 的 Host 只有UGameplayCameraComponent​。</li><li>​UGameplayCameraComponent​ 会在组件初始化的时候先触发Activate，然后通过Beginplay进行初始化。</li><li>在执行 ActivateCameraEvaluationContext​ 方法时，组件自身的摄像机评估上下文会被注册并加入到 IGameplayCameraSystemHost​ 持有的评估器 FCameraSystemEvaluator​ 中。</li></ul><h3 id="在playercontroller中配置gcs的playercameramanager" tabindex="-1"><a class="header-anchor" href="#在playercontroller中配置gcs的playercameramanager"><span>在PlayerController中配置GCS的PlayerCameraManager</span></a></h3><img src="https://www.plantuml.com/plantuml/svg/VPHDReCm48NtdC9BkkW5K1KbHKdQHIJK9DsFmZIn2ZQoXwJf1NgABhlfmQeUesC38H1I5e3nzuRvUJ2s18RAF0jWGzg8vT4Iva713-L65g18J98CZcXYhSZeB4CZm8eaxZ9poB5WBkQh0LjB_6812hQDQj4B3GVbD_ZQsLbt0yOwBxH2HVTWqGdSWuvWLe5L_jCzP2MuUXXrYo6qXgHMhZHyeoN1vjKf_4qGR8qk2_6e98cB5fmI2WGVrLl5xOWhZ4IYBJcLX4o-uucquOs7axW1bmMNFT2g7hY8H1jkfatOpwR15oT-gcnfyBmbROGqxF6S2DApnCCAp1Pf83ogj6d7kaY1K5I3KwbeTVrEC17vSvn9Bly9lTMwjNbcKfAkAfziIExhj9ja6BbeHo_VCyINv5eUYPbKQUkROvo1jNV_-Mfq5ibjjA5yNbns9U8Hz5jqPIJTA2i4ashknzbO7jWhOHTslep476dGqJNirWxsLlNqi9rhlB9sooUbtTLOU26i94hpc8tSxaZebqPtmOgVpw_VZ--htwktpfXF_8lv0m00" alt=""><ul><li>TeardownCameraSystemHost 的函数实际上不会做任何事， 因为它上面的GCS并不会初始化。</li><li>和之前的区别是，整个内容的更新是在GCS的PlayerCameraManager的SetViewTarget(APawn) 时处理的。</li></ul><h2 id="gcs-的运行核心" tabindex="-1"><a class="header-anchor" href="#gcs-的运行核心"><span>GCS 的运行核心</span></a></h2><p>FCameraSystemEvaluator 是 GCS 的运行核心，负责驱动摄像机系统的状态更新与计算。它根据时间变化中的影响推动摄像机各节点的动态行为，实现摄像机视角的平滑切换及动态调整。</p><p>​IGameplayCameraSystemHost​ 持有一个共享指针，管理对该评估器的访问：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">/** 摄像机系统评估器 */</span>
<span class="line">TSharedPtr&lt;FCameraSystemEvaluator&gt; CameraSystemEvaluator;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>摄像机评估器的初始化过程在宿主对象中简单明了：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">void IGameplayCameraSystemHost::InitializeCameraSystem()</span>
<span class="line">{</span>
<span class="line">    FCameraSystemEvaluatorCreateParams Params;</span>
<span class="line">    Params.Owner = GetAsObject();   // 将宿主对象作为评估器的Owner</span>
<span class="line">    CameraSystemEvaluator = MakeShared&lt;FCameraSystemEvaluator&gt;();</span>
<span class="line">    CameraSystemEvaluator-&gt;Initialize(Params);  // 内部进行完整初始化</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>GCS通过每帧调用宿主接口，驱动评估器刷新摄像机系统状态：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">void IGameplayCameraSystemHost::UpdateCameraSystem(float DeltaTime)</span>
<span class="line">{</span>
<span class="line">    if (CameraSystemEvaluator)</span>
<span class="line">    {</span>
<span class="line">        FCameraSystemEvaluationParams Params;</span>
<span class="line">        Params.DeltaTime = DeltaTime;    // 传递帧时间增量</span>
<span class="line">        CameraSystemEvaluator-&gt;Update(Params);   // 基于时间更新摄像机状态</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由此完成了摄像机逻辑的时序驱动。</p><h3 id="fcamerasystemevaluator" tabindex="-1"><a class="header-anchor" href="#fcamerasystemevaluator"><span>FCameraSystemEvaluator</span></a></h3><p>为了帮助理解，以下是 FCameraSystemEvaluator 初始化流程的简化示例代码：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// 简化版本</span>
<span class="line">void FCameraSystemEvaluator::Initialize(...)</span>
<span class="line">{</span>
<span class="line">	WeakOwner = IGameplayCameraSystemHost;   // 弱指针	</span>
<span class="line">	Role = Game;    // ECameraSystemEvaluatorRole</span>
<span class="line">	RootNode = NewObject&lt;UDefaultRootCameraNode&gt;(Owner, TEXT(&quot;RootNode&quot;));   	// 创建摄像机节点树根节点</span>
<span class="line"></span>
<span class="line">	ContextStack.Initialize(*this);    // 初始化摄像机评估上下文堆栈</span>
<span class="line">	</span>
<span class="line">	// 构造根摄像机节点评估器，对应RootNode节点</span>
<span class="line">	FCameraNodeEvaluatorTreeBuildParams BuildParams;</span>
<span class="line">	BuildParams.RootCameraNode = RootNode;</span>
<span class="line">	RootEvaluator = static_cast&lt;FRootCameraNodeEvaluator*&gt;(RootEvaluatorStorage.BuildEvaluatorTree(BuildParams));</span>
<span class="line">	</span>
<span class="line">	// ... 可在此注册扩展服务 ...</span>
<span class="line"></span>
<span class="line">	// 初始化根评估器，构建完整评估器树结构</span>
<span class="line">	FCameraNodeEvaluatorInitializeParams InitParams;</span>
<span class="line">	InitParams.Evaluator = this;</span>
<span class="line">	RootEvaluator-&gt;Initialize(InitParams, RootNodeResult);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>​RootNode​ 是摄像机节点树的根，是所有摄像机节点的父节点。</li><li>​ContextStack​ 管理多个运行时的摄像机评估上下文，支持灵活切换。</li><li>​RootEvaluator​ 负责对整棵摄像机评估器树进行构建，并执行评估流程。</li><li>初始化阶段完成摄像机的评估树准备，待Tick调用进行更新计算。</li></ul><h3 id="fcameraevaluationcontext" tabindex="-1"><a class="header-anchor" href="#fcameraevaluationcontext"><span>FCameraEvaluationContext</span></a></h3><p>FCameraEvaluationContext 提供了CameraRig运行时的上下文数据，该上下文对象会存储在 FCameraSystemEvaluator 的 ContextStack​ 中，便于摄像机状态在多上下文间切换及存储。</p><p>参考代码片段：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">class FCameraEvaluationContext : public TSharedFromThis&lt;FCameraEvaluationContext&gt;</span>
<span class="line">{</span>
<span class="line">protected:</span>
<span class="line">	TWeakObjectPtr&lt;&gt; WeakOwner;</span>
<span class="line">	TWeakObjectPtr&lt;APlayerController&gt; WeakPlayerController;</span>
<span class="line">	</span>
<span class="line">	/** 当前上下文托管的摄像机资产 */</span>
<span class="line">	TObjectPtr&lt;const UCameraAsset&gt; CameraAsset;</span>
<span class="line">	</span>
<span class="line">	/** CameraAsset中所有CameraRig初步计算结果，用于获得摄像机位置等信息 */</span>
<span class="line">	FCameraNodeEvaluationResult InitialResult;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">void FCameraEvaluationContext::Initialize(const FCameraEvaluationContextInitializeParams&amp; Params)</span>
<span class="line">{</span>
<span class="line">	WeakOwner = Params.Owner;</span>
<span class="line">	CameraAsset = Params.CameraAsset;</span>
<span class="line">	WeakPlayerController = Params.PlayerController;</span>
<span class="line"></span>
<span class="line">	if (CameraAsset)</span>
<span class="line">	{</span>
<span class="line">		const FCameraAssetAllocationInfo&amp; AllocationInfo = CameraAsset-&gt;GetAllocationInfo();</span>
<span class="line">		InitialResult.VariableTable.Initialize(AllocationInfo.VariableTableInfo);</span>
<span class="line">		InitialResult.ContextDataTable.Initialize(AllocationInfo.ContextDataTableInfo);</span>
<span class="line">	}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>​CameraAsset​ 是运行时摄像机配置的资产，是GCS的核心数据之一。</li><li>​InitialResult​ 提供了摄像机Rig的初步评估数据，是后续动态计算依据。</li></ul><h4 id="fgameplaycameracomponentevaluationcontext" tabindex="-1"><a class="header-anchor" href="#fgameplaycameracomponentevaluationcontext"><span>FGameplayCameraComponentEvaluationContext</span></a></h4><p>FCameraEvaluationContext 的派生类，UGameplayCameraComponent 的私有数据。</p><p>UGameplayCameraComponent 运行时会根据配置的 CameraAsset 构建 FCameraEvaluationContext ，交由 FCameraSystemEvaluator 处理。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">class UGameplayCameraComponent  </span>
<span class="line">{</span>
<span class="line">	TSharedPtr&lt;FGameplayCameraComponentEvaluationContext&gt; EvaluationContext;</span>
<span class="line">	</span>
<span class="line">	// TryCreateCameraEvaluationContext(..)</span>
<span class="line">	EvaluationContext = MakeShared&lt;FGameplayCameraComponentEvaluationContext&gt;();</span>
<span class="line">	</span>
<span class="line">	FCameraEvaluationContextInitializeParams InitParams;</span>
<span class="line">	InitParams.Owner = this;</span>
<span class="line">	InitParams.CameraAsset = CameraAsset;     // 配置的CameraAsset</span>
<span class="line">	InitParams.PlayerController = PlayerController;</span>
<span class="line">	EvaluationContext-&gt;Initialize(InitParams);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">/**</span>
<span class="line"> * 针对Gameplay摄像机组件的评估上下文，继承自FCameraEvaluationContext</span>
<span class="line"> */</span>
<span class="line">class FGameplayCameraComponentEvaluationContext : public FCameraEvaluationContext;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="factorcameraevaluationcontext" tabindex="-1"><a class="header-anchor" href="#factorcameraevaluationcontext"><span>FActorCameraEvaluationContext</span></a></h4><p>FCameraEvaluationContext 的派生类，专门用于将非GameplayCameraSystem体系下的摄像机数据（通常来自Actor或CameraComponent）封装为GCS可以识别和计算的上下文环境。</p><p>它主要完成的工作是：</p><ul><li>接收AActor或UCameraComponent实例，</li><li>程序化地构造一个简化的CameraAsset（仅含有复制Actor摄像机属性的节点），</li><li>提供静态辅助函数完成视图信息到评估结果的转换。</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// 参考代码</span>
<span class="line">UCameraAsset* FActorCameraEvaluationContext::MakeCalcCameraActorCameraAsset(ViewTargetActor)</span>
<span class="line">{</span>
<span class="line">	UCalcCameraActorCameraNode* WrapperCameraNode = NewObject&lt;UCalcCameraActorCameraNode&gt;(ViewTargetActor, NAME_None, RF_Transient);	</span>
<span class="line">	</span>
<span class="line">	UCameraRigAsset* CameraRig = NewObject&lt;UCameraRigAsset&gt;(ViewTargetActor, NAME_None, RF_Transient);</span>
<span class="line">	CameraRig-&gt;RootNode = WrapperCameraNode;</span>
<span class="line"></span>
<span class="line">	USingleCameraDirector* SingleDirector = NewObject&lt;USingleCameraDirector&gt;(ViewTargetActor, NAME_None, RF_Transient);</span>
<span class="line">	SingleDirector-&gt;CameraRig = CameraRig;</span>
<span class="line"></span>
<span class="line">	UCameraAsset* CameraAsset = NewObject&lt;UCameraAsset&gt;(ViewTargetActor, NAME_None, RF_Transient);</span>
<span class="line">	CameraAsset-&gt;SetCameraDirector(SingleDirector);</span>
<span class="line">	</span>
<span class="line">	return CameraAsset;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">//AGameplayCamerasPlayerCameraManager::SetViewTarget</span>
<span class="line">TSharedRef&lt;FActorCameraEvaluationContext&gt; NewContext = MakeShared&lt;FActorCameraEvaluationContext&gt;(ViewTargetActor);</span>
<span class="line">CameraSystemEvaluator-&gt;PushEvaluationContext(NewContext);</span>
<span class="line">ViewTargetContexts.Add(NewContext);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使得非GCS的ViewTarget Actor能够被Gameplay Cameras系统统一处理和计算，使旧有摄像机系统或自定义视角能顺利过渡至GCS框架内，提供向下兼容能力，提高系统整合度和灵活性。</p><h2 id="gcs-的更新流程" tabindex="-1"><a class="header-anchor" href="#gcs-的更新流程"><span>GCS 的更新流程</span></a></h2><p>下面介绍GCS的更新过程中关键节点</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// 简化版本</span>
<span class="line">void FCameraSystemEvaluator::UpdateImpl(float DeltaTime, ECameraNodeEvaluationType EvaluationType)</span>
<span class="line">{</span>
<span class="line">	// 预先调用各类服务的更新（如摄像机震动系统等），方便提前处理状态</span>
<span class="line">	PreUpdateServices(DeltaTime, ECameraEvaluationServiceFlags::None);</span>
<span class="line"></span>
<span class="line">	// 获取当前活动的摄像机评估上下文</span>
<span class="line">	TSharedPtr&lt;FCameraEvaluationContext&gt; ActiveContext = ContextStack.GetActiveContext();</span>
<span class="line"></span>
<span class="line">	// 执行摄像机导演（Director）逻辑，激活导演返回需要切换的Camera Rig</span>
<span class="line">	FCameraDirectorEvaluator* ActiveDirectorEvaluator = ActiveContext-&gt;GetDirectorEvaluator();</span>
<span class="line">	UpdateCameraDirector(DeltaTime, ActiveDirectorEvaluator);</span>
<span class="line"></span>
<span class="line">	// 运算摄像机节点树，计算当前摄像机最终输出结果</span>
<span class="line">	{</span>
<span class="line">		FCameraNodeEvaluationParams NodeParams;</span>
<span class="line">		NodeParams.Evaluator = this;</span>
<span class="line">		NodeParams.DeltaTime = DeltaTime;</span>
<span class="line">		NodeParams.EvaluationType = EvaluationType;</span>
<span class="line"></span>
<span class="line">		RootNodeResult.Reset();</span>
<span class="line"></span>
<span class="line">		RootEvaluator-&gt;Run(NodeParams, RootNodeResult);</span>
<span class="line"></span>
<span class="line">		RootNodeResult.bIsValid = true; // 标记结果有效</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	// 后处理所有更新服务，比如清理和状态同步等.</span>
<span class="line">	PostUpdateServices(DeltaTime, ECameraEvaluationServiceFlags::None);</span>
<span class="line"></span>
<span class="line">	// 收集并保存最终摄像机结果，用于后续渲染或逻辑使用</span>
<span class="line">	PreVisualResult.Reset(RootEvaluator-&gt;GetPreVisualLayerResult());</span>
<span class="line">	Result.Reset(RootNodeResult);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​UpdateCameraDirector​ 的主要职责是：</p><ul><li>执行摄像机导演（Director）评估器，获得摄像机导演的输出指令。</li><li>处理导演返回的摄像机Rig激活和反激活请求，分层执行这些请求以保证摄像机切换的合理性。</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// 运行摄像机导演评估器，获取CameraRig的变化请求</span>
<span class="line">CameraDirectorEvaluator-&gt;Run(DirectorParams, DirectorResult);</span>
<span class="line"></span>
<span class="line">// 在除“Main”层以外的所有层级执行激活/反激活请求</span>
<span class="line">RootEvaluator-&gt;ExecuteCameraDirectorRequest(OtherLayerRequest);</span>
<span class="line"></span>
<span class="line">// 对“Main”层的摄像机Rig激活请求进行合并处理后执行</span>
<span class="line">GetCombinedCameraRigRequest(MainLayerActivations, CombinedRequest);</span>
<span class="line">RootEvaluator-&gt;ExecuteCameraDirectorRequest(CombinedRequest);</span>
<span class="line"></span>
<span class="line">// 对“Main”层的摄像机Rig反激活请求同样进行合并后执行</span>
<span class="line">GetCombinedCameraRigRequest(MainLayerDeactivations, CombinedRequest);</span>
<span class="line">RootEvaluator-&gt;ExecuteCameraDirectorRequest(CombinedRequest);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cameranode-cameranodeevaluator" tabindex="-1"><a class="header-anchor" href="#cameranode-cameranodeevaluator"><span>CameraNode &amp; CameraNodeEvaluator</span></a></h3><p><img src="`+l+'" alt="" loading="lazy"><img src="'+t+`" alt="" loading="lazy"></p><ul><li>构建CameraRig的各种摄像机节点都由对应的评估器用于解析节点的数据，对CameraPos产生影响。</li><li>除了抽象基类 UCameraNode，派生的摄像机节点在重写OnBuildEvaluator中指定匹配的评估器。</li><li>根节点的评估器 RootEvaluator 会遍历激活的CameraRig中节点解析器，并将结果叠加生成最终的CameraPos信息。整个过程在FCameraSystemEvaluator的Update中完成。</li><li>摄像机评估器和摄像机节点一一对应，且根据CameraRig的激活状态进行刷新。</li></ul><p>CameraNodeEvaluator 工作流程</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// 初始化评估器，构建评估器完成后调用</span>
<span class="line">void FCollisionPushCameraNodeEvaluator::OnInitialize(const FCameraNodeEvaluatorInitializeParams&amp; Params, FCameraNodeEvaluationResult&amp; OutResult)</span>
<span class="line">{</span>
<span class="line">    // 设置节点评估器的标记，这里无特殊标记</span>
<span class="line">    SetNodeEvaluatorFlags(ECameraNodeEvaluatorFlags::None);</span>
<span class="line"></span>
<span class="line">    // 获取本节点对应的 UCollisionPushCameraNode 数据对象</span>
<span class="line">    const UCollisionPushCameraNode* CollisionPushNode = GetCameraNodeAs&lt;UCollisionPushCameraNode&gt;();</span>
<span class="line"></span>
<span class="line">    // 初始化各个参数读取器，从对应CameraNode配置中读取相关属性，支持动态绑定和读取</span>
<span class="line">    EnableCollisionReader.Initialize(CollisionPushNode-&gt;EnableCollision, true);             // 碰撞启用开关</span>
<span class="line">    CustomSafePositionReader.Initialize(CollisionPushNode-&gt;CustomSafePosition);             // 自定义安全位置</span>
<span class="line"></span>
<span class="line">    CollisionSphereRadiusReader.Initialize(CollisionPushNode-&gt;CollisionSphereRadius);       // 碰撞半径</span>
<span class="line">    SafePositionOffsetReader.Initialize(CollisionPushNode-&gt;SafePositionOffset);             // 安全位置偏移量</span>
<span class="line"></span>
<span class="line">    // 初始化推挤和平拉的插值器，若预设了插值器则使用其构建的双精度插值器，否则创建默认插值器</span>
<span class="line">    PushInterpolator = CollisionPushNode-&gt;PushInterpolator ?</span>
<span class="line">        CollisionPushNode-&gt;PushInterpolator-&gt;BuildDoubleInterpolator() :</span>
<span class="line">        MakeUnique&lt;TPopValueInterpolator&lt;double&gt;&gt;();</span>
<span class="line"></span>
<span class="line">    PullInterpolator = CollisionPushNode-&gt;PullInterpolator ?</span>
<span class="line">        CollisionPushNode-&gt;PullInterpolator-&gt;BuildDoubleInterpolator() :</span>
<span class="line">        MakeUnique&lt;TPopValueInterpolator&lt;double&gt;&gt;();</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">// 执行碰撞检测及摄像机位置的调整，保证摄像机视角不会穿墙或发生穿透</span>
<span class="line">void FCollisionPushCameraNodeEvaluator::OnRun(const FCameraNodeEvaluationParams&amp; Params, FCameraNodeEvaluationResult&amp; OutResult)</span>
<span class="line">{</span>
<span class="line">    UWorld* World = Params.EvaluationContext-&gt;GetWorld();</span>
<span class="line">    APlayerController* PlayerController = Params.EvaluationContext-&gt;GetPlayerController();</span>
<span class="line"></span>
<span class="line">    // 获取安全位置，如果无法获取则返回空值</span>
<span class="line">    TOptional&lt;FVector3d&gt; SafePosition = GetFinalSafePosition(Params, OutResult);</span>
<span class="line"></span>
<span class="line">    // 判断状态区的碰撞功能是否启用，若未启用，调用处理函数直接使用安全位置并返回</span>
<span class="line">    const bool bEnableCollision = EnableCollisionReader.Get(OutResult.VariableTable);</span>
<span class="line"></span>
<span class="line">    if (!bEnableCollision)</span>
<span class="line">    {</span>
<span class="line">        HandleDisabledCollision(SafePosition.GetValue(), Params, OutResult);</span>
<span class="line">        return;</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    // 如果当前评估类型非标准（如IK或无状态更新），跳过新碰撞检测逻辑</span>
<span class="line">    // 向前推摄像机位置与上一次推挤状态相结合，实现平滑效果</span>
<span class="line">    if (Params.EvaluationType != ECameraNodeEvaluationType::Standard)</span>
<span class="line">    {</span>
<span class="line">        if (SafePosition.IsSet())</span>
<span class="line">        {</span>
<span class="line">            const FVector3d CameraPoseLocation = OutResult.CameraPose.GetLocation();</span>
<span class="line">            const FVector3d PushedLocation = CameraPoseLocation + (SafePosition.GetValue() - CameraPoseLocation) * LastDampedPushFactor;</span>
<span class="line">            OutResult.CameraPose.SetLocation(PushedLocation);</span>
<span class="line">        }</span>
<span class="line">        return;</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    // 标准评估类型下，真正执行异步碰撞检测结果处理和新的碰撞检测逻辑</span>
<span class="line">    HandleAsyncCollisionTraceResult(World, SafePosition.GetValue(), Params, OutResult);</span>
<span class="line">    RunCollisionTrace(World, PlayerController, SafePosition.GetValue(), Params, OutResult);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>如果要理解其他的摄像机节点的运作方式，需要结合对应的评估器去调试。</li></ul><h2 id="gcs-获取结果" tabindex="-1"><a class="header-anchor" href="#gcs-获取结果"><span>GCS 获取结果</span></a></h2><p>最后的CameraPos 由更新的 RootNodeResult来生成，参考如下：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">void FCameraSystemEvaluator::GetEvaluatedCameraView(FMinimalViewInfo&amp; DesiredView)</span>
<span class="line">{</span>
<span class="line">	const FCameraPose&amp; CameraPose = RootNodeResult.CameraPose;</span>
<span class="line">	DesiredView.Location = CameraPose.GetLocation();</span>
<span class="line">	DesiredView.Rotation = CameraPose.GetRotation();</span>
<span class="line">	DesiredView.FOV = CameraPose.GetEffectiveFieldOfView();</span>
<span class="line">	DesiredView.DesiredFOV = DesiredView.FOV;</span>
<span class="line"></span>
<span class="line">	DesiredView.AspectRatio = CameraPose.GetSensorAspectRatio();</span>
<span class="line">	// 略</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gcs蓝图接口-动态激活camera-rig" tabindex="-1"><a class="header-anchor" href="#gcs蓝图接口-动态激活camera-rig"><span>GCS蓝图接口：动态激活Camera Rig</span></a></h2><p>GCS为蓝图提供了功能丰富的静态函数库 UActivateCameraRigFunctions​，能够在不同层级（Base, Global, Visual）动态激活新的摄像机Rig。其核心实现依赖于挂载在 APlayerController​ 上的组件 UControllerGameplayCameraEvaluationComponent​。示例代码如下：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">void UActivateCameraRigFunctions::ActivateCameraRigImpl(UObject* WorldContextObject, APlayerController* PlayerController, UCameraRigAsset* CameraRig, ECameraRigLayer EvaluationLayer)</span>
<span class="line">{</span>
<span class="line">	// 查询当前摄像机系统宿主</span>
<span class="line">	if (IGameplayCameraSystemHost* FoundHost = IGameplayCameraSystemHost::FindActiveHost(PlayerController))</span>
<span class="line">	{</span>
<span class="line">		UObject* FoundHostObject = FoundHost-&gt;GetAsObject();</span>
<span class="line">		AActor* HostOwningActor = Cast&lt;AActor&gt;(FoundHostObject);</span>
<span class="line">		bool bComponentCreated = false;</span>
<span class="line">		CameraEvaluationComponent = UControllerGameplayCameraEvaluationComponent::FindOrAddComponent(HostOwningActor, &amp;bComponentCreated);</span>
<span class="line">		if (bComponentCreated)</span>
<span class="line">		{</span>
<span class="line">			CameraEvaluationComponent-&gt;Initialize(FoundHost-&gt;GetAsScriptInterface(), PlayerController);</span>
<span class="line">		}</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	if (CameraEvaluationComponent)</span>
<span class="line">	{</span>
<span class="line">		CameraEvaluationComponent-&gt;ActivateCameraRig(CameraRig, EvaluationLayer);</span>
<span class="line">	}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,61)]))}const m=n(r,[["render",d],["__file","04-gcs-init-and-update.html.vue"]]),v=JSON.parse('{"path":"/GameEngine/Unreal/Camera/04-gcs-init-and-update.html","title":"GCS Initialization & Update","lang":"en-US","frontmatter":{"date":"2025-07-09T10:00:00.000Z","tag":["Unreal Engine","Camera","GCS"]},"git":{"createdTime":1782391349000,"updatedTime":1782391349000,"contributors":[{"name":"BanMing","username":"BanMing","email":"ban-ming@foxmail.com","commits":1,"url":"https://github.com/BanMing"},{"name":"Claude Opus 4.7","username":"Claude Opus 4.7","email":"noreply@anthropic.com","commits":1,"url":"https://github.com/Claude Opus 4.7"}]},"readingTime":{"minutes":9.51,"words":2853},"filePathRelative":"GameEngine/Unreal/Camera/04-gcs-init-and-update.md","localizedDate":"July 9, 2025","excerpt":"\\n<p>在介绍GCS在运行时如何去使用配置的CameraDirector, CameraRig和Transition内容前，先简单回顾下上一节中介绍的 <strong>IGameplayCameraSystemHost</strong> 。</p>\\n<p><strong>IGameplayCameraSystemHost</strong> 是虚幻引擎 Gameplay Camera System (GCS) 的核心接口，GCS 的启动依赖于至少存在一个实现此接口的宿主对象。该接口定义了摄像机系统宿主必须遵守的行为和访问规则，负责管理和维护自身的摄像机评估器实例（FCameraSystemEvaluator​）。</p>"}');export{m as comp,v as data};
