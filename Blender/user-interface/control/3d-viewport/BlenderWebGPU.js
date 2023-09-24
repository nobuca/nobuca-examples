import BlenderLogger from "../../../business-logic/logger/BlenderLogger.js";
import BlenderMatrix4 from "../../../business-logic/math/BlenderMatrix4.js";

export default class BlenderWebGPU {

    static pageIsVisible = true;

    constructor() {
        this.initializingWebGPU = false;
        this.sampleCount = 4;
    }

    getSampleCount() {
        return this.sampleCount;
    }

    getCanvas() {
        return this.canvas;
    }

    getCamera() {
        return this.camera;
    }

    getVertexArrayLines() {
        return this.vertexArrayLines;
    }

    getVertexArrayTriangles() {
        return this.vertexArrayTriangles;
    }

    async initialize(canvas, camera, vertexArrayLines, vertexArrayTriangles) {

        this.canvas = canvas;
        this.camera = camera;
        this.vertexArrayLines = vertexArrayLines;
        this.vertexArrayTriangles = vertexArrayTriangles;

        if (this.initializingWebGPU) return;

        this.initializingWebGPU = true;

        if (!navigator.gpu) {
            BlenderLogger.error("WebGPU not supported :-(");
            this.initializingWebGPU = false;
            return;
        } else {
            BlenderLogger.debug("WebGPU supported :-)");
        }

        BlenderLogger.debug("WebGPU: Getting adapter...");

        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            BlenderLogger.error("WebGPU: Adapter not found");
            this.initializingWebGPU = false;
            return;
        } else {
            BlenderLogger.debug("WebGPU: Adapter found");
        }

        BlenderLogger.debug("WebGPU: Checking if device is lost...");

        this.device = await adapter.requestDevice();
        this.getDevice().lost.then(() => {
            BlenderLogger.error("WebGPU: Device has been lost");
            this.initializingWebGPU = false;
            return null;
        });

        BlenderLogger.debug("WebGPU: Checking if canvas supports WebGPU...");

        const context = this.getCanvas().getContext("webgpu");
        if (!context) {
            BlenderLogger.error(
                "WebGPU: Canvas does not support WebGPU"
            );
            this.initializingWebGPU = false;
            return null;
        } else {
            BlenderLogger.debug("WebGPU: Canvas support WebGPU");
        }

        BlenderLogger.debug("WebGPU: Configuring swap chain...");

        const devicePixelRatio = window.devicePixelRatio || 1;
        this.getCanvas().width = this.getCanvas().clientWidth * devicePixelRatio;
        this.getCanvas().height = this.getCanvas().clientHeight * devicePixelRatio;
        this.presentationFormat = navigator.gpu.getPreferredCanvasFormat();

        BlenderLogger.debug("WebGPU: Configuring context...");

        context.configure({
            device: this.getDevice(),
            format: this.getPresentationFormat(),
            alphaMode: 'premultiplied'
        });

        BlenderLogger.debug("WebGPU: Context configured.");

        BlenderLogger.debug("WebGPU: Creating vertex buffers...");

        this.createVertexBufferLineList();
        this.createVertexBufferTriangleList();

        this.createVertexBufferDescriptorLineList();
        this.createVertexBufferDescriptorTriangleList();

        BlenderLogger.debug("WebGPU: Vertex buffers created.");

        BlenderLogger.debug("WebGPU: Creating shaders...");

        BlenderLogger.debug("WebGPU: Shaders created.");

        BlenderLogger.debug("WebGPU: Creating render pipelines...");

        await this.createPipelineLineList();
        await this.createPipelineTriangleList();
        await this.createPipelineTexturedTriangleList();

        BlenderLogger.debug("WebGPU: Render pipelines created.");

        const texture = this.getDevice().createTexture({
            size: [this.getCanvas().width, this.getCanvas().height],
            sampleCount: this.getSampleCount(),
            format: this.getPresentationFormat(),
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        });
        const view = texture.createView();

