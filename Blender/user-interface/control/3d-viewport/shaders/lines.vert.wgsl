struct Uniforms {
  modelViewProjectionMatrix : mat4x4<f32>,
}
@binding(0) @group(0) var<uniform> uniforms : Uniforms;

struct VertexOut {
    @builtin(position) position : vec4<f32>,
    @location(0) color : vec4<f32>,
};

@vertex
fn main(@location(0) position: vec4<f32>,
        @location(1) color: vec4<f32>) -> VertexOut
{
    var output : VertexOut;
    output.position = uniforms.modelViewProjectionMatrix * position;
    output.color = color;
    return output;
} 
