import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e,f as a,o as l}from"./app-_JojGnWZ.js";const i={};function c(p,s){return l(),e("div",null,s[0]||(s[0]=[a(`<h1 id="centos-7-根目录-lvm-扩容" tabindex="-1"><a class="header-anchor" href="#centos-7-根目录-lvm-扩容"><span>CentOS 7 根目录 LVM 扩容</span></a></h1><p>CentOS 默认用 LVM 管理磁盘,根目录满了不一定要重装。下面四种场景对应实际工作里最常碰到的几种情况:磁盘后面还有未分配空间、<code>/home</code> 占着空间但根目录不够、加了块新盘、在现有盘上新开分区。四种最后都落到同样三步:把空间塞进卷组 → <code>lvextend</code> 扩逻辑卷 → <code>xfs_growfs</code> 让文件系统认账。</p><p>开始前先 <code>lsblk</code> 看清楚现在的分区和卷组布局,<code>df -h</code> 看根目录还剩多少,别对着错的设备名敲命令。</p><h2 id="场景一-磁盘剩余空间扩到分区-再扩根目录" tabindex="-1"><a class="header-anchor" href="#场景一-磁盘剩余空间扩到分区-再扩根目录"><span>场景一:磁盘剩余空间扩到分区,再扩根目录</span></a></h2><p>适用于 <code>/dev/sda</code> 上分区 2 后面还有没分配的空间。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 查看磁盘情况</span></span>
<span class="line">lsblk</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将剩余可用空间分配到 /dev/sda2</span></span>
<span class="line"><span class="token function">parted</span> /dev/sda resizepart <span class="token number">2</span> <span class="token number">100</span>%</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 刷新物理卷</span></span>
<span class="line">pvresize /dev/sda2</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看 pv 的 Free 项是否显示了可用空间</span></span>
<span class="line">pvdisplay</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 扩展逻辑卷</span></span>
<span class="line">lvextend <span class="token parameter variable">-l</span> +100%FREE /dev/mapper/centos-root</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使扩展生效</span></span>
<span class="line">xfs_growfs /dev/mapper/centos-root</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看</span></span>
<span class="line"><span class="token function">df</span> <span class="token parameter variable">-h</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="场景二-把-home-的空间挪给根目录" tabindex="-1"><a class="header-anchor" href="#场景二-把-home-的空间挪给根目录"><span>场景二:把 /home 的空间挪给根目录</span></a></h2><p>很多默认安装把大半空间分给了 <code>/home</code>,实际用不到。这里先卸载 <code>/home</code>、删掉它的逻辑卷,把腾出来的空间给 <code>centos-root</code>,再重新建一个小的 <code>/home</code>。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 取消挂载 /home</span></span>
<span class="line"><span class="token function">umount</span> /home</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除 home 逻辑卷</span></span>
<span class="line">lvremove /dev/mapper/centos-home</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 把腾出的空间扩展到根目录</span></span>
<span class="line">lvextend <span class="token parameter variable">-L</span> +150G /dev/mapper/centos-root</span>
<span class="line"><span class="token comment"># 使扩展生效</span></span>
<span class="line">xfs_growfs /dev/mapper/centos-root</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新创建 home</span></span>
<span class="line">lvcreate <span class="token parameter variable">-L</span> 5G <span class="token parameter variable">-n</span> home centos</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建文件系统</span></span>
<span class="line">mkfs.xfs /dev/mapper/centos-home</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新挂载</span></span>
<span class="line"><span class="token function">mount</span> /dev/mapper/centos-home /home/</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看</span></span>
<span class="line"><span class="token function">df</span> <span class="token parameter variable">-h</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>卸载 <code>/home</code> 前确认没进程占用它(<code>lsof /home</code>),否则 <code>umount</code> 会报 busy。</p><h2 id="场景三-新增一块磁盘扩容" tabindex="-1"><a class="header-anchor" href="#场景三-新增一块磁盘扩容"><span>场景三:新增一块磁盘扩容</span></a></h2><p>加了块新盘(如 <code>/dev/sdb</code>),整盘做成物理卷加进卷组。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 查看磁盘情况</span></span>
<span class="line">lsblk</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建物理卷</span></span>
<span class="line">pvcreate /dev/sdb</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将磁盘扩展到卷组 centos</span></span>
<span class="line">vgextend centos /dev/sdb</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 扩展逻辑卷</span></span>
<span class="line">lvextend <span class="token parameter variable">-l</span> +100%FREE /dev/mapper/centos-root</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使扩展生效</span></span>
<span class="line">xfs_growfs /dev/mapper/centos-root</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看</span></span>
<span class="line"><span class="token function">df</span> <span class="token parameter variable">-h</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="场景四-在现有磁盘上新建分区扩容" tabindex="-1"><a class="header-anchor" href="#场景四-在现有磁盘上新建分区扩容"><span>场景四:在现有磁盘上新建分区扩容</span></a></h2><p>盘上还有空间但没法直接 <code>resizepart</code>(比如分区表里中间空着),就新建一个分区再做成 PV。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 新增分区 3(按 n,一路回车,最后 w 保存,q 退出)</span></span>
<span class="line"><span class="token function">fdisk</span> /dev/sda</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建物理卷(/dev/sda3 来自上一步的新建分区)</span></span>
<span class="line">pvcreate /dev/sda3</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将磁盘加入卷组 centos</span></span>
<span class="line">vgextend centos /dev/sda3</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 扩展逻辑卷</span></span>
<span class="line">lvextend <span class="token parameter variable">-l</span> +100%FREE /dev/mapper/centos-root</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使扩展生效</span></span>
<span class="line">xfs_growfs /dev/mapper/centos-root</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看</span></span>
<span class="line"><span class="token function">df</span> <span class="token parameter variable">-h</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>fdisk</code> 新建分区后内核可能没立刻识别,如果 <code>pvcreate</code> 找不到设备,跑一下 <code>partprobe</code> 或重启。XFS 用 <code>xfs_growfs</code>,如果根文件系统是 ext4 则换成 <code>resize2fs</code>。</p>`,17)]))}const r=n(i,[["render",c],["__file","centos-lvm-resize.html.vue"]]),m=JSON.parse('{"path":"/Basic/os/linux/centos-lvm-resize.html","title":"CentOS 7 根目录 LVM 扩容","lang":"en-US","frontmatter":{"date":"2024-11-08T04:07:55.000Z","tag":["Linux"]},"git":{"createdTime":1782546817000,"updatedTime":1782546817000,"contributors":[{"name":"BanMing","username":"BanMing","email":"ban-ming@foxmail.com","commits":1,"url":"https://github.com/BanMing"},{"name":"Claude Opus 4.7","username":"Claude Opus 4.7","email":"noreply@anthropic.com","commits":1,"url":"https://github.com/Claude Opus 4.7"}]},"readingTime":{"minutes":2.26,"words":677},"filePathRelative":"Basic/os/linux/centos-lvm-resize.md","localizedDate":"November 8, 2024","excerpt":"\\n<p>CentOS 默认用 LVM 管理磁盘,根目录满了不一定要重装。下面四种场景对应实际工作里最常碰到的几种情况:磁盘后面还有未分配空间、<code>/home</code> 占着空间但根目录不够、加了块新盘、在现有盘上新开分区。四种最后都落到同样三步:把空间塞进卷组 → <code>lvextend</code> 扩逻辑卷 → <code>xfs_growfs</code> 让文件系统认账。</p>\\n<p>开始前先 <code>lsblk</code> 看清楚现在的分区和卷组布局,<code>df -h</code> 看根目录还剩多少,别对着错的设备名敲命令。</p>\\n<h2>场景一:磁盘剩余空间扩到分区,再扩根目录</h2>"}');export{r as comp,m as data};
