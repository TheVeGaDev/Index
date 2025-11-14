function initThreeJSBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050510, 1);
    document.getElementById('three-container').appendChild(renderer.domElement);
    
    // Create floating code particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
        colorArray[i] = Math.random() * 0.5 + 0.5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x00a2ff, 0.1);
    scene.add(ambientLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0x00ff9d, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    camera.position.z = 15;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0001;
        particlesMesh.rotation.y += 0.0002;
        
        // Gentle camera movement
        camera.position.x = Math.sin(Date.now() * 0.0001) * 2;
        camera.position.y = Math.cos(Date.now() * 0.0001) * 2;
        camera.lookAt(0, 0, 0);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}