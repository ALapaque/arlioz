'use client';

import { useEffect, useRef } from 'react';

interface ChromaCurrentProps {
  /** Two colours the currents drift between (hex). */
  colors?: readonly [string, string];
  className?: string;
}

const VERTEX = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

/*
 * Pass 1: the light field, one texel per dot of the grid (≈ 160 × 100 texels on a
 * laptop screen instead of one evaluation per device pixel). Four noisy horizontal
 * streams whose colour drifts between A and B; M stirs the flow around the pointer,
 * PL is a short-lived plume released by a click. Output: rgb = colour, a = intensity / 2.
 */
const FIELD = `
precision highp float;
uniform vec2 R;uniform float T;uniform vec2 M;uniform vec3 A;uniform vec3 B;
uniform float PX;uniform vec3 PL;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*n(p);p=p*2.1+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 c=(floor(gl_FragCoord.xy)+.5)*PX;
  vec2 uv=c/R;uv.x*=R.x/R.y;
  vec2 m=M/R;m.x*=R.x/R.y;
  vec2 dm=uv-m;float lm=length(dm);
  uv+=normalize(dm+1e-4)*.09*exp(-lm*lm*9.);
  vec2 pp=PL.xy/R;pp.x*=R.x/R.y;float lp=length(uv-pp);
  float plume=PL.z*exp(-lp*lp*7.)*(.6+.4*sin(T*3.+lp*20.));
  float t=T*.6;float v=0.;float mixc=0.;
  for(int i=0;i<4;i++){float fi=float(i);
    float y0=.18+fi*.21+.08*sin(uv.x*1.6+t*.7+fi*1.9);
    float tb=(fbm(vec2(uv.x*1.3-t*.5+fi*4.,uv.y*2.2+fi))-.5)*.32;
    float dy=uv.y-y0-tb;
    float band=exp(-dy*dy*520.);
    float flow=pow(.5+.5*sin(uv.x*4.-t*2.2+fi*2.1+fbm(uv*3.+fi)*4.),2.2);
    float s=band*flow;v+=s;mixc+=s*(.5+.5*sin(uv.x*2.2-t*.9+fi*1.3));}
  v+=plume;mixc+=plume*.5;
  float w=clamp(mixc/max(v,1e-3),0.,1.);
  gl_FragColor=vec4(mix(A,B,w),clamp(v*.5,0.,1.));
}`;

/* Pass 2: the dots themselves, lit by the field texel of their cell. IN fades the effect in. */
const DOTS = `
precision mediump float;
uniform vec2 G;uniform float T;uniform float PX;uniform float IN;uniform sampler2D F;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
  vec2 cell=floor(gl_FragCoord.xy/PX);vec2 c=(cell+.5)*PX;
  float d=length(gl_FragCoord.xy-c)/PX;
  float dot_=smoothstep(.34,.22,d);
  vec4 f=texture2D(F,(cell+.5)/G);
  vec3 col=f.rgb;float v=f.a*2.;
  float base=.05;
  float inten=v*.95*IN;
  float grain=(h(cell+floor(T*8.))-.5)*.12;
  vec3 rgb=(col*inten+vec3(.22)*base)*dot_*(1.+grain);
  float glow=exp(-d*d*1.6)*v*.06*IN;rgb+=col*glow;
  gl_FragColor=vec4(rgb,clamp(dot_*(base*2.+inten)+glow,0.,1.)*.95);
}`;

/* `getExtension` returns null once a context is lost, so the lose/restore extension is
   kept per canvas from the first run: it is what brings a lost context back. */
const loseExtensions = new WeakMap<HTMLCanvasElement, WEBGL_lose_context>();

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace('#', ''), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

