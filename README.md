# Sabeur Jedid — Portfolio Data Engineering

**Site en ligne : [kepsilone.github.io](https://kepsilone.github.io/)**

Portfolio personnel consacré au Data Engineering, à l'intelligence artificielle et à l'automatisation.

À travers Kepsilone, je partage mes projets, mes expérimentations et ma progression dans l'apprentissage de ces domaines.

Le site présente mes compétences, mon parcours et mes projets techniques. Chaque projet sera accompagné d'une documentation décrivant ses objectifs, les données utilisées, les technologies mises en œuvre et les résultats obtenus.

## Projets

Les projets sont en cours de préparation et seront publiés au fur et à mesure, chacun avec son code et sa documentation.

## Apprentissage

La rubrique Apprentissage du site partage au fil des jours une notion apprise, un article lu ou une expérience.

## Comment le site est construit

- HTML, CSS et JavaScript, sans framework ni étape de build
- Hébergé gratuitement avec GitHub Pages
- Responsive (ordinateur et mobile), navigation au clavier, menu rapide `Ctrl + K`
- Référencement : données structurées schema.org, sitemap, balises Open Graph

```
├── index.html              Page d'accueil
├── assets/data/apprentissage.json   Billets de la rubrique Apprentissage
├── assets/
│   ├── css/style.css       Styles du site
│   ├── css/article.css     Styles des pages article
│   ├── js/main.js          Animations, menu rapide, retour en haut
│   └── img/                Logo, photo, favicon
├── sitemap.xml
└── robots.txt
```

## Lancer en local

```bash
python -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## Contact

[LinkedIn](https://www.linkedin.com/in/jedid-sabeur) · [Portfolio](https://kepsilone.github.io/)
