uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
varying vec2 pixels;

void main(){
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
