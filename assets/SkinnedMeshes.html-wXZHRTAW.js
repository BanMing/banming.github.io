const n=JSON.parse('{"key":"v-e36cf204","path":"/Animation/CharacterAnimation/SkinnedMeshes.html","title":"Skinned Meshes","lang":"en-US","frontmatter":{"date":"2022-04-10T22:59:14.000Z","tag":["Animation","D3D"]},"headers":[{"level":2,"title":"Basics of bone hierarchies","slug":"basics-of-bone-hierarchies","link":"#basics-of-bone-hierarchies","children":[]},{"level":2,"title":"Loading bone hierarchies from an .x file","slug":"loading-bone-hierarchies-from-an-x-file","link":"#loading-bone-hierarchies-from-an-x-file","children":[]},{"level":2,"title":"Software skinning","slug":"software-skinning","link":"#software-skinning","children":[]},{"level":2,"title":"Hardware skinning","slug":"hardware-skinning","link":"#hardware-skinning","children":[]},{"level":2,"title":"Rendering static meshes in a bone hierarchy","slug":"rendering-static-meshes-in-a-bone-hierarchy","link":"#rendering-static-meshes-in-a-bone-hierarchy","children":[]}],"git":{"createdTime":1699280150000,"updatedTime":1707212040000,"contributors":[{"name":"BanMing","email":"ban-ming@foxmail.com","commits":4},{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":2}]},"readingTime":{"minutes":1.89,"words":568},"filePathRelative":"Animation/CharacterAnimation/SkinnedMeshes.md","localizedDate":"April 10, 2022","excerpt":"<h1> Skinned Meshes</h1>\\n<h2> Basics of bone hierarchies</h2>\\n<p>在DX9中使用<strong>LPD3DXFRAME</strong>作为基础的节点数据结构，内容有：</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">D3DXFRAME</span> <span class=\\"token punctuation\\">{</span>\\nLPSTR Name<span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//Name of bone</span>\\nD3DXMATRIX TransformationMatrix<span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//Local bone pos, rot &amp; sca</span>\\nLPD3DXMESHCONTAINER pMeshContainer<span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//Mesh connected to bone</span>\\nD3DXFRAME<span class=\\"token operator\\">*</span> pFrameSibling<span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//Sibling bone pointer</span>\\nD3DXFRAME<span class=\\"token operator\\">*</span> pFrameFirstChild<span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//First child bone</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{n as data};