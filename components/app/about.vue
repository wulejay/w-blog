<script setup lang="ts">
const aboutRef = ref();
import { desc } from "~/assets/data";
useSectionInView(aboutRef, "关于我");
</script>

<template>
  <section
    ref="aboutRef"
    class="max-w-[45rem] text-start leading-8 sm:mb-40 scroll-mt-28 mb-28"
    id="about"
    v-motion
    :initial="{
      opacity: 0,
      y: 100,
    }"
    :enter="{
      opacity: 1,
      y: 0,
    }"
    :delay="175"
  >
    <h2 class="text-3xl font-medium capitalize mb-8 text-center">关于我</h2>

    <p>
<!--      在读书阶段，我学习了计算机基础、java、Vue等课程，并在大二时深入接触后端开发,大三时接触前端开发。从此沦落为全栈开发🤣,在编程的挑战中，我乐在其中，与团队合作开发项目、解决复杂问题的过程带来了巨大的满足感。我擅长使用-->
<!--      SpringBoot 和 vue3 等技术，-->
<!--        也对Node,Python,Django,uni-app,react也略有涉猎💻。平时，我喜欢学习新技能并做一些有趣的项目-->
<!--      🛠️。如果不在电脑前，我喜欢跑步、喜欢到处走,如果有人愿意陪的话-->
<!--      🍳🎥💪， 年轻我打算先从广度出发,我打算再看看GoLong和网络安全 🌟。-->
        {{desc}}
    </p>
  </section>
</template>
