import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,a as s,o as a}from"./app-Dpj6rX2I.js";const l="/assets/36698085_94-BOKV99lO.jpg",t="/assets/36698085_100-C2Qr5TTZ.jpg",d="/assets/36698085_101-DwapXhsG.jpg",o="/assets/36698085_99-dvXoJv6d.jpg",m={};function r(p,e){return a(),i("div",null,e[0]||(e[0]=[s('<h1 id="mesh-skinning" tabindex="-1"><a class="header-anchor" href="#mesh-skinning"><span>Mesh Skinning</span></a></h1><p>当一个网格和一个骨骼被创建。每个顶点会分配给一个或多个骨骼，这个过程叫做绑定（Rigging）。骨骼被创建时的姿势叫做绑定姿势(bind pose)，这个姿势把骨骼正好融合在网格内部。</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里我认为绑定姿势也就是我们在软件中编辑动画的基础姿势。骨骼和蒙皮之间的关系是配置好了的，如权重等。换句话说就是骨骼和蒙皮之间的距离是固定好了的。我们在计算其他姿势时就可以获得这个距离来计算其他姿势下蒙皮的 位置，因为骨骼的位置就是姿势的样子，在模型文件中已经存了数据。</p><h2 id="understand-how-a-skinned-mesh-is-different-from-a-non-skinnedmesh" tabindex="-1"><a class="header-anchor" href="#understand-how-a-skinned-mesh-is-different-from-a-non-skinnedmesh"><span>Understand how a skinned mesh is different from a non-skinnedmesh</span></a></h2><p>蒙皮是处理决定那个顶点应该被分配到那个骨骼上。一个顶点可以影响到多个骨骼。</p><ul><li>Rig skinning:每个顶点对应一个骨骼，把一个顶点乘以多个矩阵得到最后的坐标。在关节处不能自然的弯曲。通过将三角形的呃呃不同顶点分配给不同的骨头，可以避免在关节处（如肘部）的网格断裂。这样造成网格不能保持好体积，这样看起来很奇怪 <img src="'+t+'" alt="" loading="lazy"></li><li>Smooth skinning：顶点对应着多个骨骼。超过一个骨骼可以影响到一个顶点。每个影响都有一个权重，这个权重用于混合顶点。下图就是同一顶点影响两个骨骼的情况，我们取0.5的权重值。 <img src="'+d+'" alt="" loading="lazy"></li></ul><h2 id="understand-the-entire-skinning-pipeline" tabindex="-1"><a class="header-anchor" href="#understand-the-entire-skinning-pipeline"><span>Understand the entire skinning pipeline</span></a></h2><p>普通顶点管线和绑定蒙皮顶点关系对比： <img src="'+o+'" alt="" loading="lazy"></p><p><strong>我们需要明白一个目的，我们最终需要呈现在屏幕中是蒙皮，也就是说我们要渲染的是蒙皮。而在模型文件我们一般是存储的骨骼节点的位置，所以我们需要实时根据骨骼节点位置去计算出对应蒙皮三角形中顶点的位置。</strong></p><p>这就是为什们我们需要增加两个步骤的原因。这里为什么我们乘以绑定矩阵的逆就可以蒙皮空的坐标呢？</p><p>我们可以这样思考，把姿势看作矩阵:</p><ul><li>把绑定姿势作为基础姿势 <code>B</code> ，其他姿势 <code>C</code> 都可以通过绑定姿势乘以一个矩阵 <code>M</code> 得到，那么我们就可以得到公式: <code>C</code> = <code>B</code> * <code>M</code>。</li><li>现在有一个姿势 <code>C</code>，并且已知绑定姿势 <code>B</code>，就可以求到 <code>M</code> = <code>C</code> * inverse(<code>B</code>)</li><li>再使用 <code>M</code> 乘以蒙皮的顶点，就得到蒙皮点在这个姿势下模型空间位置。</li><li>后面就是可以一样的计算了。</li></ul><h2 id="implement-a-skeleton-class" tabindex="-1"><a class="header-anchor" href="#implement-a-skeleton-class"><span>Implement a skeleton class</span></a></h2><p>所有的绑定姿势和绑定姿势的逆都共享给所有游戏场景中的角色。</p><h2 id="load-the-bind-pose-of-a-skeleton-from-a-gltf-file" tabindex="-1"><a class="header-anchor" href="#load-the-bind-pose-of-a-skeleton-from-a-gltf-file"><span>Load the bind pose of a skeleton from a glTF file</span></a></h2><ul><li>加载rest姿势</li><li>读取有多少个<code>cgltf_skin</code></li><li>从每个皮肤中读取逆矩阵<code>inverse_bind_matrices</code></li><li>对逆矩阵取逆就可以获得节点的世界坐标</li><li>再根据世界坐标求到每个节点的本地坐标</li></ul><h2 id="implement-a-skinned-mesh-class" tabindex="-1"><a class="header-anchor" href="#implement-a-skinned-mesh-class"><span>Implement a skinned mesh class</span></a></h2><h2 id="load-skinned-meshes-from-a-gltf-file" tabindex="-1"><a class="header-anchor" href="#load-skinned-meshes-from-a-gltf-file"><span>Load skinned meshes from a gLTF file</span></a></h2><h2 id="implement-cpu-skinning" tabindex="-1"><a class="header-anchor" href="#implement-cpu-skinning"><span>Implement CPU skinning</span></a></h2><h2 id="implement-gpu-skinning" tabindex="-1"><a class="header-anchor" href="#implement-gpu-skinning"><span>Implement GPU skinning</span></a></h2>',21)]))}const g=n(m,[["render",r],["__file","MeshSkinning.html.vue"]]),f=JSON.parse('{"path":"/Animation/gameOpenGL/MeshSkinning.html","title":"Mesh Skinning","lang":"en-US","frontmatter":{"date":"2022-04-06T00:18:53.000Z","tag":["Animation"],"order":9},"headers":[{"level":2,"title":"Understand how a skinned mesh is different from a non-skinnedmesh","slug":"understand-how-a-skinned-mesh-is-different-from-a-non-skinnedmesh","link":"#understand-how-a-skinned-mesh-is-different-from-a-non-skinnedmesh","children":[]},{"level":2,"title":"Understand the entire skinning pipeline","slug":"understand-the-entire-skinning-pipeline","link":"#understand-the-entire-skinning-pipeline","children":[]},{"level":2,"title":"Implement a skeleton class","slug":"implement-a-skeleton-class","link":"#implement-a-skeleton-class","children":[]},{"level":2,"title":"Load the bind pose of a skeleton from a glTF file","slug":"load-the-bind-pose-of-a-skeleton-from-a-gltf-file","link":"#load-the-bind-pose-of-a-skeleton-from-a-gltf-file","children":[]},{"level":2,"title":"Implement a skinned mesh class","slug":"implement-a-skinned-mesh-class","link":"#implement-a-skinned-mesh-class","children":[]},{"level":2,"title":"Load skinned meshes from a gLTF file","slug":"load-skinned-meshes-from-a-gltf-file","link":"#load-skinned-meshes-from-a-gltf-file","children":[]},{"level":2,"title":"Implement CPU skinning","slug":"implement-cpu-skinning","link":"#implement-cpu-skinning","children":[]},{"level":2,"title":"Implement GPU skinning","slug":"implement-gpu-skinning","link":"#implement-gpu-skinning","children":[]}],"git":{"createdTime":1649175533000,"updatedTime":1707215246000,"contributors":[{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":3},{"name":"BanMing","email":"ban-ming@foxmail.com","commits":2}]},"readingTime":{"minutes":2.8,"words":840},"filePathRelative":"Animation/gameOpenGL/MeshSkinning.md","localizedDate":"April 6, 2022","excerpt":"\\n<p>当一个网格和一个骨骼被创建。每个顶点会分配给一个或多个骨骼，这个过程叫做绑定（Rigging）。骨骼被创建时的姿势叫做绑定姿势(bind pose)，这个姿势把骨骼正好融合在网格内部。</p>\\n<figure><figcaption></figcaption></figure>\\n<p>这里我认为绑定姿势也就是我们在软件中编辑动画的基础姿势。骨骼和蒙皮之间的关系是配置好了的，如权重等。换句话说就是骨骼和蒙皮之间的距离是固定好了的。我们在计算其他姿势时就可以获得这个距离来计算其他姿势下蒙皮的 位置，因为骨骼的位置就是姿势的样子，在模型文件中已经存了数据。</p>\\n<h2>Understand how a skinned mesh is different from a non-skinnedmesh</h2>"}');export{g as comp,f as data};