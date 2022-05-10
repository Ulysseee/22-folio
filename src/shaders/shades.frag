
uniform float time;
uniform vec3 uBaseFirst;
uniform vec3 uBaseSecond;
uniform vec3 uAccent;
uniform vec2 uMouse;
varying vec2 vUv;
varying vec3 vPosition;

// NOISE
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}


mat2 rotate2D(float angle) {
    return mat2(
        cos(angle), -sin(angle),
        sin(angle), cos(angle)
    );
}

float lines(vec2 uv, float offset) {
    return smoothstep(
        0., 0.5 + offset * 0.5,
        0.5 * abs((sin(uv.x * 30.) + offset * 2.))

    );
}

void main() {
	vec2 mouse = uMouse;

    float n = noise(vPosition + time);

    // vec3 baseFirst = vec3(uBaseFirst);
    // vec3 baseSecond = vec3(uBaseSecond);
    // vec3 accent = vec3(uAccent);

	// vec3 baseFirst = vec3(152./255., 165./255., 218./255.);
    // vec3 baseSecond = vec3(147./255., 159./255., 214./255.);
    // vec3 accent = vec3(17./255., 45./255., 158./255.);

    // vec2 baseUv = rotate2D(n) * vPosition.xy * 0.1;
    vec2 baseUv = rotate2D(n) * vPosition.xy * 0.1;
    float basePattern = lines(baseUv, 0.5);
    float secondPattern = lines(baseUv, 0.1);

    vec3 baseColor = mix(uBaseSecond, uBaseFirst, basePattern);
    vec3 secondBaseColor = mix(baseColor, uAccent, secondPattern);

    gl_FragColor = vec4(vec3(secondBaseColor), 1.);
}