        const depthTexture = this.getDevice().createTexture({
            size: [this.getCanvas().width, this.getCanvas().height],
            sampleCount: this.getSampleCount(),
            format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        });

        this.createUniformBuffer();

        BlenderLogger.debug("WebGPU: Creating binding groups...");

        await this.createUniformBindGroupLineList();
        await this.createUniformBindGroupTriangleList();
        await this.createUniformBindGroupTexturedTriangleList();

        BlenderLogger.debug("WebGPU: Binding groups created.");

        const aspect = this.getCanvas().width / this.getCanvas().height;
        this.projectionMatrix = new BlenderMatrix4();
        this.projectionMatrix.perspective(
            (2 * Math.PI) / 10,
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

        this.getCanvas().addEventListener("mousemove", event => {
            this.mouseState.rightButtonDown = (event.buttons & 2) !== 0;
            this.mouseState.wheelButtonDown = (event.buttons & 4) !== 0;
            this.mouseState.leftButtonDown = (event.buttons & 1) !== 0;
            if (this.mouseState.wheelButtonDown) {
                this.mouseState.x += event.movementX;
                this.mouseState.y += event.movementY;
            }
        });

        this.getCanvas().addEventListener("wheel", event => {
            this.mouseState.wheel += Math.sign(event.deltaY);
        }, { passive: true });

        this.deltaTime = 0;
        this.lastFrameMS = Date.now();

        // ~~ Define render loop ~~
        var frame = () => {

            const now = Date.now();
            this.deltaTime = (now - this.lastFrameMS) / 1000;
            this.lastFrameMS = now;

            this.getCamera().update(this.deltaTime, this.mouseState);

            this.mouseState.x = 0;
            this.mouseState.y = 0;
            this.mouseState.wheel = 0;
            this.mouseState.leftButtonDown = false;

            if (!BlenderWebGPU.pageIsVisible) return;

            var viewMatrix = this.getCamera().getViewMatrix();

            this.modelViewProjectionMatrix.multiply(this.projectionMatrix, viewMatrix);

            this.getDevice().queue.writeBuffer(
                this.getUniformBuffer(),
                0,
                this.modelViewProjectionMatrix.getValues().buffer,
                this.modelViewProjectionMatrix.getValues().byteOffset,
                this.modelViewProjectionMatrix.getValues().byteLength
            );

            const commandEncoder = this.getDevice().createCommandEncoder();

            // ~~ CREATE RENDER PASS DESCRIPTOR ~~
            const renderPassDescriptor = {
                colorAttachments: [
                    {
                        view,
                        resolveTarget: context.getCurrentTexture().createView(),
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

            const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

            passEncoder.setPipeline(this.getPipelineTriangleList());
            passEncoder.setBindGroup(0, this.getUniformBindGroupTriangleList());
            passEncoder.setVertexBuffer(0, this.getVertexBufferTriangleList());
            passEncoder.draw(this.getVertexArrayTriangles().getVertexCount());

            passEncoder.setPipeline(this.getPipelineLineList());
            passEncoder.setBindGroup(0, this.getUniformBindGroupLineList());
            passEncoder.setVertexBuffer(0, this.getVertexBufferLineList());
            passEncoder.draw(this.getVertexArrayLines().getVertexCount());

            passEncoder.end();

            this.getDevice().queue.submit([commandEncoder.finish()]);

            requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);

        this.initializingWebGPU = false;
    }

    getPresentationFormat() {
        return this.presentationFormat;
    }

    getDevice() {
        return this.device;
    }

    async loadShaderModuleFromFile(url) {
        const response = await fetch(url);
        const code = await response.text();
        return this.getDevice().createShaderModule({ code });
    }

    createVertexBufferLineList() {
        this.vertexBufferLineList = this.getDevice().createBuffer({
            size: this.getVertexArrayLines().getVertexArray().byteLength,
            usage: GPUBufferUsage.VERTEX,
            mappedAtCreation: true,
        });
        new Float32Array(this.vertexBufferLineList.getMappedRange()).set(this.getVertexArrayLines().getVertexArray());
        this.vertexBufferLineList.unmap();
    }

    getVertexBufferLineList() {
        return this.vertexBufferLineList;
    }

    createVertexBufferTriangleList() {
        this.vertexBufferTriangleList = this.getDevice().createBuffer({
            size: this.getVertexArrayTriangles().getVertexArray().byteLength,
            usage: GPUBufferUsage.VERTEX,
            mappedAtCreation: true,
        });
        new Float32Array(this.vertexBufferTriangleList.getMappedRange()).set(this.getVertexArrayTriangles().getVertexArray());
        this.vertexBufferTriangleList.unmap();
    }

    getVertexBufferTriangleList() {
        return this.vertexBufferTriangleList;
    }

    createVertexBufferDescriptorLineList() {
        this.vertexBuffersDescriptorsLineList = [
            {
                attributes: [
                    {
                        shaderLocation: 0,
                        offset: this.getVertexArrayLines().getPositionOffset(),
                        format: "float32x4",
                    },
                    {
                        shaderLocation: 1,
                        offset: this.getVertexArrayLines().getColorOffset(),
                        format: "float32x4",
                    },
                ],
                arrayStride: this.getVertexArrayLines().getNumberOfBytesPerVertex()
            },
        ];
    }

    getVertexBufferDescriptorLineList() {
        return this.vertexBuffersDescriptorsLineList;
    }

    async createPipelineLineList() {
        const linesVerWgsl = await this.loadShaderModuleFromFile('./user-interface/control/3d-viewport/shaders/lines.vert.wgsl');
        const linesFragWgsl = await this.loadShaderModuleFromFile('./user-interface/control/3d-viewport/shaders/lines.frag.wgsl');
        this.pipelineLineList = this.getDevice().createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: linesVerWgsl,
                entryPoint: "main",
                buffers: this.getVertexBufferDescriptorLineList(),
            },
            fragment: {
                module: linesFragWgsl,
                entryPoint: "main",
                targets: [
                    {
                        format: this.getPresentationFormat(),
                    },
                ],
            },
            primitive: {
                topology: "line-list",
                cullMode: 'back',
            },
            depthStencil: {
                depthWriteEnabled: true,
                depthCompare: 'less',
                format: 'depth24plus',
            },
            multisample: {
                count: this.getSampleCount(),
            },
        });
    }

