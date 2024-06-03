import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-ennUlWkB.mjs';
import { a as useActiveSection, b as useTimeOfLastClick, l as links, u as useSound } from './data-BXNum61R.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, ref, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { f as useDark, g as useToggle } from './server.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './state-CuouCpJu.mjs';
import 'vue-router';
import 'framesync';
import 'popmotion';
import 'style-value-types';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const activeSection = useActiveSection();
    const timeOfLastClick = useTimeOfLastClick();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: "z-[999] relative",
        "data-aos": "fade-down"
      }, _attrs))}><div class="fixed top-0 left-1/2 -translate-x-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-40 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[30rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"></div><nav class="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0"><ul class="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5"><!--[-->`);
      ssrRenderList(unref(links), (link, index) => {
        _push(`<li class="h-3/4 flex items-center justify-center relative break-keep">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: link.hash,
          class: ["flex w-full items-center justify-center px-3 py-3 no-wrap hover:text-gray-950 dark:hover:text-gray-300 transition", {
            "text-gray-950": unref(activeSection) === link.name,
            "dark:hover:text-gray-600": unref(activeSection) === link.name
          }],
          onClick: () => {
            activeSection.value = link.name;
            timeOfLastClick.value = Date.now();
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.name)} `);
              if (unref(activeSection) === link.name) {
                _push2(`<span class="bg-gray-50 rounded-full absolute inset-0 -z-10" layoutId="activeSection"${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createTextVNode(toDisplayString(link.name) + " ", 1),
                unref(activeSection) === link.name ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "bg-gray-50 rounded-full absolute inset-0 -z-10",
                  layoutId: "activeSection"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav></header>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "mb-10 px-4 text-center text-gray-500" }, _attrs))}><small class="mb-2 block text-xs"> \xA9 2024 \u6A02. \u6240\u6709\u6743\u5229\u4FDD\u7559. </small><p class="text-xs"><span class="font-semibold">\u5173\u4E8E\u672C\u7F51\u7AD9:</span>\u901A\u8FC7\u7F51\u7EDC\u5F00\u6E90\u9879\u76EE\u642D\u5EFA \u4F7F\u7528 Vue.js \u548C Nuxt.js \u7CBE\u5FC3\u6253\u9020\uFF0C\u7528 Tailwind CSS \u8FDB\u884C\u6837\u5F0F\u8BBE\u8BA1\u3002 </p></footer>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-5 right-3 sm:bottom-[3rem] sm:right-[3rem] flex flex-col items-center justify-between p-1 bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-70 shadow-2xl rounded-lg transition-all dark:bg-gray-950 dark:bg-transparent dark:border-slate-700" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/widgetWrapper.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const lightOn = "" + buildAssetsURL("light-on.CtrOjYWK.mp3");
const lightOff = "" + buildAssetsURL("light-off.By20Z6WZ.mp3");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "themeSwitch",
  __ssrInlineRender: true,
  setup(__props) {
    useSound(lightOn, { volume: 0.5 });
    useSound(lightOff, { volume: 0.5 });
    const isDark = useDark({
      attribute: "data-theme"
    });
    useToggle(isDark);
    const darkMode = ref(isDark.value);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "swap swap-rotate w-[2.5rem] h-[2.5rem] bg-opacity-80 hover:scale-[1.15] active:scale-105 transition-all" }, _attrs))}><input type="checkbox" class="theme-controller"${ssrIncludeBooleanAttr(Array.isArray(unref(darkMode)) ? ssrLooseContain(unref(darkMode), null) : unref(darkMode)) ? " checked" : ""}><svg class="swap-off fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path></svg><svg class="swap-on fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path></svg></label>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/widget/themeSwitch.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = _sfc_main$4;
  const _component_AppFooter = __nuxt_component_1;
  const _component_AppWidgetWrapper = __nuxt_component_2;
  const _component_WidgetThemeSwitch = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div class="bg-top bg-no-repeat h-[502px] w-full fixed -z-10" style="${ssrRenderStyle({ "background-image": "url('/bg.svg')" })}"></div>`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(ssrRenderComponent(_component_AppWidgetWrapper, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_WidgetThemeSwitch, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_WidgetThemeSwitch)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-DApeivdx.mjs.map
