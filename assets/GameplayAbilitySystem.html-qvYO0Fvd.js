const e=JSON.parse('{"key":"v-31a38839","path":"/GameEngine/Unreal/manual/GameplayAbilitySystem.html","title":"Gameplay Ability System","lang":"en-US","frontmatter":{"date":"2022-12-15T15:37:54.000Z","tag":["Unreal Engine","Gameplay"]},"headers":[{"level":2,"title":"Ability System Component","slug":"ability-system-component","link":"#ability-system-component","children":[{"level":3,"title":"Init Ability Actor Info","slug":"init-ability-actor-info","link":"#init-ability-actor-info","children":[]},{"level":3,"title":"EGameplayEffectReplicationMode","slug":"egameplayeffectreplicationmode","link":"#egameplayeffectreplicationmode","children":[]}]},{"level":2,"title":"Attribute Set","slug":"attribute-set","link":"#attribute-set","children":[{"level":3,"title":"BaseValue vs CurrentValue","slug":"basevalue-vs-currentvalue","link":"#basevalue-vs-currentvalue","children":[]},{"level":3,"title":"使用DataTable初始化","slug":"使用datatable初始化","link":"#使用datatable初始化","children":[]},{"level":3,"title":"常用函数","slug":"常用函数","link":"#常用函数","children":[]}]},{"level":2,"title":"Gameplay Effect","slug":"gameplay-effect","link":"#gameplay-effect","children":[{"level":3,"title":"Periodic Gameplay Effects","slug":"periodic-gameplay-effects","link":"#periodic-gameplay-effects","children":[]},{"level":3,"title":"Stacking","slug":"stacking","link":"#stacking","children":[]},{"level":3,"title":"Aggregate by Soucre","slug":"aggregate-by-soucre","link":"#aggregate-by-soucre","children":[]},{"level":3,"title":"Aggregate by Soucre","slug":"aggregate-by-soucre-1","link":"#aggregate-by-soucre-1","children":[]},{"level":3,"title":"Modifiers Magnitdue","slug":"modifiers-magnitdue","link":"#modifiers-magnitdue","children":[]},{"level":3,"title":"Modifiers Order of Operation","slug":"modifiers-order-of-operation","link":"#modifiers-order-of-operation","children":[]},{"level":3,"title":"Attribute Base Modifier Coefficeient","slug":"attribute-base-modifier-coefficeient","link":"#attribute-base-modifier-coefficeient","children":[]},{"level":3,"title":"Custom Calculation","slug":"custom-calculation","link":"#custom-calculation","children":[]},{"level":3,"title":"Execution Calculation","slug":"execution-calculation","link":"#execution-calculation","children":[]},{"level":3,"title":"Set By Caller","slug":"set-by-caller","link":"#set-by-caller","children":[]},{"level":3,"title":"Tags","slug":"tags","link":"#tags","children":[]},{"level":3,"title":"GameplayEffectContext","slug":"gameplayeffectcontext","link":"#gameplayeffectcontext","children":[]}]},{"level":2,"title":"Gameplay Ability","slug":"gameplay-ability","link":"#gameplay-ability","children":[{"level":3,"title":"Tags","slug":"tags-1","link":"#tags-1","children":[]},{"level":3,"title":"Instancing Policy","slug":"instancing-policy","link":"#instancing-policy","children":[]},{"level":3,"title":"Net Execution Policy","slug":"net-execution-policy","link":"#net-execution-policy","children":[]},{"level":3,"title":"Things Not to Use","slug":"things-not-to-use","link":"#things-not-to-use","children":[]},{"level":3,"title":"Enhanced Input","slug":"enhanced-input","link":"#enhanced-input","children":[]}]},{"level":2,"title":"Ability Task","slug":"ability-task","link":"#ability-task","children":[{"level":3,"title":"Target Data","slug":"target-data","link":"#target-data","children":[]}]},{"level":2,"title":"Gameplay Cue","slug":"gameplay-cue","link":"#gameplay-cue","children":[]},{"level":2,"title":"Gameplay Tag","slug":"gameplay-tag","link":"#gameplay-tag","children":[]},{"level":2,"title":"Prediction","slug":"prediction","link":"#prediction","children":[{"level":3,"title":"GAS Automatically Predicts","slug":"gas-automatically-predicts","link":"#gas-automatically-predicts","children":[]},{"level":3,"title":"GAS Does NOT Predict","slug":"gas-does-not-predict","link":"#gas-does-not-predict","children":[]},{"level":3,"title":"Prediction Key","slug":"prediction-key","link":"#prediction-key","children":[]},{"level":3,"title":"Ability Activation","slug":"ability-activation","link":"#ability-activation","children":[]},{"level":3,"title":"Gameplay Effects Prediction","slug":"gameplay-effects-prediction","link":"#gameplay-effects-prediction","children":[]},{"level":3,"title":"More Info","slug":"more-info","link":"#more-info","children":[]}]},{"level":2,"title":"Replication Mode","slug":"replication-mode","link":"#replication-mode","children":[]},{"level":2,"title":"Debug","slug":"debug","link":"#debug","children":[]},{"level":2,"title":"Reference","slug":"reference","link":"#reference","children":[]}],"git":{"createdTime":1699280150000,"updatedTime":1714316274000,"contributors":[{"name":"BanMing","email":"ban-ming@foxmail.com","commits":17},{"name":"wupeng","email":"wupeng_a2484@virtuos.com.cn","commits":9}]},"readingTime":{"minutes":10.77,"words":3232},"filePathRelative":"GameEngine/Unreal/manual/GameplayAbilitySystem.md","localizedDate":"December 15, 2022","excerpt":"<h1> Gameplay Ability System</h1>\\n<figure><figcaption>Alt text</figcaption></figure>\\n<ul>\\n<li>Ability System Component：控制技能生命周期。</li>\\n<li>Attribute Set：数据配置</li>\\n<li>Gameplay Ability：技能逻辑</li>\\n<li>Ability Task：技能执行在一帧，可以设置不同的回调也就是任务，来响应技能执行。</li>\\n<li>Gameplay Effect：技能产生的影响，修改了那些数据。</li>\\n<li>Gameplay Cue：技能相关的音效，粒子效果，相机抖动等。</li>\\n<li>Gameplay Tag：描述物体的状态或数据，可以用来控制技能的释放等。</li>\\n</ul>"}');export{e as data};