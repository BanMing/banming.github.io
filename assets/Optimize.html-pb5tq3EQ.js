const t=JSON.parse('{"key":"v-686ff7d1","path":"/Basic/language/CSharp/Optimize.html","title":"优化","lang":"en-US","frontmatter":{"date":"2022-11-18T18:36:00.000Z","tag":["C#","Optimization"]},"headers":[{"level":2,"title":"字典GC","slug":"字典gc","link":"#字典gc","children":[]}],"git":{"createdTime":1699280150000,"updatedTime":1707212881000,"contributors":[{"name":"BanMing","email":"ban-ming@foxmail.com","commits":2},{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":2}]},"readingTime":{"minutes":0.47,"words":142},"filePathRelative":"Basic/language/CSharp/Optimize.md","localizedDate":"November 18, 2022","excerpt":"<h1> 优化</h1>\\n<h2> 字典GC</h2>\\n<p>当枚举和结构体为字典索引时，调用<code>Contain</code>方法是会拆箱装箱，则会出现GC。解决方案：</p>\\n<ul>\\n<li>把枚举转成int类型</li>\\n<li>结构体继承IEquatable接口，然后在创建一个继承IEqualityComparer的类用来对结构体作比较。把比较类实例化一个全局变量，在字典初始化时把全局比较工具对象传入字典即可。</li>\\n</ul>\\n<p>https://blog.csdn.net/qq_36576410/article/details/87909947\\nhttps://answer.uwa4d.com/question/59f716c0727b4a5d10c6dfef\\nhttps://stackoverflow.com/questions/50303424/why-is-dictionary-containskey-tostring-causing-gc-alloc\\nhttps://forum.unity.com/threads/solved-question-about-dictionary-any-vs-dictionary-containskey.589939/</p>"}');export{t as data};