    getPipelineLineList() {
        return this.pipelineLineList;
    }

    createVertexBufferDescriptorTriangleList() {
        this.vertexBufferDescriptorTriangleList = [
            {
                attributes: [
                    {
                        shaderLocation: 0,
                        offset: this.getVertexArrayTriangles().getPositionOffset(),
                        format: "float32x4",
                    },
                    {
                        shaderLocation: 1,
                        offset: this.getVertexArrayTriangles().getColorOffset(),
                        format: "float32x4",
                    },
                    {
                        shaderLocation: 2,
                        offset: this.getVertexArrayTriangles().getUvOffset(),
                        format: "float32x2",
                    },
                ],
                arrayStride: this.getVertexArrayTriangles().getNumberOfBytesPerVertex()
            },
        ];
    }

    getVertexBufferDescriptorTriangleList() {
        return this.vertexBufferDescriptorTriangleList;
    }

    async createPipelineTriangleList() {
        const basicVertWgsl = await this.loadShaderModuleFromFile('./user-interface/control/3d-viewport/shaders/basic.vert.wgsl');
        const basicFragWgsl = await this.loadShaderModuleFromFile('./user-interface/control/3d-viewport/shaders/basic.frag.wgsl');

        this.pipelineTriangleList = this.getDevice().createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: basicVertWgsl,
                entryPoint: "main",
                buffers: this.getVertexBufferDescriptorTriangleList(),
            },
            fragment: {
                module: basicFragWgsl,
                entryPoint: "main",
                targets: [
                    {
                        format: this.getPresentationFormat(),
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
            multisample: {
                count: this.getSampleCount(),
            },
        });
    }

