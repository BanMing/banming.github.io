import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as l}from"./app-DvVldQBV.js";const n="/assets/epub_36698085_27-58XGwy70.jpg",i="/assets/epub_36698085_28-BZES70Fx.jpg",o="/assets/epub_36698085_29-DJt3j8rR.jpg",r="/assets/epub_36698085_30-nDjBDt0q.jpg",p={},c=l('<h1 id="vector" tabindex="-1"><a class="header-anchor" href="#vector"><span>Vector</span></a></h1><p>实列网站：https://gabormakesgames.com/blog_vectors.html</p><p>因为浮点数比较计算会有不精确的时候，我们使用一个 <code>epsilon = 0.000001f</code> 的特定数值来比较。</p><h2 id="interpolation" tabindex="-1"><a class="header-anchor" href="#interpolation"><span>Interpolation</span></a></h2><p>计算出两个点之间的某一个位置</p><h3 id="lerp" tabindex="-1"><a class="header-anchor" href="#lerp"><span>lerp</span></a></h3><p>把两点之间的距离归一化得到一个插值<code>t</code></p><ul><li><code>t</code> = 0 ：插值结果为起点</li><li><code>t</code> = 1 ：插值结果为终点</li><li>0 &lt; <code>t</code> &lt; 1 ：插值结果为中间</li></ul><figure><img src="'+n+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="slerp" tabindex="-1"><a class="header-anchor" href="#slerp"><span>slerp</span></a></h3><p>以弧度值来做插值（spherical linear interpolation），与线性插值的对比如下：</p><figure><img src="'+i+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在我们知道了两个点之间的角度时，我们可以用以下公式来求插值结果：</p><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="nlerp" tabindex="-1"><a class="header-anchor" href="#nlerp"><span>nlerp</span></a></h3><p>他的插值移动速度不是固定的，而是要更快一些。就是把线性插值再做一次归一化。对比如下：</p><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="generally" tabindex="-1"><a class="header-anchor" href="#generally"><span>generally</span></a></h3><p><code>nlerp</code>是一个好的选择优于<code>slerp</code>。</p>',19),s=[c];function d(g,h){return t(),a("div",null,s)}const f=e(p,[["render",d],["__file","Vectors.html.vue"]]),u=JSON.parse('{"path":"/Animation/gameOpenGL/Vectors.html","title":"Vector","lang":"en-US","frontmatter":{"date":"2022-02-16T08:18:11.000Z","tag":["Math"],"order":2},"headers":[{"level":2,"title":"Interpolation","slug":"interpolation","link":"#interpolation","children":[{"level":3,"title":"lerp","slug":"lerp","link":"#lerp","children":[]},{"level":3,"title":"slerp","slug":"slerp","link":"#slerp","children":[]},{"level":3,"title":"nlerp","slug":"nlerp","link":"#nlerp","children":[]},{"level":3,"title":"generally","slug":"generally","link":"#generally","children":[]}]}],"git":{"createdTime":1644970691000,"updatedTime":1707215246000,"contributors":[{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":3},{"name":"BanMing","email":"ban-ming@foxmail.com","commits":2}]},"readingTime":{"minutes":0.73,"words":220},"filePathRelative":"Animation/gameOpenGL/Vectors.md","localizedDate":"February 16, 2022","excerpt":"\\n<p>实列网站：https://gabormakesgames.com/blog_vectors.html</p>\\n<p>因为浮点数比较计算会有不精确的时候，我们使用一个 <code>epsilon = 0.000001f</code> 的特定数值来比较。</p>\\n<h2>Interpolation</h2>\\n<p>计算出两个点之间的某一个位置</p>\\n<h3>lerp</h3>\\n<p>把两点之间的距离归一化得到一个插值<code>t</code></p>\\n<ul>\\n<li><code>t</code> = 0 ：插值结果为起点</li>\\n<li><code>t</code> = 1 ：插值结果为终点</li>\\n<li>0 &lt; <code>t</code> &lt; 1 ：插值结果为中间</li>\\n</ul>"}');export{f as comp,u as data};