import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { u as useHead, a as useNuxtApp, d as defu, b as useRuntimeConfig, c as useIntersectionObserver } from './server.mjs';
import { defineComponent, ref, computed, h, useSSRContext, mergeProps, unref, resolveDirective, withCtx, createVNode } from 'vue';
import { x as encodeParam, l as hasProtocol, y as withLeadingSlash, n as joinURL, p as parseURL, z as encodePath } from '../runtime.mjs';
import __nuxt_component_0 from './Icon-BwtZ8HjB.mjs';
import { u as useSound, n as name, d as desc, p as projectsData, s as skillsData, e as experiencesDataZn, a as useActiveSection, b as useTimeOfLastClick } from './data-BXNum61R.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './nuxt-link-ennUlWkB.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'framesync';
import 'popmotion';
import 'style-value-types';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import './index-DaTLO30G.mjs';
import './state-CuouCpJu.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('image-meta').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return Number.parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = Number.parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a, _b;
  if (input && typeof input !== "string") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (!input || input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        input = joinURL(ctx.options.alias[base], input.substr(base.length));
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name2) {
  const provider = ctx.options.providers[name2];
  if (!provider) {
    throw new Error("Unknown provider: " + name2);
  }
  return provider;
}
function getPreset(ctx, name2) {
  if (!name2) {
    return {};
  }
  if (!ctx.options.presets[name2]) {
    throw new Error("Unknown preset: " + name2);
  }
  return ctx.options.presets[name2];
}
function getSizes(ctx, input, opts) {
  var _a, _b, _c, _d, _e;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const sizes = parseSizes(opts.sizes);
  const densities = ((_c = opts.densities) == null ? void 0 : _c.trim()) ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: (_d = opts.modifiers) == null ? void 0 : _d.width,
          _cHeight: (_e = opts.modifiers) == null ? void 0 : _e.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant == null ? void 0 : defaultVariant.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || Number.parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = Number.parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  var _a;
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = ((_a = sizeVariants[i + 1]) == null ? void 0 : _a.media) || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL) {
    baseURL = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$qPHw63FRCK = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getImage,
  supportsAlias,
  validateDomains
});
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {},
  "provider": "ipx",
  "domains": [],
  "alias": {},
  "densities": [
    1,
    2
  ],
  "format": [
    "webp"
  ]
};
imageOptions.providers = {
  ["ipx"]: { provider: ipxRuntime$qPHw63FRCK, defaults: {} }
};
const useImage = () => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    nuxt: {
      baseURL: config.app.baseURL
    }
  }));
};
const baseImageProps = {
  // input source
  src: { type: String, default: void 0 },
  // modifiers
  format: { type: String, default: void 0 },
  quality: { type: [Number, String], default: void 0 },
  background: { type: String, default: void 0 },
  fit: { type: String, default: void 0 },
  modifiers: { type: Object, default: void 0 },
  // options
  preset: { type: String, default: void 0 },
  provider: { type: String, default: void 0 },
  sizes: { type: [Object, String], default: void 0 },
  densities: { type: String, default: void 0 },
  preload: {
    type: [Boolean, Object],
    default: void 0
  },
  // <img> attributes
  width: { type: [String, Number], default: void 0 },
  height: { type: [String, Number], default: void 0 },
  alt: { type: String, default: void 0 },
  referrerpolicy: { type: String, default: void 0 },
  usemap: { type: String, default: void 0 },
  longdesc: { type: String, default: void 0 },
  ismap: { type: Boolean, default: void 0 },
  loading: {
    type: String,
    default: void 0,
    validator: (val) => ["lazy", "eager"].includes(val)
  },
  crossorigin: {
    type: [Boolean, String],
    default: void 0,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    default: void 0,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  },
  // csp
  nonce: { type: [String], default: void 0 }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding,
      nonce: props.nonce
    };
  });
  const $img = useImage();
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], default: void 0 },
  placeholderClass: { type: String, default: void 0 }
};
const __nuxt_component_2 = defineComponent({
  name: "NuxtImg",
  props: imgProps,
  emits: ["load", "error"],
  setup: (props, ctx) => {
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const imgEl = ref();
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const attrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (!props.placeholder || placeholderLoaded.value) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50,
        blur: size[3] || 3
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          },
          ...typeof props.preload !== "boolean" && props.preload.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
        }]
      });
    }
    const nuxtApp = useNuxtApp();
    nuxtApp.isHydrating;
    return () => h("img", {
      ref: imgEl,
      ...{ onerror: "this.setAttribute('data-error', 1)" },
      ...attrs.value,
      ...ctx.attrs,
      class: props.placeholder && !placeholderLoaded.value ? [props.placeholderClass] : void 0,
      src: src.value
    });
  }
});
const useSectionInView = (el, name2, threshold = 0.75) => {
  const target = el;
  const targetIsVisible = ref(false);
  const activeSection = useActiveSection();
  const timeOfLastClick = useTimeOfLastClick();
  useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      targetIsVisible.value = isIntersecting;
      if (isIntersecting && Date.now() - timeOfLastClick.value > 1e3) {
        activeSection.value = name2;
      }
    },
    {
      threshold
    }
  );
  return { targetIsVisible };
};
const bubble = "" + buildAssetsURL("bubble.C42nCNaT.wav");
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "intro",
  __ssrInlineRender: true,
  setup(__props) {
    const introRef = ref();
    useSectionInView(introRef, "\u9996\u9875", 0.2);
    useSound(bubble);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_2;
      const _component_Icon = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "introRef",
        ref: introRef,
        class: "mb-10 max-w-[50rem] text-center sm:mb-0 scroll-mt-28 pt-[7rem]",
        id: "home"
      }, _attrs))}><div class="flex items-center justify-center"><div class="relative"><div data-aos="zoom-in">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/avatar.jpg",
        alt: "avatar",
        width: "250",
        height: "250",
        quality: "95",
        class: "h-28 w-28 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
      }, null, _parent));
      _push(`</div><span class="absolute text-4xl bottom-0 right-0 hover:rotate-2 cursor-pointer" data-aos="zoom-in" data-aos-delay="200"> \u{1F44B} </span></div></div><h1 class="mb-10 mt-4 px-4 text-2xl font-medium leading-[1.5] sm:text-4xl" data-aos="fade-up"><span class="text-sm tracking-wider"> \u4F60\u597D\uFF0C\u6211\u662F </span><div class="col-span-8 place-self-center text-center sm:text-left justify-self-start" data-aos="zoom-in" data-aos-delay="100"><h1 class="text-center text-4xl font-bold tracking-tight sm:text-5xl">${ssrInterpolate(unref(name))}</h1><div class="text-center"><span class="text-sm tracking-wider"> I&#39;m a </span><h2 class="text-center text-2xl sm:text-5xl lg:text-4xl lg:leading-normal font-extrabold"><span id="introduce"></span></h2></div></div><p>\u6211\u4EAB\u53D7\u642D\u5EFA\u9879\u76EE\u7684\u4E50\u8DA3\uFF01</p></h1><div class="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 text-lg font-medium" data-aos="fade-up" data-aos-delay="100"><a class="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60" href="https://github.com/wulejay" target="_blank">`);
      _push(ssrRenderComponent(_component_Icon, { name: "mdi:github-box" }, null, _parent));
      _push(`</a></div></section>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/intro.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  const _component_Icon = __nuxt_component_0;
  const _directive_motion = resolveDirective("motion");
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "text-gray-500 w-8 h-8 mt-12 mb-20 hidden sm:block",
    initial: {
      opacity: 0,
      scale: 0
    },
    enter: {
      opacity: 1,
      scale: 1
    },
    delay: 300,
    duration: 1200
  }, _attrs, ssrGetDirectiveProps(_ctx, _directive_motion)))}>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "#about" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Icon, {
          name: "mdi:chevron-down",
          class: "transition",
          size: "25"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_Icon, {
            name: "mdi:chevron-down",
            class: "transition",
            size: "25"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/sectionDivider.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const aboutRef = ref();
    useSectionInView(aboutRef, "\u5173\u4E8E\u6211");
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_motion = resolveDirective("motion");
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "aboutRef",
        ref: aboutRef,
        class: "max-w-[45rem] text-start leading-8 sm:mb-40 scroll-mt-28 mb-28",
        id: "about",
        initial: {
          opacity: 0,
          y: 100
        },
        enter: {
          opacity: 1,
          y: 0
        },
        delay: 175
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_motion)))}><h2 class="text-3xl font-medium capitalize mb-8 text-center">\u5173\u4E8E\u6211</h2><p>${ssrInterpolate(unref(desc))}</p></section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/about.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "projectItem",
  __ssrInlineRender: true,
  props: {
    project: {}
  },
  setup(__props) {
    const props = __props;
    const { title, description, tags, imageUrl, projectUrl, demoUrl, detailRoute } = props.project;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "group mb-4 sm:mb-8 last:mb-0",
        "data-aos": "new-animation",
        "data-aos-mirror": "true"
      }, _attrs))}><section class="bg-gray-100 max-w-[45rem] hidden sm:block border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative h-96 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10"><div class="group pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col items-start gap-3 h-full sm:group-even:ml-[18rem]"><div class="flex flex-col gap-3 items-start"><h3 class="text-2xl font-semibold group-hover:text-pink dark:group-hover:text-yellow hover:underline">${ssrInterpolate(unref(title))}</h3><div class="flex gap-3 text-sm text-gray-500 dark:text-gray-300">`);
      if (unref(projectUrl)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(projectUrl),
          target: "_blank",
          class: "w-full flex items-center gap-1 hover:underline underline-offset-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="break-keep"${_scopeId}>Code</span>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "mdi:github-box",
                size: "17"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("span", { class: "break-keep" }, "Code"),
                createVNode(_component_Icon, {
                  name: "mdi:github-box",
                  size: "17"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(demoUrl)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(demoUrl),
          target: "_blank",
          class: "w-full flex items-center gap-1 hover:underline underline-offset-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="break-keep min-w-[4.5rem]"${_scopeId}>Live demo</span>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "mdi:launch",
                size: "17"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("span", { class: "break-keep min-w-[4.5rem]" }, "Live demo"),
                createVNode(_component_Icon, {
                  name: "mdi:launch",
                  size: "17"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><p class="mt-2 leading-relaxed text-gray-700 dark:text-white/70">${ssrInterpolate(unref(description))}</p><ul class="flex flex-wrap mt-auto gap-2"><!--[-->`);
      ssrRenderList(unref(tags), (tag, index2) => {
        _push(`<li class="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70">${ssrInterpolate(tag)}</li>`);
      });
      _push(`<!--]--></ul></div>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: unref(imageUrl),
        alt: "Project I worked on",
        quality: "95",
        class: "absolute top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl transition group-hover:scale-[1.04] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 group-even:right-[initial] group-even:-left-40"
      }, null, _parent));
      _push(`</section><section class="card shadow-xl sm:hidden dark:text-white dark:bg-white/10 max-w-[45rem]"><figure class="bg-base-100">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: unref(imageUrl),
        alt: "Project I worked on",
        quality: "95",
        class: "h-[200px] object-cover"
      }, null, _parent));
      _push(`</figure><div class="card-body"><h2 class="card-title">${ssrInterpolate(unref(title))}</h2><ul class="flex flex-wrap mt-auto gap-2"><!--[-->`);
      ssrRenderList(unref(tags), (tag, index2) => {
        _push(`<li class="badge badge-ghost">${ssrInterpolate(tag)}</li>`);
      });
      _push(`<!--]--></ul><p>${ssrInterpolate(unref(description))}</p><div class="card-actions justify-end">`);
      if (unref(projectUrl)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(projectUrl),
          target: "_blank",
          class: "flex items-center gap-1 hover:underline underline-offset-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="break-keep"${_scopeId}>Code</span>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "mdi:github-box",
                size: "17"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("span", { class: "break-keep" }, "Code"),
                createVNode(_component_Icon, {
                  name: "mdi:github-box",
                  size: "17"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(demoUrl)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(demoUrl),
          target: "_blank",
          class: "flex items-center gap-1 hover:underline underline-offset-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="break-keep min-w-[4.5rem]"${_scopeId}>Live demo</span>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "mdi:launch",
                size: "17"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("span", { class: "break-keep min-w-[4.5rem]" }, "Live demo"),
                createVNode(_component_Icon, {
                  name: "mdi:launch",
                  size: "17"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/projectItem.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "project",
  __ssrInlineRender: true,
  setup(__props) {
    const projectsRef = ref();
    useSectionInView(projectsRef, "\u6211\u7684\u9879\u76EE", 0.4);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppProjectItem = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "projectsRef",
        ref: projectsRef,
        class: "scroll-mt-28 mb-28",
        id: "projects"
      }, _attrs))}><h2 class="text-3xl font-medium capitalize mb-8 text-center">\u6211\u7684\u9879\u76EE</h2><!--[-->`);
      ssrRenderList(unref(projectsData), (project, index2) => {
        _push(ssrRenderComponent(_component_AppProjectItem, {
          key: index2,
          project
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/project.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "skills",
  __ssrInlineRender: true,
  setup(__props) {
    const skillsRef = ref();
    useSectionInView(skillsRef, "\u6211\u7684\u6280\u80FD");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "skillsRef",
        ref: skillsRef,
        class: "max-w-[53rem] scroll-mt-28 text-center mb-28",
        id: "skills"
      }, _attrs))}><h2 class="text-3xl font-medium capitalize mb-8 text-center">\u6211\u7684\u6280\u80FD</h2><ul class="flex flex-wrap justify-center gap-2 text-lg text-gray-800"><!--[-->`);
      ssrRenderList(unref(skillsData), (skill, index2) => {
        _push(`<li class="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80" data-aos="fade-up"${ssrRenderAttr("data-aos-delay", 50 * index2)}>${ssrInterpolate(skill)}</li>`);
      });
      _push(`<!--]--></ul></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/skills.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "experience",
  __ssrInlineRender: true,
  setup(__props) {
    const experienceRef = ref();
    useSectionInView(experienceRef, "\u6211\u7684\u7ECF\u5386", 0.1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "sm:mb-40 relative mb-20 scroll-mt-20",
        id: "experience"
      }, _attrs))}><h2 class="text-3xl font-medium capitalize mb-8 text-center"> \u6211\u7684\u7ECF\u5386 </h2><ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical px-10"><!--[-->`);
      ssrRenderList(unref(experiencesDataZn), (item, index2) => {
        _push(`<li${ssrRenderAttr("data-aos", index2 % 2 ? "fade-left" : "fade-right")}>`);
        if (index2 != 0) {
          _push(`<hr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${ssrRenderClass([index2 % 2 ? "timeline-start" : "timeline-end", "hidden md:block"])}">${ssrInterpolate(item.date)}</div><div class="timeline-middle">`);
        _push(ssrRenderComponent(_component_Icon, { name: "mdi:checkbox-marked-circle" }, null, _parent));
        _push(`</div><div class="${ssrRenderClass([index2 % 2 ? "timeline-end" : "timeline-start md:text-end", "mb-10 timeline-box"])}"><div class="flex flex-col gap-2"><time class="font-mono italic block md:hidden">${ssrInterpolate(item.date)}</time><h3 class="font-bold capitalize">${ssrInterpolate(item.title)}</h3><p class="font-normal !mt-0">${ssrInterpolate(item.location)}</p><p class="!mt-1 !font-normal text-gray-700 dark:text-white/75">${ssrInterpolate(item.description)}</p></div></div>`);
        if (index2 != unref(experiencesDataZn).length - 1) {
          _push(`<hr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/experience.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppIntro = _sfc_main$7;
  const _component_AppSectionDivider = __nuxt_component_1;
  const _component_AppAbout = _sfc_main$5;
  const _component_AppProject = _sfc_main$3;
  const _component_AppSkills = _sfc_main$2;
  const _component_AppExperience = _sfc_main$1;
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center px-4 overflow-x-hidden" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AppIntro, null, null, _parent));
  _push(ssrRenderComponent(_component_AppSectionDivider, null, null, _parent));
  _push(ssrRenderComponent(_component_AppAbout, null, null, _parent));
  _push(ssrRenderComponent(_component_AppProject, null, null, _parent));
  _push(ssrRenderComponent(_component_AppSkills, null, null, _parent));
  _push(ssrRenderComponent(_component_AppExperience, null, null, _parent));
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-B0A-YfU-.mjs.map