    getPipelineTriangleList() {
        return this.pipelineTriangleList;
    }

    async createPipelineTexturedTriangleList() {
        const basicVertWgsl = await this.loadShaderModuleFromFile('./user-interface/control/3d-viewport/shaders/basic.vert.wgsl');
        const sampleTextureMixColorFragWgsl = await this.loadShaderModuleFromFile('./user-interface/control/3d-viewport/shaders/sampleTextureMixColor.frag.wgsl');
        this.pipelineTexturedTriangleList = this.getDevice().createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: basicVertWgsl,
                entryPoint: "main",
                buffers: this.getVertexBufferDescriptorTriangleList(),
            },
            fragment: {
                module: sampleTextureMixColorFragWgsl,
                entryPoint: "main",
                targets: [
                    {
                        format: this.getPresentationFormat(),
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
            multisample: {
                count: this.getSampleCount(),
            },
        });
    }

    getPipelineTexturedTriangleList() {
        return this.pipelineTexturedTriangleList;
    }

    createUniformBuffer() {
        const uniformBufferSize = 4 * 16; // 4x4 matrix
        this.uniformBuffer = this.getDevice().createBuffer({
            size: uniformBufferSize,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
    }

    getUniformBuffer() {
        return this.uniformBuffer;
    }

    createUniformBindGroupLineList() {
        this.uniformBindGroupLineList = this.getDevice().createBindGroup({
            layout: this.getPipelineLineList().getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this.getUniformBuffer(),
                    },
                },
            ],
        });
    }

    getUniformBindGroupLineList() {
        return this.uniformBindGroupLineList;
    }

    createUniformBindGroupTriangleList() {
        this.uniformBindGroupTriangleList = this.getDevice().createBindGroup({
            layout: this.getPipelineTriangleList().getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this.getUniformBuffer(),
                    },
                },
            ],
        });
    }

    getUniformBindGroupTriangleList() {
        return this.uniformBindGroupTriangleList;
    }

    async createUniformBindGroupTexturedTriangleList() {
        
        // Create a sampler with linear filtering for smooth interpolation.
        const sampler = this.getDevice().createSampler({
            magFilter: 'linear',
            minFilter: 'linear',
        });

        // Fetch the image and upload it into a GPUTexture.
        let cubeTexture;
        {
            const response = await fetch(
                new URL('../3d-viewport/shaders/Di-3d.png', import.meta.url).toString()
            );
            const imageBitmap = await createImageBitmap(await response.blob());

            cubeTexture = this.getDevice().createTexture({
                size: [imageBitmap.width, imageBitmap.height, 1],
                format: 'rgba8unorm',
                usage:
                    GPUTextureUsage.TEXTURE_BINDING |
                    GPUTextureUsage.COPY_DST |
                    GPUTextureUsage.RENDER_ATTACHMENT,
            });
            this.getDevice().queue.copyExternalImageToTexture(
                { source: imageBitmap },
                { texture: cubeTexture },
                [imageBitmap.width, imageBitmap.height]
            );
        }

        this.uniformBindGroupTexturedTriangleList = this.getDevice().createBindGroup({
            layout: this.getPipelineTexturedTriangleList().getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this.getUniformBuffer(),
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
    }

    getUniformBindGroupTexturedTriangleList() {
        return this.uniformBindGroupTexturedTriangleList;
    }
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        BlenderLogger.debug("Document is hidden.");
        BlenderWebGPU.pageIsVisible = false;
    } else {
        BlenderLogger.debug("Document is visible.");
        BlenderWebGPU.pageIsVisible = true;
    }
});