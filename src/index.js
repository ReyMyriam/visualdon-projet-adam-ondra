//import * as d3 from "d3";
import { makeAreaGraph } from "./js/data-area.js";
import { createBars } from "./js/data-bars.js";
import { createRadar } from "./js/data-radar.js";
import { createPie } from "./js/data-pie.js";
import * as d3 from "d3";

// Sélectionne tous les boutons avec la classe "bouton"
var boutons = document.querySelectorAll(".bouton");
// Récupération de la div qui affiche l'info-bulle
const infoBulle = document.querySelector(".info-bulle");

// Pour chaque bouton, ajoute un événement de clic pour ouvrir la fenêtre correspondante
boutons.forEach(function (bouton) {
  //Faire changer de taille le bouton au survol de la souris
  bouton.addEventListener("mouseover", function (e) {
    this.setAttribute("stroke-width", "30"); // Modifie le rayon du cercle à 15

    // Affichage de l'info-bulle avec le texte approprié
    const infoText = this.getAttribute("title");
    infoBulle.textContent = infoText;
    console.log((e.pageX));
    infoBulle.style.display = "block";
    d3.select(".info-bulle")
      .style("top", e.pageY + "px")
      .style("left", e.pageX + "px");
  });

  bouton.addEventListener("mouseout", function () {
    this.setAttribute("stroke-width", "8"); // Reviens au rayon initial de 10

    // Cachage de l'info-bulle
    infoBulle.style.display = "none";
  });

  bouton.addEventListener("click", function () {
    // Récupère l'ID de la fenêtre correspondante à ce bouton
    var fenetreId = this.getAttribute("data-fenetre");

    // Affiche la fenêtre correspondante
    var fenetre = document.getElementById(fenetreId);
    fenetre.classList.add("active");

    // Ajoute un écouteur d'événement pour le bouton "fermer" de cette fenêtre
    var croix = fenetre.querySelector(".croix");
    croix.addEventListener("click", function () {
      // Ferme la fenêtre correspondante
      fenetre.classList.remove("active");
    });
  });
});

//Afficher le grphique d'aires dans la fenêtre
makeAreaGraph();

//Afficher le graphique à bâtons dans la fenêtre
createBars();

//Afficher le graphique radar dans la fenêtre
createRadar();

//Afficher le graphique pie
const gold = { difficulté: 25, bloc: 5 };
const goldColors = ["#FFE654", "#FFC800"];
createPie(gold, goldColors);
const silver = { difficulté: 7, bloc: 7 };
const silverColors = ["#D9D9D9", "#B8B8B8"];
createPie(silver, silverColors);
const bronze = { difficulté: 3, bloc: 2 };
const bronzeColors = ["#B85D0D", "#874D2E"];
createPie(bronze, bronzeColors);