/**
 * Animated "chroma current" background (WebGL, no dependency). Starts after the
 * page is idle and renders only while on screen and the tab is visible (the GPU
 * does the work, so it keeps running during scroll, unlike the CSS loops).
 * Under `prefers-reduced-motion: reduce` it draws one still
 * frame. It only runs on a GPU: without WebGL or with software rendering (where
 * every frame would block the main thread) the canvas simply stays empty. While the
 * interactive loop runs, the parent element carries a `data-live` attribute.
 * The WebGL context is kept across effect cleanups (the App Router preserves the
 * page's DOM across navigations and re-runs the effect on the same canvas) and
 * rebuilt after a `webglcontextlost` / `webglcontextrestored` cycle.
 */
export function ChromaCurrent({
  colors = ['#ff7c00', '#00ffcc'],
  className = '',
}: ChromaCurrentProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [colorA, colorB] = colors;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
    });
    if (!gl) return;
    const debug = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = String(
      (debug && gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)) || gl.getParameter(gl.RENDERER),
    );
    if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)) return;
    const loseExt = loseExtensions.get(canvas) ?? gl.getExtension('WEBGL_lose_context');
    if (loseExt) loseExtensions.set(canvas, loseExt);

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(coarse ? 1 : 1.5, window.devicePixelRatio || 1);
    const pitch = 9 * dpr;
    const parent = canvas.parentElement;

    /* GL resources live in `res`: created by setup(), released by dispose(). The
       context itself is never dropped on purpose: the router keeps this canvas alive
       across navigations and re-runs the effect on the same node, so the context has
       to survive the cleanup (a lost context cannot be re-created on an element). */
    interface Resources {
      field: WebGLProgram;
      dots: WebGLProgram;
      shaders: WebGLShader[];
      buffer: WebGLBuffer | null;
      texture: WebGLTexture | null;
      framebuffer: WebGLFramebuffer | null;
      fieldU: Record<'R' | 'T' | 'M' | 'PX' | 'PL', WebGLUniformLocation | null>;
      dotsU: Record<'G' | 'T' | 'PX' | 'IN', WebGLUniformLocation | null>;
    }
    let res: Resources | null = null;
    let width = 0;
    let height = 0;
    let gridW = 0;
    let gridH = 0;

    const resize = () => {
      if (!res) return;
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gridW = Math.ceil(width / pitch);
      gridH = Math.ceil(height / pitch);
      gl.bindTexture(gl.TEXTURE_2D, res.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gridW, gridH, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.useProgram(res.field);
      gl.uniform2f(res.fieldU.R, width, height);
      gl.uniform1f(res.fieldU.PX, pitch);
      gl.useProgram(res.dots);
      gl.uniform2f(res.dotsU.G, gridW, gridH);
      gl.uniform1f(res.dotsU.PX, pitch);
    };

    const setup = (): boolean => {
      if (res || gl.isContextLost()) return !!res;
      const shaders: WebGLShader[] = [];
      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
      };
      const link = (fragment: string) => {
        const vs = compile(gl.VERTEX_SHADER, VERTEX);
        const fs = compile(gl.FRAGMENT_SHADER, fragment);
        const program = gl.createProgram();
        if (!vs || !fs || !program) return null;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
      };
      const field = link(FIELD);
      const dots = link(DOTS);
      if (!field || !dots) {
        shaders.forEach((shader) => gl.deleteShader(shader));
        return false;
      }

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      for (const program of [field, dots]) {
        const position = gl.getAttribLocation(program, 'p');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      }
      const u = (program: WebGLProgram, name: string) => gl.getUniformLocation(program, name);
      gl.useProgram(field);
      gl.uniform3fv(u(field, 'A'), hexToRgb(colorA));
      gl.uniform3fv(u(field, 'B'), hexToRgb(colorB));
      gl.useProgram(dots);
      gl.uniform1i(u(dots, 'F'), 0);

      // The field texture: one texel per dot, nearest sampling, redrawn every frame.
      const texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const framebuffer = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clearColor(0, 0, 0, 0);

      res = {
        field,
        dots,
        shaders,
        buffer,
        texture,
        framebuffer,
        fieldU: {
          R: u(field, 'R'),
          T: u(field, 'T'),
          M: u(field, 'M'),
          PX: u(field, 'PX'),
          PL: u(field, 'PL'),
        },
        dotsU: { G: u(dots, 'G'), T: u(dots, 'T'), PX: u(dots, 'PX'), IN: u(dots, 'IN') },
      };
      resize();
      return true;
    };

    const dispose = () => {
      if (!res) return;
      gl.deleteFramebuffer(res.framebuffer);
      gl.deleteTexture(res.texture);
      gl.deleteBuffer(res.buffer);
      gl.deleteProgram(res.field);
      gl.deleteProgram(res.dots);
      res.shaders.forEach((shader) => gl.deleteShader(shader));
      res = null;
    };

    // Pointer: eased target in canvas pixels (y up, as gl_FragCoord).
    let targetX = -9999;
    let targetY = -9999;
    let mouseX = targetX;
    let mouseY = targetY;
    const plume = { x: 0, y: 0, strength: 0 };
    const toCanvas = (clientX: number, clientY: number): [number, number] => {
      const rect = canvas.getBoundingClientRect();
      return [(clientX - rect.left) * dpr, (rect.height - (clientY - rect.top)) * dpr];
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      [targetX, targetY] = toCanvas(event.clientX, event.clientY);
    };
    const onDown = (event: PointerEvent) => {
      if ((event.target as Element).closest('a, button')) return;
      [plume.x, plume.y] = toCanvas(event.clientX, event.clientY);
      plume.strength = 1.4;
    };

    let visible = true;
    let frame = 0;
    let started = false;
    const start = performance.now();
    const draw = (now: number) => {
      frame = 0;
      if (!res || !visible || document.hidden || gl.isContextLost()) return;
      const t = still ? 2 : (now - start) / 1000;
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;
      plume.strength *= 0.985;

      gl.bindFramebuffer(gl.FRAMEBUFFER, res.framebuffer);
      gl.viewport(0, 0, gridW, gridH);
      gl.disable(gl.BLEND);
      gl.useProgram(res.field);
      gl.uniform1f(res.fieldU.T, t);
      gl.uniform2f(res.fieldU.M, mouseX, mouseY);
      gl.uniform3f(res.fieldU.PL, plume.x, plume.y, plume.strength);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(res.dots);
      gl.uniform1f(res.dotsU.T, t);
      gl.uniform1f(res.dotsU.IN, still ? 1 : Math.min(1, t / 1.8));
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!still) frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const play = () => {
      if (!started || !res || frame) return;
      if (!still) parent?.setAttribute('data-live', '');
      frame = requestAnimationFrame(draw);
    };

    // Context loss (GPU reset, tab evicted on mobile, bfcache): stop, then rebuild on restore.
    const onLost = (event: Event) => {
      event.preventDefault();
      stop();
      dispose();
      parent?.removeAttribute('data-live');
    };
    const onRestored = () => {
      if (setup()) play();
    };
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible) play();
      },
      { rootMargin: '10% 0px' },
    );
    observer.observe(canvas);
    const resizer = new ResizeObserver(() => {
      resize();
      if (still) play();
    });
    resizer.observe(canvas);
    const onVisibility = () => {
      if (!document.hidden) play();
    };
    const onPageShow = () => play();
    if (!still) {
      if (!coarse) window.addEventListener('pointermove', onMove, { passive: true });
      parent?.addEventListener('pointerdown', onDown);
    }
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pageshow', onPageShow);

    if (gl.isContextLost()) {
      // A canvas restored from the bfcache may come back without its context: ask for it.
      loseExt?.restoreContext();
    } else {
      setup();
    }

    // Let the page settle (fonts, hydration, LCP) before the first frame.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const idleId = idle(() => {
      started = true;
      play();
    });

    return () => {
      cancelIdle(idleId);
      stop();
      observer.disconnect();
      resizer.disconnect();
      window.removeEventListener('pointermove', onMove);
      parent?.removeEventListener('pointerdown', onDown);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pageshow', onPageShow);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      parent?.removeAttribute('data-live');
      dispose();
    };
  }, [colorA, colorB]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
