import { u as useState } from './state-CuouCpJu.mjs';
import { ref, watch, unref } from 'vue';

const useActiveSection = () => useState("activeSection", () => "\u9996\u9875");
const useTimeOfLastClick = () => useState("timeOfLastClick", () => 0);
function useSound(url, { volume = 1, playbackRate = 1, soundEnabled = true, interrupt = false, autoplay = false, onload, ...delegated } = {}) {
  const HowlConstructor = ref(null);
  const isPlaying = ref(false);
  const duration = ref(null);
  const sound = ref(null);
  function handleLoad() {
    var _a;
    if (typeof onload === "function")
      onload.call(this);
    duration.value = (duration.value || ((_a = sound.value) == null ? void 0 : _a.duration()) || 0) * 1e3;
    if (autoplay === true) {
      isPlaying.value = true;
    }
  }
  watch(
    () => [url],
    () => {
      if (HowlConstructor.value && HowlConstructor.value && sound && sound.value) {
        sound.value = new HowlConstructor.value({
          src: unref(url),
          volume: unref(volume),
          rate: unref(playbackRate),
          onload: handleLoad,
          ...delegated
        });
      }
    }
  );
  watch(
    () => [unref(volume), unref(playbackRate)],
    () => {
      if (sound.value) {
        sound.value.volume(unref(volume));
        sound.value.rate(unref(playbackRate));
      }
    }
  );
  const play = (options) => {
    if (typeof options === "undefined") {
      options = {};
    }
    if (!sound.value || !soundEnabled && !options.forceSoundEnabled) {
      return;
    }
    if (interrupt) {
      sound.value.stop();
    }
    if (options.playbackRate) {
      sound.value.rate(options.playbackRate);
    }
    sound.value.play(options.id);
    sound.value.once("end", () => {
      if (sound.value && sound.value && !sound.value.playing()) {
        isPlaying.value = false;
      }
    });
    isPlaying.value = true;
  };
  const stop = (id) => {
    if (!sound.value) {
      return;
    }
    sound.value.stop(typeof id === "number" ? id : void 0);
    isPlaying.value = false;
  };
  const pause = (id) => {
    if (!sound.value) {
      return;
    }
    sound.value.pause(typeof id === "number" ? id : void 0);
    isPlaying.value = false;
  };
  const returnedValue = {
    play,
    sound,
    isPlaying,
    duration,
    pause,
    stop
  };
  return returnedValue;
}
const links = [
  {
    name: "\u9996\u9875",
    hash: "#home"
  },
  {
    name: "\u5173\u4E8E\u6211",
    hash: "#about"
  },
  {
    name: "\u6211\u7684\u9879\u76EE",
    hash: "#projects"
  },
  {
    name: "\u6211\u7684\u6280\u80FD",
    hash: "#skills"
  },
  {
    name: "\u6211\u7684\u7ECF\u5386",
    hash: "#experience"
  }
];
const name = "\u5434\u4E50";
const desc = `  \u5728\u8BFB\u4E66\u9636\u6BB5\uFF0C\u6211\u5B66\u4E60\u4E86\u8BA1\u7B97\u673A\u57FA\u7840\u3001java\u3001Vue\u7B49\u8BFE\u7A0B\uFF0C\u5E76\u5728\u5927\u4E8C\u65F6\u6DF1\u5165\u63A5\u89E6\u540E\u7AEF\u5F00\u53D1,\u5927\u4E09\u65F6\u63A5\u89E6\u524D\u7AEF\u5F00\u53D1\u3002\u4ECE\u6B64\u6CA6\u843D\u4E3A\u5168\u6808\u5F00\u53D1\u{1F923},\u5728\u7F16\u7A0B\u7684\u6311\u6218\u4E2D\uFF0C\u6211\u4E50\u5728\u5176\u4E2D\uFF0C\u4E0E\u56E2\u961F\u5408\u4F5C\u5F00\u53D1\u9879\u76EE\u3001\u89E3\u51B3\u590D\u6742\u95EE\u9898\u7684\u8FC7\u7A0B\u5E26\u6765\u4E86\u5DE8\u5927\u7684\u6EE1\u8DB3\u611F\u3002\u6211\u64C5\u957F\u4F7F\u7528
      SpringBoot \u548C vue3 \u7B49\u6280\u672F\uFF0C
        \u4E5F\u5BF9Node,Python,Django,uni-app,react\u4E5F\u7565\u6709\u6D89\u730E\u{1F4BB}\u3002\u5E73\u65F6\uFF0C\u6211\u559C\u6B22\u5B66\u4E60\u65B0\u6280\u80FD\u5E76\u505A\u4E00\u4E9B\u6709\u8DA3\u7684\u9879\u76EE
      \u{1F6E0}\uFE0F\u3002\u5982\u679C\u4E0D\u5728\u7535\u8111\u524D\uFF0C\u6211\u559C\u6B22\u8DD1\u6B65\u3001\u559C\u6B22\u5230\u5904\u8D70,\u5982\u679C\u6709\u4EBA\u613F\u610F\u966A\u7684\u8BDD
      \u{1F373}\u{1F3A5}\u{1F4AA}\uFF0C \u5E74\u8F7B\u6211\u6253\u7B97\u5148\u4ECE\u5E7F\u5EA6\u51FA\u53D1,\u6211\u6253\u7B97\u518D\u770B\u770BGoLong\u548C\u7F51\u7EDC\u5B89\u5168 \u{1F31F}\u3002`;
