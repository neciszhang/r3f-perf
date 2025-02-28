"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const PerfHeadless = require("./PerfHeadless.js");
const fiber = require("@react-three/fiber");
const drei = require("@react-three/drei");
require("../index.js");
const Perf = require("./Perf.js");
const THREE = require("three");
const events = require("@utsubo/events");
const store = require("../store.js");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const THREE__namespace = /* @__PURE__ */ _interopNamespaceDefault(THREE);
const TextHighHZ = React.memo(
  ({
    isPerf,
    color,
    colorBlind,
    customData: customData2,
    isMemory,
    isShadersInfo,
    metric,
    fontSize,
    offsetY = 0,
    offsetX,
    round,
    hasInstance
  }) => {
    const { width: w, height: h } = fiber.useThree((s) => s.viewport);
    const fpsRef = React.useRef(null);
    const fpsInstanceRef = React.useRef(null);
    events.useEvent("log", function updateR3FPerfText([log, gl]) {
      var _a;
      if (!log || !fpsRef.current)
        return;
      if (customData2) {
        fpsRef.current.text = (Math.round(store.getPerf().customData * Math.pow(10, round)) / Math.pow(10, round)).toFixed(
          round
        );
      }
      if (!metric)
        return;
      let info = log[metric];
      if (isShadersInfo) {
        info = (_a = gl.info.programs) == null ? void 0 : _a.length;
      } else if (metric === "matriceCount") {
        info = PerfHeadless.matriceCount.value;
      } else if (!isPerf && gl.info.render) {
        const infos = isMemory ? gl.info.memory : gl.info.render;
        info = infos[metric];
      }
      if (metric === "fps") {
        fpsRef.current.color = store.getPerf().overclockingFps ? Perf.colorsGraph(colorBlind).overClock.toString() : `rgb(${Perf.colorsGraph(colorBlind).fps.toString()})`;
      }
      fpsRef.current.text = (Math.round(info * Math.pow(10, round)) / Math.pow(10, round)).toFixed(round);
      if (hasInstance) {
        const infosInstance = gl.info.instance;
        if (typeof infosInstance === "undefined" && metric !== "matriceCount") {
          return;
        }
        let infoInstance;
        if (metric === "matriceCount") {
          infoInstance = PerfHeadless.matriceWorldCount.value;
        } else {
          infoInstance = infosInstance[metric];
        }
        if (infoInstance > 0) {
          fpsRef.current.fontSize = fontSize / 1.15;
          fpsInstanceRef.current.fontSize = info > 0 ? fontSize / 1.4 : fontSize;
          fpsRef.current.position.y = h / 2 - offsetY - fontSize / 1.9;
          fpsInstanceRef.current.text = " ±	" + (Math.round(infoInstance * Math.pow(10, round)) / Math.pow(10, round)).toFixed(round);
        } else {
          if (fpsInstanceRef.current.text)
            fpsInstanceRef.current.text = "";
          fpsRef.current.position.y = h / 2 - offsetY - fontSize;
          fpsRef.current.fontSize = fontSize;
        }
      }
      PerfHeadless.matriceCount.value -= 1;
      fpsRef.current.updateMatrix();
      fpsRef.current.matrixWorld.copy(fpsRef.current.matrix);
    });
    return /* @__PURE__ */ jsxRuntime.jsxs(React.Suspense, { fallback: null, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        drei.Text,
        {
          textAlign: "justify",
          matrixAutoUpdate: false,
          ref: fpsRef,
          fontSize,
          position: [-w / 2 + offsetX + fontSize, h / 2 - offsetY - fontSize, 0],
          color,
          characters: "0123456789",
          onUpdate: (self) => {
            self.updateMatrix();
            PerfHeadless.matriceCount.value -= 1;
            self.matrixWorld.copy(self.matrix);
          },
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("meshBasicMaterial", { blending: THREE__namespace.NormalBlending }),
            "0"
          ]
        }
      ),
      hasInstance && /* @__PURE__ */ jsxRuntime.jsx(
        drei.Text,
        {
          textAlign: "justify",
          matrixAutoUpdate: false,
          ref: fpsInstanceRef,
          fontSize: 8,
          position: [-w / 2 + offsetX + fontSize, h / 2 - offsetY - fontSize * 1.15, 0],
          color: "lightgrey",
          characters: "0123456789",
          onUpdate: (self) => {
            self.updateMatrix();
            PerfHeadless.matriceCount.value -= 1;
            self.matrixWorld.copy(self.matrix);
          },
          children: /* @__PURE__ */ jsxRuntime.jsx("meshBasicMaterial", { blending: THREE__namespace.NormalBlending })
        }
      )
    ] });
  }
);
const TextsHighHZ = ({ colorBlind, customData: customData2, minimal, matrixUpdate }) => {
  const fontSize = 14;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      TextHighHZ,
      {
        colorBlind,
        color: `rgb(${Perf.colorsGraph(colorBlind).fps.toString()})`,
        isPerf: true,
        metric: "fps",
        fontSize,
        offsetX: 140,
        round: 0
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      TextHighHZ,
      {
        color: `rgb(${Perf.colorsGraph(colorBlind).cpu.toString()})`,
        isPerf: true,
        metric: "cpu",
        fontSize,
        offsetX: 72,
        round: 3
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      TextHighHZ,
      {
        color: `rgb(${Perf.colorsGraph(colorBlind).gpu.toString()})`,
        isPerf: true,
        metric: "gpu",
        fontSize,
        offsetX: 10,
        round: 3
      }
    ),
    !minimal ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(TextHighHZ, { metric: "calls", fontSize, offsetX: 200, round: 0, hasInstance: true }),
      /* @__PURE__ */ jsxRuntime.jsx(TextHighHZ, { metric: "triangles", fontSize, offsetX: 260, round: 0, hasInstance: true }),
      /* @__PURE__ */ jsxRuntime.jsx(TextHighHZ, { isMemory: true, metric: "geometries", fontSize, offsetY: 30, offsetX: 0, round: 0 }),
      /* @__PURE__ */ jsxRuntime.jsx(TextHighHZ, { isMemory: true, metric: "textures", fontSize, offsetY: 30, offsetX: 80, round: 0 }),
      /* @__PURE__ */ jsxRuntime.jsx(TextHighHZ, { isShadersInfo: true, metric: "programs", fontSize, offsetY: 30, offsetX: 140, round: 0 }),
      /* @__PURE__ */ jsxRuntime.jsx(TextHighHZ, { metric: "lines", fontSize, offsetY: 30, offsetX: 200, round: 0, hasInstance: true }),
      /* @__PURE__ */ jsxRuntime.jsx(TextHighHZ, { metric: "points", fontSize, offsetY: 30, offsetX: 260, round: 0, hasInstance: true }),
      matrixUpdate && /* @__PURE__ */ jsxRuntime.jsx(
        TextHighHZ,
        {
          isPerf: true,
          metric: "matriceCount",
          fontSize,
          offsetY: 30,
          offsetX: 320,
          round: 0,
          hasInstance: true
        }
      )
    ] }) : null,
    customData2 && /* @__PURE__ */ jsxRuntime.jsx(
      TextHighHZ,
      {
        color: `rgb(${Perf.colorsGraph(colorBlind).custom.toString()})`,
        customData: customData2,
        fontSize,
        offsetY: 0,
        offsetX: minimal ? 200 : 320,
        round: customData2.round || 2
      }
    )
  ] });
};
exports.TextsHighHZ = TextsHighHZ;
//# sourceMappingURL=TextsHighHZ.js.map
