struct VertexOutput {
  @builtin(position) Position : vec4<f32>,
  @location(0) fragColor: vec4<f32>,
  @location(1) fragUV: vec2<f32>,
  @location(2) fragPosition: vec4<f32>,
  @location(3) fragNormal: vec4<f32>,
}

@fragment
fn main(fragData: VertexOutput) -> @location(0) vec4<f32> {

  let diffuseLightStrength = 1.0;
  let ambientLightIntensity = 0.0;
  let lightPosition = vec4(0.0, -100.0, 0.0, 1.0);

  let lightDirection = normalize(lightPosition - fragData.fragPosition);
  let lightMagnitude = dot(fragData.fragNormal, lightDirection);
  
  let diffuseLightFinal: f32 = diffuseLightStrength * max(lightMagnitude, 0);
  let lightFinal = diffuseLightFinal + ambientLightIntensity;

  return fragData.fragColor * lightFinal;
}