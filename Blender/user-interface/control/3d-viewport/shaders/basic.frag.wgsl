struct VertexOutput {
  @builtin(position) Position : vec4<f32>,
  @location(0) fragColor : vec4<f32>,
  @location(1) fragUV : vec2<f32>,
  @location(2) fragPosition: vec4<f32>,
}

@fragment
fn main(fragData: VertexOutput) -> @location(0) vec4<f32> {
  return fragData.fragColor;
}