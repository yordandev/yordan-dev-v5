<!-- https://www.reactbits.dev/backgrounds/iridescence -->

<template>
  <div
    ref="containerRef"
    class="iridescent-circle"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      overflow: 'hidden',
    }"
  >
    <div class="canvas-container">
      <canvas
        ref="canvasRef"
        :width="size * 2"
        :height="size * 2"
        :style="{ width: `${size}px`, height: `${size}px` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: number;
  color?: [number, number, number];
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
  color: () => [1.0, 1.0, 1.0],
});

const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const animationId = ref<number>(0);

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) {
    return;
  }
  const gl = canvas.getContext("webgl", { alpha: true });

  if (!gl) {
    console.error("WebGL not supported");
    return;
  }

  const vertexShaderSource = `
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    
    float d = -uTime * 0.5;
    float a = 0.0;
    for (float i = 0.0; i < 8.0; ++i) {
      a += cos(i - d - a * uv.x);
      d += sin(uv.y * i + a);
    }
    d += uTime * 0.5;
    
    vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
    col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
    
    gl_FragColor = vec4(col, 1.0);
  }
  `;

  const createShader = (
    gl: WebGLRenderingContext,
    type: number,
    source: string,
  ): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  const createProgram = (
    gl: WebGLRenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader,
  ): WebGLProgram | null => {
    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      console.error(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  };

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource,
  );

  if (!vertexShader || !fragmentShader) {
    console.error("Failed to create shaders");
    return;
  }

  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) {
    console.error("Failed to create program");
    return;
  }

  gl.useProgram(program);

  const vertices = new Float32Array([
    -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
  ]);

  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.error("Failed to create vertex buffer");
    return;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const timeLocation = gl.getUniformLocation(program, "uTime");
  const resolutionLocation = gl.getUniformLocation(program, "uResolution");
  const colorLocation = gl.getUniformLocation(program, "uColor");

  gl.uniform3f(colorLocation, props.color[0], props.color[1], props.color[2]);

  const render = (time: number): void => {
    time *= 0.001;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (timeLocation) gl.uniform1f(timeLocation, time);
    if (resolutionLocation)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    animationId.value = requestAnimationFrame(render);
  };

  animationId.value = requestAnimationFrame(render);
});

onBeforeUnmount(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
  }
});
</script>

<style scoped>
.iridescent-circle {
  position: relative;
  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.1);
}

.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

canvas {
  display: block;
}
</style>
