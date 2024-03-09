 // Set up scene
        const scene = new THREE.Scene();

        // Set up camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 0);

//Star Warp
// Set up renderer
        const renderer = new THREE.WebGLRenderer({ 
          alpha: true,
		      antialias: true
        }); // Pass alpha parameter for transparency
       renderer.setSize(window.innerWidth, window.innerHeight);
      


        // Select the div element with id 'starfield_animation' and append the renderer's DOM element to it
        const starfieldAnimationDiv = document.getElementById('starfield_animation');
        starfieldAnimationDiv.appendChild(renderer.domElement);

        // Array to store stars
        const stars = [];

        // Function to create a star
        function createStar() {
            const starGeometry = new THREE.SphereGeometry(Math.random() * 2 + 0.5, 32, 32);
            const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff});
            const star = new THREE.Mesh(starGeometry, starMaterial);
            const distance = Math.random() * 1000 + 500;
            const angle = Math.random() * Math.PI * 2;
            star.position.set(
                Math.cos(angle) * distance,
                Math.sin(angle) * distance,
                -Math.random() * 500
            );
            scene.add(star);
            stars.push(star);
        }

        // Create stars
        const numStars = 500;
        for (let i = 0; i < numStars; i++) {
            createStar();
        }

        // Add event listener for window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Set up animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Move stars towards the camera and update positions
            stars.forEach(star => {
                star.position.z += 5;
                if (star.position.z > 0) {
                    star.position.z = -1000;
                    star.position.x = (Math.random() - 0.5) * 2000;
                    star.position.y = (Math.random() - 0.5) * 2000;
                }
            });

            // Rotate camera for barrel roll effect
            camera.rotation.z += 0.001;

            renderer.render(scene, camera);
        }

        animate();





        // Set up the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

const planetsDiv = document.getElementById('planets');
        planetsDiv.appendChild(renderer.domElement);

        // Create a white material for the planet
        const planetMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true, // Display the wireframe
            transparent: true, // Make the material transparent
            opacity: 0.5 // Set opacity for the wireframe
        });

        // Create a sphere geometry for the planet
        const planetGeometry = new THREE.SphereGeometry(2, 32, 32);

        // Combine the geometry and material to create the planet mesh
        const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

        // Set the axial tilt of the planet to match Earth's 23.5 degrees
        planetMesh.rotation.x = THREE.MathUtils.degToRad(23.5);

        // Add the planet mesh to the scene
        scene.add(planetMesh);

        // Position the camera to view the planet
        camera.position.z = 5;

        // Add ambient light to the scene
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add a directional light to cast shadows
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(-5, 5, 5); // Adjust light position to top-left
        scene.add(directionalLight);

        // Function to create a moon
        function createMoon(position, radius) {
            const moonMaterialFill = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.7
            });
            const moonMaterialOutline = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true
            });
            const moonGeometry = new THREE.SphereGeometry(radius, 16, 16);
            const moonMesh = new THREE.Mesh(moonGeometry, moonMaterialFill);
            const moonOutline = new THREE.Mesh(moonGeometry, moonMaterialOutline);
            moonMesh.position.copy(position);
            moonOutline.position.copy(position);
            scene.add(moonMesh);
            scene.add(moonOutline);
            return { fill: moonMesh, outline: moonOutline };
        }

        // Create moons
        const moon1 = createMoon(new THREE.Vector3(1.5, 0, 0), 0.15);
        const moon2 = createMoon(new THREE.Vector3(-1.5, 0.5, 1.5), 0.12);
        const moon3 = createMoon(new THREE.Vector3(0.5, -0.5, 2), 0.13);
        const moon4 = createMoon(new THREE.Vector3(0, 1.5, -1.5), 0.125);
        const moon5 = createMoon(new THREE.Vector3(-0.5, -1.5, -0.5), 0.14);

        // Function to animate the spinning planet and moons
        function animate() {
            requestAnimationFrame(animate);

            // Rotate the planet
            planetMesh.rotation.y += 0.001;

            // Rotate the moons around the planet
            const speed = 0.005; // Adjust the speed
            moon1.fill.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), speed);
            moon1.outline.position.copy(moon1.fill.position);
            moon2.fill.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), speed);
            moon2.outline.position.copy(moon2.fill.position);
            moon3.fill.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), speed);
            moon3.outline.position.copy(moon3.fill.position);
            moon4.fill.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), speed);
            moon4.outline.position.copy(moon4.fill.position);
            moon5.fill.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), speed);
            moon5.outline.position.copy(moon5.fill.position);

            // Render the scene
            renderer.render(scene, camera);
        }

        // Call the animate function to start the animation loop
        animate();
