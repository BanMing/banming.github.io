import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as a,f as e,o as l}from"./app-_JojGnWZ.js";const p={};function t(i,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="eks-ec2-日志采集到-s3-与查询分析实战" tabindex="-1"><a class="header-anchor" href="#eks-ec2-日志采集到-s3-与查询分析实战"><span>EKS/EC2 日志采集到 S3 与查询分析实战</span></a></h1><p>一套把容器和主机日志统一收到 S3、再按需查询的链路：fluent-bit 负责采集(EKS 用 DaemonSet,EC2 用 systemd 服务),日志落到 S3 后,要全文检索就用 Logstash 灌进 OpenSearch,临时排查就直接用 Athena 跑 SQL。下面的桶名、路径、endpoint 都换成了占位符,配置结构保持原样。</p><h2 id="fluent-bit-采集-eks-pod-日志到-s3" tabindex="-1"><a class="header-anchor" href="#fluent-bit-采集-eks-pod-日志到-s3"><span>fluent-bit 采集 EKS Pod 日志到 S3</span></a></h2><p>EKS 里用 DaemonSet 部署 fluent-bit,每个节点跑一个实例收集该节点上的容器日志。需要的 YAML 大致是 ServiceAccount + ClusterRole + ClusterRoleBinding + ConfigMap + DaemonSet 这一套。</p><p>ServiceAccount 通过 IRSA 绑定 IAM 角色(<code>eks.amazonaws.com/role-arn</code> 注解),这样 fluent-bit 写 S3 不必塞静态 AK/SK:</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> fluent<span class="token punctuation">-</span>bit</span>
<span class="line">  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default</span>
<span class="line">  <span class="token key atrule">annotations</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">eks.amazonaws.com/role-arn</span><span class="token punctuation">:</span> aws_iam_role.eks_role.arn</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ClusterRole 给它读 namespace/pod/log/node/event 的权限,再用 ClusterRoleBinding 绑到上面的 ServiceAccount:</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> fluent<span class="token punctuation">-</span>bit<span class="token punctuation">-</span>role</span>
<span class="line"><span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;namespaces&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;pods&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;pods/log&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;nodes&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;events&quot;</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">---</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> fluent<span class="token punctuation">-</span>bit<span class="token punctuation">-</span>role<span class="token punctuation">-</span>binding</span>
<span class="line"><span class="token key atrule">roleRef</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io</span>
<span class="line">  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole</span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> fluent<span class="token punctuation">-</span>bit<span class="token punctuation">-</span>role</span>
<span class="line"><span class="token key atrule">subjects</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount</span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> fluent<span class="token punctuation">-</span>bit</span>
<span class="line">    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>核心是 ConfigMap 里的 <code>fluent-bit.conf</code>。INPUT 用 <code>tail</code> 收 <code>/var/log/containers/</code> 下指定服务的日志,OUTPUT 用 <code>s3</code> 插件按时间和 TAG 切分上传:</p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">SERVICE</span><span class="token punctuation">]</span></span></span>
<span class="line">    Flush                   1</span>
<span class="line">    Log_Level               info</span>
<span class="line">    Parsers_File            parsers.conf</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">INPUT</span><span class="token punctuation">]</span></span></span>
<span class="line">    Name                    tail</span>
<span class="line">    Parser                  docker</span>
<span class="line">    Path                    /var/log/containers/serviceA*.log,/var/log/containers/serviceB*.log  # 只收这几个服务的日志</span>
<span class="line">    Tag                     &lt;pod_name&gt;</span>
<span class="line">    Tag_Regex               (?&lt;pod_name&gt;[a-z0-9](?:[-a-z0-9]*[a-z0-9])?(?:\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*)_(?&lt;namespace_name&gt;[^_]+)_(?&lt;container_name&gt;.+)-(?&lt;container_id&gt;[a-z0-9]{64})\\.log$</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">FILTER</span><span class="token punctuation">]</span></span></span>
<span class="line">    Name                    kubernetes</span>
<span class="line">    Match                   kube.*</span>
<span class="line">    Kube_Tag_Prefix         kube.var.log.containers.</span>
<span class="line">    Regex_Parser            custom-tag   # 解析 TAG,使 INPUT 里能用 pod_name 命名 TAG</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">OUTPUT</span><span class="token punctuation">]</span></span></span>
<span class="line">    Name                    s3</span>
<span class="line">    Match                   *</span>
<span class="line">    bucket                  my-pod-logs-bucket</span>
<span class="line">    region                  ap-southeast-1</span>
<span class="line">    total_file_size         5M           # 单文件最大 5MB</span>
<span class="line">    upload_timeout          20m          # 每 20 分钟触发一次上传</span>
<span class="line">    store_dir               /buffers</span>
<span class="line">    store_dir_limit_size    2G           # 缓存达到 2G 后不再接收,按实际调整</span>
<span class="line">    s3_key_format           /logs/%Y-%m-%d/$TAG/%Y%m%d-%H-%M-%S-$UUID.log  # S3 上的路径与文件名</span>
<span class="line">    json_date_key           false</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>parsers.conf</code> 配两个解析器,一个解 docker 的 JSON 时间戳,一个用正则从 TAG 里抠出 namespace/pod/container:</p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">PARSER</span><span class="token punctuation">]</span></span></span>
<span class="line">    Name                  docker</span>
<span class="line">    Format                json</span>
<span class="line">    Time_Key              time</span>
<span class="line">    Time_Format           %Y-%m-%dT%H:%M:%S.%L</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">PARSER</span><span class="token punctuation">]</span></span></span>
<span class="line">    Name                  custom-tag</span>
<span class="line">    Format                regex</span>
<span class="line">    Regex                 ^(?&lt;namespace_name&gt;[^_]+)\\.(?&lt;pod_name&gt;[a-z0-9](?:[-a-z0-9]*[a-z0-9])?(?:\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*)\\.(?&lt;container_name&gt;.+)\\.(?&lt;container_id&gt;[a-z0-9]{64})</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DaemonSet 把 <code>/var/log</code> 和上面的 ConfigMap 挂进容器。镜像用 <code>fluent/fluent-bit:3.2.6-amd64</code>,凭据从 Secret 注入(若已用 IRSA 可省掉这段 env):</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> fluent<span class="token punctuation">-</span>bit</span>
<span class="line">  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">selector</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">name</span><span class="token punctuation">:</span> fluent<span class="token punctuation">-</span>bit</span>
<span class="line">  <span class="token key atrule">template</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">labels</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">name</span><span class="token punctuation">:</span> fluent<span class="token punctuation">-</span>bit</span>
<span class="line">    <span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> fluent<span class="token punctuation">-</span>bit</span>
<span class="line">      <span class="token key atrule">containers</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> fluent<span class="token punctuation">-</span>bit</span>
<span class="line">          <span class="token key atrule">image</span><span class="token punctuation">:</span> fluent/fluent<span class="token punctuation">-</span>bit<span class="token punctuation">:</span>3.2.6<span class="token punctuation">-</span>amd64</span>
<span class="line">          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent</span>
<span class="line">          <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> AWS_ACCESS_KEY_ID</span>
<span class="line">              <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span></span>
<span class="line">                <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span></span>
<span class="line">                  <span class="token key atrule">name</span><span class="token punctuation">:</span> aws<span class="token punctuation">-</span>ec2<span class="token punctuation">-</span>access<span class="token punctuation">-</span>secret</span>
<span class="line">                  <span class="token key atrule">key</span><span class="token punctuation">:</span> access_key</span>
<span class="line">            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> AWS_SECRET_ACCESS_KEY</span>
<span class="line">              <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span></span>
<span class="line">                <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span></span>
<span class="line">                  <span class="token key atrule">name</span><span class="token punctuation">:</span> aws<span class="token punctuation">-</span>ec2<span class="token punctuation">-</span>access<span class="token punctuation">-</span>secret</span>
<span class="line">                  <span class="token key atrule">key</span><span class="token punctuation">:</span> secret_key</span>
<span class="line">          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> varlog</span>
<span class="line">              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/log</span>
<span class="line">            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config</span>
<span class="line">              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /fluent<span class="token punctuation">-</span>bit/etc</span>
<span class="line">      <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> varlog</span>
<span class="line">          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">path</span><span class="token punctuation">:</span> /var/log</span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config</span>
<span class="line">          <span class="token key atrule">configMap</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">name</span><span class="token punctuation">:</span> fluent<span class="token punctuation">-</span>bit<span class="token punctuation">-</span>config</span>
<span class="line">      <span class="token key atrule">dnsPolicy</span><span class="token punctuation">:</span> ClusterFirst</span>
<span class="line">      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整套用 kustomize 组织,<code>kustomization.yaml</code> 把这几个 resource 串起来一把 apply:</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kustomize.config.k8s.io/v1beta1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Kustomization</span>
<span class="line"><span class="token key atrule">resources</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> cluster<span class="token punctuation">-</span>role.yaml</span>
<span class="line">  <span class="token punctuation">-</span> cluster<span class="token punctuation">-</span>role<span class="token punctuation">-</span>binding.yaml</span>
<span class="line">  <span class="token punctuation">-</span> configmap.yaml</span>
<span class="line">  <span class="token punctuation">-</span> serviceaccount.yaml</span>
<span class="line">  <span class="token punctuation">-</span> daemonset.yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="fluent-bit-采集-ec2-amazon-linux-2-日志到-s3" tabindex="-1"><a class="header-anchor" href="#fluent-bit-采集-ec2-amazon-linux-2-日志到-s3"><span>fluent-bit 采集 EC2(Amazon Linux 2)日志到 S3</span></a></h2><p>非容器的 EC2 主机用安装脚本装 fluent-bit,然后配置文件 + systemd 服务跑起来。</p><p>安装(总是装最新发布版):</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token function">curl</span> https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh <span class="token operator">|</span> <span class="token function">sh</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><code>/etc/fluent-bit/fluent-bit.conf</code> 的关键是 OUTPUT 段,和 EKS 那套思路一样,只是 INPUT 换成主机侧来源(这里示例用 http,实际可换 tail/cpu 等):</p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">SERVICE</span><span class="token punctuation">]</span></span></span>
<span class="line">    flush         1</span>
<span class="line">    daemon        Off</span>
<span class="line">    log_level     info</span>
<span class="line">    parsers_file  parsers.conf</span>
<span class="line">    plugins_file  plugins.conf</span>
<span class="line">    storage.metrics on</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">INPUT</span><span class="token punctuation">]</span></span></span>
<span class="line">    name   http</span>
<span class="line">    listen 0.0.0.0</span>
<span class="line">    port   8080</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">OUTPUT</span><span class="token punctuation">]</span></span></span>
<span class="line">    Name                  s3</span>
<span class="line">    Match                 *</span>
<span class="line">    bucket                my-ec2-logs-bucket</span>
<span class="line">    region                ap-southeast-1</span>
<span class="line">    total_file_size       5M</span>
<span class="line">    upload_timeout        5m</span>
<span class="line">    retry_limit           100</span>
<span class="line">    store_dir             /buffers</span>
<span class="line">    store_dir_limit_size  3G</span>
<span class="line">    s3_key_format_tag_delimiters _</span>
<span class="line">    s3_key_format         /logs/host-logs/$TAG[0]/%Y-%m-%d/$TAG-$UUID.log</span>
<span class="line">    json_date_key         false</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>systemd 服务文件 <code>/usr/lib/systemd/system/fluent-bit.service</code>,注意把 AWS 凭据/配置路径用 Environment 指出来:</p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">Fluent Bit</span></span>
<span class="line"><span class="token key attr-name">Documentation</span><span class="token punctuation">=</span><span class="token value attr-value">https://docs.fluentbit.io/manual/</span></span>
<span class="line"><span class="token key attr-name">Requires</span><span class="token punctuation">=</span><span class="token value attr-value">network.target</span></span>
<span class="line"><span class="token key attr-name">After</span><span class="token punctuation">=</span><span class="token value attr-value">network.target</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">Type</span><span class="token punctuation">=</span><span class="token value attr-value">simple</span></span>
<span class="line"><span class="token key attr-name">Environment</span><span class="token punctuation">=</span><span class="token value attr-value">&quot;<span class="token inner-value">HOME=/root</span>&quot;</span></span>
<span class="line"><span class="token key attr-name">Environment</span><span class="token punctuation">=</span><span class="token value attr-value">&quot;<span class="token inner-value">AWS_CONFIG_FILE=/root/.aws/config</span>&quot;</span></span>
<span class="line"><span class="token key attr-name">Environment</span><span class="token punctuation">=</span><span class="token value attr-value">&quot;<span class="token inner-value">AWS_SHARED_CREDENTIALS_FILE=/root/.aws/credentials</span>&quot;</span></span>
<span class="line"><span class="token key attr-name">EnvironmentFile</span><span class="token punctuation">=</span><span class="token value attr-value">-/etc/sysconfig/fluent-bit</span></span>
<span class="line"><span class="token key attr-name">EnvironmentFile</span><span class="token punctuation">=</span><span class="token value attr-value">-/etc/default/fluent-bit</span></span>
<span class="line"><span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/opt/fluent-bit/bin/fluent-bit -c /etc/fluent-bit/fluent-bit.conf</span></span>
<span class="line"><span class="token key attr-name">Restart</span><span class="token punctuation">=</span><span class="token value attr-value">always</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后 <code>systemctl enable --now fluent-bit</code> 即可。</p><h2 id="logstash-从-s3-拉日志写入-opensearch" tabindex="-1"><a class="header-anchor" href="#logstash-从-s3-拉日志写入-opensearch"><span>Logstash 从 S3 拉日志写入 OpenSearch</span></a></h2><p>要对落到 S3 的日志做全文检索,用 Logstash 做中转。要发 OpenSearch 2.x,Logstash 得装 8 以上版本。</p><p>装仓库和包:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token function">sudo</span> <span class="token function">rpm</span> <span class="token parameter variable">--import</span> https://artifacts.elastic.co/GPG-KEY-elasticsearch</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">tee</span> /etc/yum.repos.d/logstash.repo <span class="token operator">&lt;&lt;</span><span class="token string">EOF</span>
<span class="line">[logstash-8.x]</span>
<span class="line">name=Elastic repository for 8.x packages</span>
<span class="line">baseurl=https://artifacts.elastic.co/packages/8.x/yum</span>
<span class="line">gpgcheck=1</span>
<span class="line">gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch</span>
<span class="line">enabled=1</span>
<span class="line">autorefresh=1</span>
<span class="line">type=rpm-md</span>
<span class="line">EOF</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> logstash</span>
<span class="line"><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> logstash</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>logstash.conf</code> 三段:input 从 S3 指定前缀拉 JSON 日志;filter 用 grok 从 S3 路径里抠出 pod 名、再解析日志正文字段;output 写 OpenSearch:</p><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb"><pre><code><span class="line">input <span class="token punctuation">{</span></span>
<span class="line">  s3 <span class="token punctuation">{</span></span>
<span class="line">    access_key_id     <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;access_key_id&quot;</span></span></span>
<span class="line">    secret_access_key <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;secret_access_key&quot;</span></span></span>
<span class="line">    region            <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;ap-southeast-1&quot;</span></span></span>
<span class="line">    bucket            <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;my-pod-logs-bucket&quot;</span></span></span>
<span class="line">    prefix            <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;logs/2025-03-04&quot;</span></span>        <span class="token comment"># 只收这个目录下的日志</span></span>
<span class="line">    interval          <span class="token operator">=&gt;</span> <span class="token number">60</span>                        <span class="token comment"># 拉取间隔(秒)</span></span>
<span class="line">    type              <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;s3-logs&quot;</span></span></span>
<span class="line">    codec             <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;json&quot;</span></span></span>
<span class="line">    include_object_properties <span class="token operator">=&gt;</span> <span class="token boolean">true</span>              <span class="token comment"># 带上 S3 元信息,后面解析路径要用</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">filter <span class="token punctuation">{</span></span>
<span class="line">  mutate <span class="token punctuation">{</span></span>
<span class="line">    add_field <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token string-literal"><span class="token string">&quot;path&quot;</span></span> <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;%{[@metadata][s3][key]}&quot;</span></span> <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  grok <span class="token punctuation">{</span></span>
<span class="line">    match <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&quot;path&quot;</span></span> <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;logs/(?&lt;date&gt;\\d{4}-\\d{2}-\\d{2})/%{NOTSPACE:pod_name}/(?&lt;raw&gt;.+)&quot;</span></span>  <span class="token comment"># 从 S3 路径里抠 pod 名</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    tag_on_failure <span class="token operator">=&gt;</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;_s3_path_parse_failed&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  grok <span class="token punctuation">{</span></span>
<span class="line">    match <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&quot;log&quot;</span></span> <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;%{TIMESTAMP_ISO8601:system_time} %{WORD:stream} %{WORD:flag} %{LOGLEVEL:log_level} %{TIMESTAMP_ISO8601:app_time}\\s(?&lt;raw&gt;.+)&quot;</span></span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">output <span class="token punctuation">{</span></span>
<span class="line">  stdout <span class="token punctuation">{</span> codec <span class="token operator">=&gt;</span> rubydebug <span class="token punctuation">}</span></span>
<span class="line">  opensearch <span class="token punctuation">{</span></span>
<span class="line">    hosts    <span class="token operator">=&gt;</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;https://search-my-domain-xxxxxxxxxxxxxxxxxx.ap-southeast-1.es.amazonaws.com:443&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">    index    <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;logstash-s3-logs&quot;</span></span></span>
<span class="line">    user     <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;admin&quot;</span></span></span>
<span class="line">    password <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;&lt;your-opensearch-password&gt;&quot;</span></span></span>
<span class="line">    ssl      <span class="token operator">=&gt;</span> <span class="token boolean">true</span></span>
<span class="line">    ssl_certificate_verification <span class="token operator">=&gt;</span> <span class="token boolean">false</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调 grok 表达式时 <a href="https://grokdebugger.com/" target="_blank" rel="noopener noreferrer">grokdebugger</a> 很省事,内置 pattern 参照 <a href="https://github.com/logstash-plugins/logstash-patterns-core" target="_blank" rel="noopener noreferrer">logstash-patterns-core</a>。OpenSearch 输出插件见 <a href="https://github.com/opensearch-project/logstash-output-opensearch" target="_blank" rel="noopener noreferrer">logstash-output-opensearch</a>。</p><h2 id="athena-直接查-s3-上的日志" tabindex="-1"><a class="header-anchor" href="#athena-直接查-s3-上的日志"><span>Athena 直接查 S3 上的日志</span></a></h2><p>只是临时排查、不想搭 OpenSearch 时,Athena 直接对 S3 跑 SQL 更轻。</p><p>先给执行身份配好 IAM 权限,至少包含:<code>AmazonAthenaFullAccess</code>、<code>AmazonS3FullAccess</code>、<code>AWSGlueConsoleFullAccess</code>(用到 KMS 的话再加对应 KMS 策略)。在 Athena 控制台设好查询结果的输出位置。</p><p>建库建表,表的 <code>LOCATION</code> 指向日志所在的 S3 前缀,用 JSON SerDe 把每行当作一个 <code>log</code> 字段:</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> logs_db<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">CREATE</span> EXTERNAL <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> logs_db<span class="token punctuation">.</span>logs <span class="token punctuation">(</span></span>
<span class="line">  log STRING</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">ROW</span> FORMAT SERDE <span class="token string">&#39;org.openx.data.jsonserde.JsonSerDe&#39;</span></span>
<span class="line"><span class="token keyword">WITH</span> SERDEPROPERTIES <span class="token punctuation">(</span><span class="token string">&#39;paths&#39;</span> <span class="token operator">=</span> <span class="token string">&#39;log&#39;</span><span class="token punctuation">)</span></span>
<span class="line">LOCATION <span class="token string">&#39;s3://my-pod-logs-bucket/logs/2025-02-20/app-0&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就能像查表一样过滤日志,比如捞所有 ERROR:</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span></span>
<span class="line"><span class="token keyword">FROM</span> logs_db<span class="token punctuation">.</span>logs</span>
<span class="line"><span class="token keyword">WHERE</span> regexp_like<span class="token punctuation">(</span>log<span class="token punctuation">,</span> <span class="token string">&#39;ERROR&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,39)]))}const u=n(p,[["render",t],["__file","logging.html.vue"]]),r=JSON.parse('{"path":"/Basic/cloud/AWS/logging.html","title":"EKS/EC2 日志采集到 S3 与查询分析实战","lang":"en-US","frontmatter":{"date":"2024-08-26T04:41:10.000Z","tag":["Basic","Cloud","AWS"]},"git":{"createdTime":1782480255000,"updatedTime":1782480255000,"contributors":[{"name":"BanMing","username":"BanMing","email":"ban-ming@foxmail.com","commits":1,"url":"https://github.com/BanMing"},{"name":"Claude Opus 4.7","username":"Claude Opus 4.7","email":"noreply@anthropic.com","commits":1,"url":"https://github.com/Claude Opus 4.7"}]},"readingTime":{"minutes":4.68,"words":1403},"filePathRelative":"Basic/cloud/AWS/logging.md","localizedDate":"August 26, 2024","excerpt":"\\n<p>一套把容器和主机日志统一收到 S3、再按需查询的链路：fluent-bit 负责采集(EKS 用 DaemonSet,EC2 用 systemd 服务),日志落到 S3 后,要全文检索就用 Logstash 灌进 OpenSearch,临时排查就直接用 Athena 跑 SQL。下面的桶名、路径、endpoint 都换成了占位符,配置结构保持原样。</p>\\n<h2>fluent-bit 采集 EKS Pod 日志到 S3</h2>\\n<p>EKS 里用 DaemonSet 部署 fluent-bit,每个节点跑一个实例收集该节点上的容器日志。需要的 YAML 大致是 ServiceAccount + ClusterRole + ClusterRoleBinding + ConfigMap + DaemonSet 这一套。</p>"}');export{u as comp,r as data};
