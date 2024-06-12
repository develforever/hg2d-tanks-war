import React, { useContext, useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import debug from "@/frontend/javascripts/logger"
import HomeButton from '@/frontend/javascripts/UI/BackButton';

let renderer:THREE.WebGLRenderer|null = null

function CanvasComp() {

    let width = 200;
    let height = 200;
    const canvasRef = useRef(null);

    useEffect(() => {

        if (canvasRef.current.dataset.engine) {
            return
        }
        debug(canvasRef)

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current || undefined,
            precision: "highp",
            powerPreference: "high-performance",
            antialias: true
        });
        renderer.setSize(width, height);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        function animate() {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer?.render(scene, camera);
        }
        renderer.setAnimationLoop(animate);


    })


    return (
        <canvas ref={canvasRef} width={width} height={height} id="game-canvas"></canvas>
    )
}

export default function () {

    const [cleanDone, setCleanDone] = useState(false);

    function clean() {
        renderer?.dispose()

        setCleanDone(true)
    }

    return (
        <div id="game">
            <CanvasComp></CanvasComp>
            <HomeButton title="Return" onBeforeHome={clean} onBeforeHomeDone={cleanDone}></HomeButton>
        </div>
    )
}