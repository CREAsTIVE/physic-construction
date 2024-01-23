precision highp float;
uniform float ratio;
uniform float gridScale;
uniform float time;
uniform float brightness;
uniform int linesCount;
varying vec2 vTexCoord;

float random (vec3 st) {
    return fract(sin(dot(st.xy,
                         vec2(mod(st.z, 4.) - 1.2,78.233 * mod(st.z, 4.))))*
        43758.5453123);
}

#define pi 3.14
#define l 2.7 // минимальное значение множителя (что бы центр линии не был слишком тёмным)

float getLineMultiplier(float x, int count){
  return (sin(x*float(count)*pi*2.+(pi/2.))+l-1.)/l;
}

void main() {
  vec2 uv = vTexCoord * vec2(1, ratio) * gridScale;
  ivec2 cellIndex = ivec2(uv);
  vec3 col = vec3(random(vec3(cellIndex, time))) * brightness + (1. - brightness)/2.;
  if (linesCount > 0){
    col *= getLineMultiplier(vTexCoord.x, linesCount);
  }
  gl_FragColor = vec4(col, 1);
}

