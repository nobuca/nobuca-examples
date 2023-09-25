@group(0) @binding(1) var mySampler: sampler;
@group(0) @binding(2) var myTexture: texture_2d<f32>;

struct VertexOutput {
  @builtin(position) Position : vec4<f32>,
  @location(0) fragColor: vec4<f32>,
  @location(1) fragUV: vec2<f32>,
  @location(2) fragPosition: vec4<f32>,
  @location(3) fragNormal: vec4<f32>,
}

@fragment
fn main(fragData: VertexOutput) -> @location(0) vec4<f32> {
  return textureSample(myTexture, mySampler, fragData.fragUV);
}