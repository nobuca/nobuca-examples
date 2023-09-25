struct Uniforms {
  modelViewProjectionMatrix : mat4x4<f32>,
  modelViewMatrix : mat4x4<f32>,
}
@binding(0) @group(0) var<uniform> uniforms : Uniforms;

struct VertexOutput {
  @builtin(position) Position : vec4<f32>,
  @location(0) fragColor : vec4<f32>,
  @location(1) fragUV: vec2<f32>,
  @location(2) fragPosition: vec4<f32>,
  @location(3) fragNormal: vec4<f32>,
}

@vertex
fn main(
  @location(0) position : vec4<f32>,
  @location(1) color : vec4<f32>,
  @location(2) uv : vec2<f32>,
  @location(3) normal : vec4<f32>,
) -> VertexOutput {
  var output : VertexOutput;
  output.Position = uniforms.modelViewProjectionMatrix * position;
  output.fragColor = color;
  output.fragNormal = normal;
  output.fragPosition = position;
  return output;
}
