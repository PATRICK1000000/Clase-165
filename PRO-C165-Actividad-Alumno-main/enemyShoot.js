AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //obtener todos los enemigos usando el nombre de la clase
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //Entidad de la bala del enemigo
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            //Obtener la posición del enemigo y jugador usando el método Three.js 
            var enemy = els[i].object3D;
            var player = document.querySelector("#weapond").object3D;
            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            //Establecer la velocidad y su dirección
            var direction = new THREE.Vector3();
            direction.subVectors(position1, position2).normalize();
            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));
            
            //Establecer el atributo del cuerpo dinámico
            enemyBullet.setAttribute("dynamic-body", {
                 shape: "sphere",
                 mass: 0,
            });
            

            //Obtener atributo de texto
            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value);
            

            //Evento de colisión con las balas enemigas
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Agrega las condiciones aquí
                    if (playerLife > 0) {
                       playerLife -= 1;
                       element.setAttribute("text", {
                        value: playerLife
                       });
                    }
                    if (playerLife <= 0) {
                        var txp = document.querySelector("#over");
                        txt.setAttribute("visible", true);
                        var tankEl = document.querySelectorAll(".enemy");
                        for(var i = 0; i < tankEl.length; i++) {
                            scene.removeChild(tankEl[i]);
                        }
                    }


                }
            });

        }
    },

});
