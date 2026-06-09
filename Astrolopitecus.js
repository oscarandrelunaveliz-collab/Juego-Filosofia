// ==========================================================================
// 1. Nodos de la Historia con Imágenes Geométricas Locales (.png)
// ==========================================================================
const storyNodes = {
    inicio: {
        text: "Te despiertas al amanecer en las ramas de un gran árbol baobab. El sol empieza a calentar la sabana de lo que hoy es Etiopía. Tu estómago ruge de hambre, pero abajo, en el suelo, la alta hierba se mueve sospechosamente. Como Australopithecus, ¿qué decides hacer?",
        image: "geo_inicio.png", 
        choices: [
            { text: "Bajar del árbol inmediatamente y correr a gatas buscando raíces.", nextNode: "bajar_rapido" },
            { text: "Ponerte de pie sobre la rama para otear el horizonte aprovechando tu marcha bípeda.", nextNode: "otear_horizonte" },
            { text: "Buscar frutos e insectos en la copa del árbol para estar seguro.", nextNode: "quedar_arbol" }
        ]
    },
    bajar_rapido: {
        text: "❌ MUERTE EN LA SABANA. Al bajar apresuradamente a cuatro patas, pierdes visibilidad entre los matorrales. Un Meganteron (un felino dientes de sable) que acechaba en la hierba te sorprende. Al no estar erguido, no pudiste verlo venir. Tu linaje evolutivo termina aquí.",
        image: "geo_peligro.png", 
        choices: [
            { text: "Intentar de nuevo", nextNode: "inicio" }
        ]
    },
    quedar_arbol: {
        text: "Pasas horas buscando, pero otros miembros de tu clan ya arrasaron con los frutos maduros de este árbol. Solo quedan hojas secas que dañan tu esmalte dental grueso. El hambre debilita tus fuerzas y el sol del mediodía es implacable. Debes moverte.",
        image: "geo_rio.png", 
        choices: [
            { text: "Bajar con cuidado y caminar erguido hacia el río", nextNode: "camino_rio" }
        ]
    },
    otear_horizonte: {
        text: "¡Excelente decisión! Te pones de pie sobre tus dos piernas libres. Tu anatomía bípeda te permite ver por encima de la maleza. A lo lejos divisas al felino dientes de sable alejándose, y en la dirección opuesta, un destello de agua: un río con árboles frutales. Bajas con cautela caminando erguido.",
        image: "geo_rio.png", 
        choices: [
            { text: "Avanzar hacia el río en busca de alimento", nextNode: "camino_rio" }
        ]
    },
    camino_rio: {
        text: "Llegas a la orilla del río. Encuentras raíces duras, nueces y algunos frutos caídos. Tu mandíbula fuerte y molares con esmalte grueso te permiten masticar este alimento duro sin problemas. De repente, escuchas un trueno. Una tormenta eléctrica impacta un árbol cercano, creando fuego. Tu clan mira asombrado.",
        image: "geo_horizonte.png", 
        choices: [
            { text: "Tomar una rama encendida para mantener el fuego y asustar animales.", nextNode: "intentar_fuego" },
            { text: "Ignorar el fuego, recolectar lo que puedas y regresar al árbol antes de que oscurezca.", nextNode: "regresar_clan" }
        ]
    },
    intentar_fuego: {
        text: "❌ ERROR HISTÓRICO. Te acercas al fuego con una rama, pero te quemas las manos y el pánico se apodera de ti. El género Australopithecus NO dominaba el fuego; sus cerebros aún eran pequeños (~450 cc) para comprender su control. El humo atrae a los depredadores y quedas desprotegido.",
        image: "geo_error_fuego.png", 
        choices: [
            { text: "Reiniciar desde el río", nextNode: "camino_rio" }
        ]
    },
    regresar_clan: {
        text: "¡Sabia decisión! El control del fuego pertenecerá a tus descendientes (el Homo erectus) millones de años después. Con las manos llenas de comida gracias a que no necesitas usarlas para caminar, regresarás de forma segura con tu grupo. Al caer la noche, suben a las copas de los árboles para protegerse.",
        image: "geo_clan.png", 
        choices: [
            { text: "Pasar al día siguiente", nextNode: "final_juego" }
        ]
    },
    final_juego: {
        text: "🎉 ¡VICTORIA! Has sobrevivido un día más en el Plioceno. Gracias a tu marcha bípeda, tu adaptación dental a los alimentos de la sabana y tu prudencia para dormir en los árboles, lograste resguardarte. Millones de años después, unos paleontólogos en 1974 encontrarán tus restos fósiles y te llamarán 'Lucy'. ¡Has hecho historia evolutiva!",
        image: "geo_lucy.png", 
        choices: [
            { text: "Jugar desde el principio", nextNode: "inicio" }
        ]
    }
};

// ==========================================================================
// 2. Lógica de Renderizado, Animaciones y Control de Audio
// ==========================================================================
function goToNode(nodeKey) {
    const node = storyNodes[nodeKey];
    const storyDiv = document.getElementById("story");
    const choicesDiv = document.getElementById("choices");
    const imgEl = document.getElementById("story-img");

    // Quitar animaciones css previas para poder reiniciarlas en cada pantalla
    imgEl.style.animation = 'none';
    storyDiv.style.animation = 'none';
    
    // Forzar un reflujo (reflow) en el navegador para reiniciar las transiciones
    imgEl.offsetHeight; 
    storyDiv.offsetHeight;

    // Manejar la visualización de la imagen geométrica
    if (node.image) {
        imgEl.src = node.image;
        imgEl.style.display = "block";
    } else {
        imgEl.style.display = "none";
    }

    // Actualizar el texto del relato
    storyDiv.innerText = node.text;
    choicesDiv.innerHTML = "";

    // Volver a activar la transición fluida de entrada (fade-in)
    imgEl.style.animation = 'fadeInScene 0.4s ease-in-out';
    storyDiv.style.animation = 'fadeInScene 0.4s ease-in-out';

    // Generar dinámicamente los botones de decisión
    node.choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice.text;
        button.classList.add("choice-btn");
        button.onclick = () => goToNode(choice.nextNode);
        choicesDiv.appendChild(button);
    });
}

// NUEVA FUNCIÓN: Se ejecuta al presionar el botón "JUGAR" de la pantalla de bienvenida
function iniciarJuegoCompleto() {
    // 1. Ocultar la pantalla de bienvenida
    document.getElementById("welcome").style.display = "none";
    
    // 2. Encender la música inmediatamente (el navegador lo permite porque el usuario hizo clic)
    const music = document.getElementById("bg-music");
    if (music) {
        music.volume = 0.4; // Ajusta el volumen ambiental (40%)
        music.play().catch(error => console.log("Error al reproducir audio:", error));
    }
    
    // 3. Cargar el primer nodo del juego
    goToNode("inicio");
}