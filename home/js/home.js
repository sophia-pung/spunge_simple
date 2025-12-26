import * as THREE from 'three';

// ============================================
// AURORA BOREALIS VERTEX SHADER
// ============================================
const vertexShader = `
    varying vec2 vUv;
    
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// ============================================
// AURORA BOREALIS FRAGMENT SHADER
// Ported from Unity ShaderGraph Aurora Borealis
// ============================================
const fragmentShader = `
    precision highp float;
    
    uniform vec2 resolution;
    uniform float time;
    
    // Aurora parameters (from Unity violet material)
    uniform vec3 auroraColor;      // HDR violet color
    uniform float noiseTiling;     // ~3.0
    uniform vec2 noiseSpeed;       // animation speed
    uniform float noisePower;      // intensity of noise
    uniform float noiseScale;      // overall scale
    uniform float auroraIntensity; // brightness multiplier
    
    varying vec2 vUv;
    
    // ============================================
    // SIMPLEX NOISE (2D)
    // ============================================
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
    
    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                        + i.x + vec3(0.0, i1.x, 1.0));
        
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                                dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        
        return 130.0 * dot(m, g);
    }
    
    // ============================================
    // FRACTAL BROWNIAN MOTION (FBM)
    // Multiple octaves of noise for rich detail
    // ============================================
    float fbm(vec2 p, int octaves) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        for (int i = 0; i < 6; i++) {
            if (i >= octaves) break;
            value += amplitude * snoise(p * frequency);
            frequency *= 2.0;
            amplitude *= 0.5;
        }
        
        return value;
    }
    
    // ============================================
    // AURORA CURTAIN EFFECT
    // ============================================
    float auroraCurtain(vec2 uv, float timeOffset) {
        // Vertical wave distortion
        float wave1 = sin(uv.x * 3.0 + time * 0.3 + timeOffset) * 0.1;
        float wave2 = sin(uv.x * 7.0 - time * 0.2 + timeOffset * 2.0) * 0.05;
        float wave3 = sin(uv.x * 13.0 + time * 0.4 + timeOffset * 0.5) * 0.02;
        
        float verticalWave = wave1 + wave2 + wave3;
        
        // Animated UV offset (from Unity shader)
        vec2 animatedUV = uv;
        animatedUV.x += time * noiseSpeed.x;
        animatedUV.y += time * noiseSpeed.y + verticalWave;
        
        // Multi-scale noise for aurora bands
        float noise1 = snoise(animatedUV * noiseTiling);
        float noise2 = snoise(animatedUV * noiseTiling * 2.0 + vec2(100.0, 0.0));
        float noise3 = snoise(animatedUV * noiseTiling * 0.5 + vec2(0.0, 50.0));
        
        // Combine noise layers
        float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
        combinedNoise = pow(abs(combinedNoise), noisePower);
        
        return combinedNoise;
    }
    
    // ============================================
    // MOUNTAIN SILHOUETTE
    // ============================================
    float mountainShape(vec2 uv) {
        float x = uv.x;
        
        // Multiple mountain layers - lower profile like in reference
        float mountain1 = 0.08 + 0.05 * sin(x * 3.5) + 0.025 * sin(x * 8.0 + 1.0);
        float mountain2 = 0.06 + 0.04 * sin(x * 5.0 + 2.0) + 0.02 * sin(x * 12.0);
        float mountain3 = 0.10 + 0.06 * sin(x * 2.0 - 1.0) + 0.03 * sin(x * 6.0 + 0.5);
        
        // Add some noise for rocky texture
        float rockNoise = snoise(vec2(x * 30.0, 0.0)) * 0.012;
        float detailNoise = snoise(vec2(x * 80.0, 0.0)) * 0.005;
        
        float mountainHeight = max(max(mountain1, mountain2), mountain3) + rockNoise + detailNoise;
        
        // Smooth transition at mountain edge
        float mountainMask = smoothstep(mountainHeight + 0.008, mountainHeight - 0.008, uv.y);
        
        return mountainMask;
    }
    
    void main() {
        vec2 uv = vUv;
        float aspect = resolution.x / resolution.y;
        
        // ========================================
        // STARFIELD BACKGROUND
        // ========================================
        vec3 backgroundColor = vec3(0.01, 0.01, 0.02);
        
        // Subtle star twinkle
        float stars = 0.0;
        vec2 starUV = uv * 200.0;
        float starNoise = snoise(starUV);
        if (starNoise > 0.85) {
            float twinkle = sin(time * 3.0 + starNoise * 100.0) * 0.5 + 0.5;
            stars = (starNoise - 0.85) * 6.0 * twinkle;
        }
        backgroundColor += vec3(stars * 0.5);
        
        // ========================================
        // AURORA BOREALIS
        // ========================================
        
        // Aurora appears in upper portion of screen
        float auroraHeight = smoothstep(0.3, 0.9, uv.y);
        float auroraFade = smoothstep(1.0, 0.7, uv.y); // Fade at very top
        float verticalMask = auroraHeight * auroraFade;
        
        // Multiple aurora curtain layers for depth
        float aurora1 = auroraCurtain(uv, 0.0);
        float aurora2 = auroraCurtain(uv * 1.3 + vec2(0.5, 0.0), 1.5);
        float aurora3 = auroraCurtain(uv * 0.7 + vec2(-0.3, 0.1), 3.0);
        
        // Combine aurora layers
        float auroraBase = aurora1 * 0.5 + aurora2 * 0.3 + aurora3 * 0.2;
        
        // Vertical streaks (characteristic of aurora)
        float streakNoise = snoise(vec2(uv.x * 30.0 + time * 0.1, time * 0.05));
        float streaks = pow(abs(streakNoise), 3.0) * 0.5;
        auroraBase += streaks * verticalMask;
        
        // Apply vertical mask
        float aurora = auroraBase * verticalMask;
        
        // ========================================
        // AURORA COLORING
        // ========================================
        
        // Normalize HDR color for WebGL (Unity uses HDR values ~300+)
        vec3 normalizedColor = auroraColor / 300.0;
        
        // Color variation across the aurora
        float colorShift = snoise(uv * 2.0 + time * 0.1) * 0.3;
        
        // Primary violet/purple
        vec3 color1 = normalizedColor;
        // Secondary pink/magenta
        vec3 color2 = vec3(normalizedColor.r * 1.2, normalizedColor.g * 0.8, normalizedColor.b * 0.9);
        // Tertiary blue
        vec3 color3 = vec3(normalizedColor.r * 0.5, normalizedColor.g * 0.9, normalizedColor.b * 1.1);
        
        // Blend colors based on position and noise
        vec3 auroraColor1 = mix(color1, color2, smoothstep(-0.3, 0.3, colorShift));
        vec3 finalAuroraColor = mix(auroraColor1, color3, smoothstep(0.2, 0.5, colorShift + uv.x * 0.3));
        
        // Apply aurora to scene
        vec3 color = backgroundColor;
        color += finalAuroraColor * aurora * auroraIntensity;
        
        // ========================================
        // GLOW / BLOOM EFFECT
        // ========================================
        
        // Soft atmospheric glow
        float glowMask = smoothstep(0.2, 0.8, uv.y) * smoothstep(1.0, 0.6, uv.y);
        vec3 atmosphericGlow = normalizedColor * 0.15 * glowMask * (0.5 + aurora * 0.5);
        color += atmosphericGlow;
        
        // ========================================
        // MOUNTAIN SILHOUETTE
        // ========================================
        
        float mountain = mountainShape(uv);
        
        // Mountain color (very dark with slight purple tint from aurora reflection)
        vec3 mountainColor = vec3(0.02, 0.015, 0.025);
        
        // Subtle aurora reflection on mountain edges
        float edgeGlow = smoothstep(0.0, 0.05, uv.y - 0.1) * (1.0 - smoothstep(0.1, 0.25, uv.y));
        mountainColor += normalizedColor * 0.05 * edgeGlow * aurora;
        
        // Apply mountain
        color = mix(color, mountainColor, mountain);
        
        // ========================================
        // FINAL ADJUSTMENTS
        // ========================================
        
        // Subtle vignette
        float vignette = 1.0 - length((uv - 0.5) * vec2(1.0, 0.8)) * 0.3;
        color *= vignette;
        
        // Tone mapping for HDR-like feel
        color = color / (color + vec3(1.0));
        
        // Slight gamma correction
        color = pow(color, vec3(0.95));
        
        gl_FragColor = vec4(color, 1.0);
    }
`;

// ============================================
// THREE.JS SETUP
// ============================================

const canvas = document.getElementById('aurora-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

// Uniforms from Unity violet material
const uniforms = {
    resolution: { value: new THREE.Vector2() },
    time: { value: 0.0 },
    
    // Aurora parameters (values from Unity AuroraBorealis_Violet.mat)
    auroraColor: { value: new THREE.Vector3(303.55, 297.16, 766.99) }, // HDR violet
    noiseTiling: { value: 3.0 },
    noiseSpeed: { value: new THREE.Vector2(-0.01, -0.04) },
    noisePower: { value: 1.4 },
    noiseScale: { value: 500.0 },
    auroraIntensity: { value: 2.5 }
};

// Create fullscreen quad with aurora shader
const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms
});
const quad = new THREE.Mesh(geometry, material);
scene.add(quad);

// ============================================
// RESIZE HANDLING
// ============================================

function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    
    uniforms.resolution.value.set(width * pixelRatio, height * pixelRatio);
}

window.addEventListener('resize', resize);
resize();

// ============================================
// ANIMATION LOOP
// ============================================

function animate(time) {
    // Update time uniform (in seconds)
    uniforms.time.value = time * 0.001;
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

console.log('Aurora Borealis homepage initialized');

