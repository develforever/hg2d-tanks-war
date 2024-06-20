import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import debug from "@/frontend/javascripts/logger"
import HomeButton from '@/frontend/javascripts/UI/BackButton';

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;

interface CanvaState {
    width: number
    height: number
}

interface CanvaStateAction {
    width: number
    height: number
}

export { CanvaState, CanvaStateAction };

const reducer = (state: CanvaState, action: CanvaStateAction) => {
    state.width = action.width;
    state.height = action.height;

    return { ...state }
}

function CanvasComp() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1 / 1, 0.1, 1000);

    let initialState: CanvaState = { width: 1, height: 1 }
    const [state, dispatch] = useReducer(reducer, initialState);
    const size = 30;
    const divisions = 30;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const target1 = useRef<HTMLCanvasElement>(null);

    renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current || undefined,
        precision: "highp",
        powerPreference: "high-performance",
        antialias: true,
        alpha: true,
    });
    renderer.autoClear = false;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const renderTarget = new THREE.WebGLRenderTarget(state.width, state.height, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
    });

    camera.position.set(Math.floor(divisions / 4), Math.floor(divisions / 4), Math.floor(size / 2));

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(1, 1, 0);

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    cube.add(line);
    cube.castShadow = true; //default is false
    cube.receiveShadow = false; //default
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.castShadow = true
    light.position.set(0, Math.floor(size / 2), 0)
    light.shadow.mapSize.width = renderer.capabilities.maxTextureSize / 32;
    light.shadow.mapSize.height = renderer.capabilities.maxTextureSize / 32;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 1000;
    scene.add(light);
    const helper = new THREE.DirectionalLightHelper(light, 5);
    scene.add(helper);


    const gridHelperXY = new THREE.GridHelper(size, divisions);
    scene.add(gridHelperXY);
    const gridHelperYZ = new THREE.GridHelper(size, divisions);
    gridHelperYZ.rotation.set(Math.PI / 2, 0, 0);
    gridHelperYZ.position.y += 0.0001
    scene.add(gridHelperYZ);

    const geometryPlane = new THREE.PlaneGeometry(size, size);
    const materialPalne = new THREE.MeshStandardMaterial({ color: 0x999999, opacity: 1.0, transparent: true, side: THREE.FrontSide });
    const plane = new THREE.Mesh(geometryPlane, materialPalne);
    plane.rotateX(-Math.PI / 2)
    plane.receiveShadow = true;
    scene.add(plane);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    let buffer = new Uint8Array(state.width * state.height * 4)

    let ctx: CanvasRenderingContext2D | null = null;
    if (target1.current) {
        ctx = target1.current.getContext('2d')
    }
    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        controls.update();

        if (scene && camera) {
            // render the texture
            renderer?.setRenderTarget(renderTarget);
            renderer?.clear();
            renderer?.render(scene, camera);

            renderer?.readRenderTargetPixels(renderTarget, 0, 0, state.width, state.height, buffer)

            // render "normal" scene
            renderer?.setRenderTarget(null);
            renderer?.clear();
            renderer?.render(scene, camera);
        }
    }
    renderer?.setAnimationLoop(animate);

    useEffect(() => {
        if (camera) {
            camera.aspect = state.width / state.height;
            camera.updateProjectionMatrix();
        }
        if (renderer) {
            renderer?.setSize(state.width, state.height);
        }

    }, [state])


    useEffect(() => {

        let box = canvasRef.current?.parentElement?.getBoundingClientRect();
        if (box) {
            dispatch({ width: box.width, height: box.height })
        }

        function windowOnResize() {

            let box = canvasRef.current ? canvasRef.current?.parentElement?.getBoundingClientRect() : null;

            if (box && (state.width != box.width || state.height != box.height)) {
                dispatch({ width: box.width, height: box.height })
            }

        }

        globalThis.removeEventListener('resize', windowOnResize);
        globalThis.addEventListener('resize', windowOnResize);

    }, [])

    return (
        <div className='flex-fill position-relative'>
            <canvas style={{ backgroundColor: 'rgba(190, 190, 100, 0.9)' }} ref={canvasRef} width={state.width} height={state.height} id="game-canvas"></canvas>
            <canvas ref={target1} width={50} height={50} className='position-absolute start-0 top-0 border' style={{ zIndex: 10 }}></canvas>
        </div>
    )
}

export default function () {

    const [cleanDone, setCleanDone] = useState(false);
    const [gameStyle, setGameStyle] = useState({
        width: '100%',
        height: '100%',
    })

    function clean() {
        renderer?.dispose()
        camera = null;
        scene = null;
        renderer = null;
        setCleanDone(true)
    }



    return (
        <div id="game" className='d-flex flex-column' style={gameStyle}>
            <CanvasComp ></CanvasComp>
            <div>
                <HomeButton title="Return" onBeforeHome={clean} onBeforeHomeDone={cleanDone}></HomeButton>
            </div>
        </div>
    )
}