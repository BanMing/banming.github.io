import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as n,a as t,b as e}from"./app-CXjdBmfs.js";const d={},s=e('<h1 id="code-vs-data-driven-displacement" tabindex="-1"><a class="header-anchor" href="#code-vs-data-driven-displacement" aria-hidden="true">#</a> Code vs Data Driven Displacement</h1><p>原文地址：https://theorangeduck.com/page/code-vs-data-driven-displacement</p><h2 id="definitions" tabindex="-1"><a class="header-anchor" href="#definitions" aria-hidden="true">#</a> Definitions</h2><h3 id="the-simulation-object" tabindex="-1"><a class="header-anchor" href="#the-simulation-object" aria-hidden="true">#</a> The Simulation Object</h3><p>把手柄输入转化为预测要移动的物体。</p>',5),c=e(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>vec3 desired_velocity_update(
    const vec3 gamepadstick_left,
    const float camera_azimuth,
    const quat simulation_rotation,
    const float fwrd_speed,
    const float side_speed,
    const float back_speed)
{
    // Find stick position in world space by rotating using camera azimuth
    vec3 global_stick_direction = quat_mul_vec3(
        quat_from_angle_axis(camera_azimuth, vec3(0, 1, 0)), gamepadstick_left);
    
    // Find stick position local to current facing direction
    vec3 local_stick_direction = quat_inv_mul_vec3(
        simulation_rotation, global_stick_direction);
    
    // Scale stick by forward, sideways and backwards speeds
    vec3 local_desired_velocity = local_stick_direction.z &gt; 0.0 ?
        vec3(side_speed, 0.0f, fwrd_speed) * local_stick_direction :
        vec3(side_speed, 0.0f, back_speed) * local_stick_direction;
    
    // Re-orientate into the world space
    return quat_mul_vec3(simulation_rotation, local_desired_velocity);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="the-character-entity" tabindex="-1"><a class="header-anchor" href="#the-character-entity" aria-hidden="true">#</a> The Character Entity</h3><p>这就是玩家可以看到角色。角色的移动数据是来自动画切片，这种方式叫作数据驱动。</p><p>动画切片：https://github.com/ubisoft/ubisoft-laforge-animation-dataset</p><h2 id="simulation-bone" tabindex="-1"><a class="header-anchor" href="#simulation-bone" aria-hidden="true">#</a> Simulation Bone</h2><p>模拟骨骼是给模拟对象使用的，用来代表移动旋转。</p><h2 id="character-controller" tabindex="-1"><a class="header-anchor" href="#character-controller" aria-hidden="true">#</a> Character Controller</h2><h2 id="synchronization" tabindex="-1"><a class="header-anchor" href="#synchronization" aria-hidden="true">#</a> Synchronization</h2><p>有两种方式：</p><ul><li>直接使用模拟物体同步到角色：会出现滑步</li><li>由数据驱动模拟物体：这会造成延迟感</li></ul><p>那么想到的方式就是直接混合这两者。</p><h2 id="adjustment" tabindex="-1"><a class="header-anchor" href="#adjustment" aria-hidden="true">#</a> Adjustment</h2>`,12);function r(l,o){return a(),n("div",null,[s,t(` <video controls="" muted="" width="640" height="360">
  <source src="/media/uploads/CodeVsDataDriven/SimulationObject.m4v" type="video/mp4">
</video> `),c])}const u=i(d,[["render",r],["__file","MotionMatching.html.vue"]]);export{u as default};
