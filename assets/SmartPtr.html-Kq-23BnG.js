const e=JSON.parse('{"key":"v-4886f182","path":"/Basic/language/Cplusplus/SmartPtr.html","title":"智能指针","lang":"en-US","frontmatter":{"date":"2023-03-15T19:20:37.000Z","tag":["C++"]},"headers":[{"level":2,"title":"unique_ptr","slug":"unique-ptr","link":"#unique-ptr","children":[]},{"level":2,"title":"weak_ptr","slug":"weak-ptr","link":"#weak-ptr","children":[]}],"git":{"createdTime":1699280150000,"updatedTime":1714063030000,"contributors":[{"name":"BanMing","email":"ban-ming@foxmail.com","commits":3},{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":2}]},"readingTime":{"minutes":2.09,"words":628},"filePathRelative":"Basic/language/Cplusplus/SmartPtr.md","localizedDate":"March 15, 2023","excerpt":"<h1> 智能指针</h1>\\n<h2> unique_ptr</h2>\\n<p>脱离作用域，该指针就会被释放。不能复制这个指针。</p>\\n<h2> weak_ptr</h2>\\n<p><code>std::weak_ptr</code> 是 C++11 标准库中的一个智能指针类型，用于解决 <code>std::shared_ptr</code> 循环引用的问题。<code>std::weak_ptr</code> 不控制所指向对象的生命周期，它只是观察一个由 <code>std::shared_ptr</code> 管理的对象。这意味着 <code>std::weak_ptr</code> 不会增加所指向对象的引用计数。</p>"}');export{e as data};