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