const projectsData = [
  {
    title: "\u56FE\u4E66\u7BA1\u7406\u7CFB\u7EDF",
    description: "\u4F7F\u7528servlet+jsp\u5B9E\u73B0\u7684\u56FE\u4E66\u7BA1\u7406\u7CFB\u7EDF,\u4E3A\u671F\u672B\u4F5C\u4E1A\u6240\u51FA",
    tags: ["layui", "JavaScript", "HTML", "servlet"],
    imageUrl: "/\u56FE\u4E66\u7BA1\u7406\u7CFB\u7EDF.png",
    projectUrl: "",
    demoUrl: "",
    detailRoute: ""
  },
  {
    title: "\u7B80\u6613\u6536\u94F6\u7CFB\u7EDF",
    description: "\u4F7F\u7528SpringBoot\u548Cthymeleaf\u5B9E\u73B0\u4E86\u7B80\u6613\u6536\u94F6\u7CFB\u7EDF,\u80FD\u505A\u5230\u4F1A\u5458\u7EDF\u8BA1,\u5546\u54C1\u8D2D\u4E70,\u6743\u9650\u9274\u522B,\u4F1A\u5458\u5145\u503C\u7B49\u529F\u80FD\u3002",
    tags: ["SpringBoot", "JavaScript", "HTML", "thymeleaf"],
    imageUrl: "/\u6536\u94F6.png",
    projectUrl: "",
    demoUrl: "",
    detailRoute: ""
  },
  {
    title: "\u4E2A\u4EBA\u535A\u5BA2",
    description: "\u7B80\u6D01\u5927\u65B9\u7684\u535A\u5BA2\u9875\u9762\u5B9E\u73B0\u5BF9\u4E2A\u4EBA\u6587\u7AE0\u7684\u53D1\u5E03\u4E0E\u7F16\u5199",
    tags: ["SpringBoot", "redis", "thymeleaf", "animate.css", "layui.css"],
    imageUrl: "/\u535A\u5BA21.png",
    projectUrl: "",
    demoUrl: "",
    detailRoute: ""
  },
  {
    title: "\u4E2A\u4EBA\u535A\u5BA2vue\u7248",
    description: "\u4E00\u4E2A\u535A\u5BA2\u5347\u7EA7\u7248,\u642D\u914D\u5B8C\u6574\u540E\u53F0\u535A\u5BA2\u7BA1\u7406\u7CFB\u7EDF,\u8BE5\u5E94\u7528UI\u7B80\u6D01\u73B0\u4EE3\uFF0C\u652F\u6301Dark Mode\u5207\u6362\u3002",
    tags: ["Vue 3", "TypeScript", "SpringBoot", "Element Plus", "Pinia", "Axios", "qiniu", "hutool-all", "sa-token", "animate.css", "VMdEditor"],
    imageUrl: "/\u535A\u5BA22.png",
    projectUrl: "",
    demoUrl: "",
    detailRoute: ""
  }
];
const skillsData = [
  "Java",
  "SSM",
  "SpringBoot",
  "JavaScript",
  "TypeScript",
  "Vue2",
  "Vue3",
  "Node",
  "Python",
  "Django",
  "React",
  "Git",
  "Sqlite",
  "Oracle",
  "MySql",
  "Nginx",
  "Docker"
];
const experiencesDataZn = [
  {
    title: "\u5F00\u53D1\u5B9E\u4E60\u751F",
    location: "\u9AD8\u5B89\u5E02\u6D77\u683C\u79D1\u6280\u6709\u9650\u516C\u53F8",
    description: "\u57FA\u4E8Eruoyi\u5F00\u6E90\u6846\u67B6\u5F00\u53D1\u4E1A\u52A1\u7CFB\u7EDF,\u4E3B\u8981\u4F7F\u7528\u5230springBoot+vue3\u6280\u672F\uFF0C\u4E3B\u8981\u662F\u8D22\u653F\u4E1A\u52A1\u9879\u76EE\u7533\u62A5\u65B9\u9762\u529F\u80FD\u7684\u5F00\u53D1",
    date: "2022\u5E748\u6708 - 2022\u5E7412\u6708"
  }
];

export { useActiveSection as a, useTimeOfLastClick as b, desc as d, experiencesDataZn as e, links as l, name as n, projectsData as p, skillsData as s, useSound as u };
//# sourceMappingURL=data-BXNum61R.mjs.map
