import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";
import BlenderLogger from "../../../business-logic/logger/BlenderLogger.js";
import BlenderMatrix4 from "../../../business-logic/math/BlenderMatrix4.js";

export default class BlenderControl3DViewportView extends NobucaComponentView {

    static pageIsVisible = true;

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControl3DViewport";
        this.setNativeElement(div);

        if (navigator.gpu == null) {
            this.createWebGpuNotSupported();
        } else {
            this.createCanvas();
        }

        setTimeout(() => this.initWebGpu(), 500);
    }

    createCanvas() {
        this.canvas = document.createElement("canvas");
        this.getNativeElement().appendChild(this.canvas);
    }

    createWebGpuNotSupported() {
        var div = document.createElement("div");
        div.className = "BlenderControl3DViewportWebGpuNotSupported";
        div.innerHTML = "WebGPU not supported :-(";
        this.getNativeElement().appendChild(div);
    }

    getCanvas() {
        return this.canvas;
    }

    updateContentsPositionAndSize() {
        if (this.getCanvas() == null) return;
        this.getCanvas().style.width = this.getNativeElement().offsetWidth + "px";
        this.getCanvas().style.height = this.getNativeElement().offsetHeight + "px";
        setTimeout(() => this.initWebGpu(), 500);
    }

    async initWebGpu() {

        if (this.initializingWebGpu) return;

        this.initializingWebGpu = true;

        if (!navigator.gpu) {
            BlenderLogger.error("WebGPU not supported :-(");
            this.initializingWebGpu = false;
            return;
        } else {
            BlenderLogger.debug("WebGPU supported :-)");
        }

        BlenderLogger.debug("WebGPU: Getting adapter...");

        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            BlenderLogger.error("WebGPU: Adapter not found");
            this.initializingWebGpu = false;
            return;
        } else {
            BlenderLogger.debug("WebGPU: Adapter found");
        }

        BlenderLogger.debug("WebGPU: Checking if device is lost...");

        const device = await adapter.requestDevice();
        device.lost.then(() => {
            BlenderLogger.error("WebGPU: Device has been lost");
            this.initializingWebGpu = false;
            return null;
        });

        BlenderLogger.debug("WebGPU: Checking if canvas supports WebGPU...");

        const context = this.getCanvas().getContext("webgpu");
        if (!context) {
            BlenderLogger.error(
                "WebGPU: Canvas does not support WebGPU"
            );
            this.initializingWebGpu = false;
            return null;
        } else {
            BlenderLogger.debug("WebGPU: Canvas support WebGPU");
        }

        BlenderLogger.debug("WebGPU: Configuring swap chain...");

        const devicePixelRatio = window.devicePixelRatio || 1;
        this.getCanvas().width = this.getCanvas().clientWidth * devicePixelRatio;
        this.getCanvas().height = this.getCanvas().clientHeight * devicePixelRatio;
        const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

        BlenderLogger.debug("WebGPU: Configuring context...");

        context.configure({
            device,
            format: presentationFormat,
            alphaMode: 'premultiplied'
        });

        BlenderLogger.debug("WebGPU: Context configured.");

        BlenderLogger.debug("WebGPU: Creating vertex buffer...");

        const vertexBuffer = device.createBuffer({
            size: this.getModel().getMesh().getVertexArray().byteLength,
            usage: GPUBufferUsage.VERTEX,
            mappedAtCreation: true,
        });
        new Float32Array(vertexBuffer.getMappedRange()).set(this.getModel().getMesh().getVertexArray());
        vertexBuffer.unmap();

        const vertexBuffersDescriptors = [
            {
                attributes: [
                    {
                        shaderLocation: 0,
                        offset: this.getModel().getMesh().getPositionOffset(),
                        format: "float32x4",
                    },
                    {
                        shaderLocation: 1,
                        offset: this.getModel().getMesh().getUvOffset(),
                        format: "float32x2",
                    },
                ],
                arrayStride: this.getModel().getMesh().getVertexSize()
            },
        ];

        BlenderLogger.debug("WebGPU: Vertex buffer created.");

        BlenderLogger.debug("WebGPU: Creating shaders...");

        async function loadShaderModuleFromFile(device, url) {
            const response = await fetch(url);
            const code = await response.text();
            return device.createShaderModule({ code });
        }

        //const triangleVertWgsl = await loadShaderModuleFromFile(device, './user-interface/control/3d-viewport/shaders/triangle.vert.wgsl');
        //const redFragWgsl = await loadShaderModuleFromFile(device, './user-interface/control/3d-viewport/shaders/red.frag.wgsl');
        //const shaderModuleWgsl = await loadShaderModuleFromFile(device, './user-interface/control/3d-viewport/shaders/shader-module.wgsl');
        //const cubeWgsl= await loadShaderModuleFromFile(device, './user-interface/control/3d-viewport/shaders/cube.wgsl');
        const basicVertWgsl = await loadShaderModuleFromFile(device, './user-interface/control/3d-viewport/shaders/basic.vert.wgsl');
        //const vertexPositionColorFragWgsl = await loadShaderModuleFromFile(device, './user-interface/control/3d-viewport/shaders/vertexPositionColor.frag.wgsl');
        const sampleTextureMixColorFragWgsl = await loadShaderModuleFromFile(device, './user-interface/control/3d-viewport/shaders/sampleTextureMixColor.frag.wgsl');

        BlenderLogger.debug("WebGPU: Shaders created.");

        BlenderLogger.debug("WebGPU: Creating render pipeline...");

        // ~~ CREATE RENDER PIPELINE ~~
        const pipeline = device.createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: basicVertWgsl,
                entryPoint: "main",
                buffers: vertexBuffersDescriptors,
            },
            fragment: {
                module: sampleTextureMixColorFragWgsl,
                entryPoint: "main",
                targets: [
                    {
                        format: presentationFormat,
                    },
                ],
            },
            primitive: {
                topology: "triangle-list",
                cullMode: 'back',
            },
            depthStencil: {
                depthWriteEnabled: true,
                depthCompare: 'less',
                format: 'depth24plus',
            },
        });

        BlenderLogger.debug("WebGPU: Render pipeline created.");

        const depthTexture = device.createTexture({
            size: [this.getCanvas().width, this.getCanvas().height],
            format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        });

        const uniformBufferSize = 4 * 16; // 4x4 matrix
        const uniformBuffer = device.createBuffer({
            size: uniformBufferSize,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        // Fetch the image and upload it into a GPUTexture.
        let cubeTexture;
        {
            const response = await fetch(
                new URL('../3d-viewport/shaders/Di-3d.png', import.meta.url).toString()
            );
            const imageBitmap = await createImageBitmap(await response.blob());

            cubeTexture = device.createTexture({
                size: [imageBitmap.width, imageBitmap.height, 1],
                format: 'rgba8unorm',
                usage:
                    GPUTextureUsage.TEXTURE_BINDING |
                    GPUTextureUsage.COPY_DST |
                    GPUTextureUsage.RENDER_ATTACHMENT,
            });
            device.queue.copyExternalImageToTexture(
                { source: imageBitmap },
                { texture: cubeTexture },
                [imageBitmap.width, imageBitmap.height]
            );
        }

        // Create a sampler with linear filtering for smooth interpolation.
        const sampler = device.createSampler({
            magFilter: 'linear',
            minFilter: 'linear',
        });

        const uniformBindGroup = device.createBindGroup({
            layout: pipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: uniformBuffer,
                    },
                },
                {
                    binding: 1,
                    resource: sampler,
                },
                {
                    binding: 2,
                    resource: cubeTexture.createView(),
                },
            ],
        });

        // ~~ CREATE RENDER PASS DESCRIPTOR ~~
        const renderPassDescriptor = {
            colorAttachments: [
                {
                    view: undefined, // Assigned later
                    clearValue: { r: 0.23, g: 0.23, b: 0.23, a: 1.0 },
                    loadOp: "clear",
                    storeOp: "store",
                },
            ],
            depthStencilAttachment: {
                view: depthTexture.createView(),
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
            },
        };

        const aspect = this.getCanvas().width / this.getCanvas().height;
        this.projectionMatrix = new BlenderMatrix4();
        this.projectionMatrix.perspective(
            (2 * Math.PI) / 5,
            aspect,
            1,
            100.0
        );

        this.modelViewProjectionMatrix = new BlenderMatrix4();

        this.mouseState = new Object();
        this.mouseState.x = 0;
        this.mouseState.y = 0;
        this.mouseState.wheel = 0;
        this.mouseState.leftButtonDown = false;

        this.getNativeElement().addEventListener("mousemove", event => {
            this.mouseState.leftButtonDown = (event.buttons & 1) !== 0;
            if (this.mouseState.leftButtonDown) {
                this.mouseState.x += event.movementX;
                this.mouseState.y += event.movementY;
            }
        });

        this.getNativeElement().addEventListener("wheel", event => {
            this.mouseState.wheel += Math.sign(event.deltaY);
        });

        this.deltaTime = 0;
        this.lastFrameMS = Date.now();

        // ~~ Define render loop ~~
        var frame = () => {

            const now = Date.now();
            this.deltaTime = (now - this.lastFrameMS) / 1000;
            this.lastFrameMS = now;

            this.getModel().getCamera().update(this.deltaTime, this.mouseState);

            this.mouseState.x = 0;
            this.mouseState.y = 0;
            this.mouseState.wheel = 0;
            this.mouseState.leftButtonDown = false;

            if (!BlenderControl3DViewportView.pageIsVisible) return;

            var viewMatrix = this.getModel().getCamera().getViewMatrix();

            this.modelViewProjectionMatrix.multiply(this.projectionMatrix, viewMatrix);

            device.queue.writeBuffer(
                uniformBuffer,
                0,
                this.modelViewProjectionMatrix.getValues().buffer,
                this.modelViewProjectionMatrix.getValues().byteOffset,
                this.modelViewProjectionMatrix.getValues().byteLength
            );

            renderPassDescriptor.colorAttachments[0].view = context
                .getCurrentTexture()
                .createView();

            const commandEncoder = device.createCommandEncoder();

            const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
            passEncoder.setPipeline(pipeline);
            passEncoder.setBindGroup(0, uniformBindGroup);
            passEncoder.setVertexBuffer(0, vertexBuffer);
            passEncoder.draw(this.getModel().getMesh().getVertexCount());
            passEncoder.end();

            device.queue.submit([commandEncoder.finish()]);

            requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);

        this.initializingWebGpu = false;
    }
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        BlenderLogger.debug("Document is hidden.");
        BlenderControl3DViewportView.pageIsVisible = false;
    } else {
        BlenderLogger.debug("Document is visible.");
        BlenderControl3DViewportView.pageIsVisible = true;
    }
});