# Sabeur Jedid — Portfolio Data Engineering

**Site en ligne : [kepsilone.github.io](https://kepsilone.github.io/)**

Portfolio de Sabeur Jedid, ingénieur en reconversion vers le Data Engineering après huit ans en ingénierie des procédés (modélisation, simulation numérique, analyse de données techniques).

Le site présente mon parcours, mes compétences et mes projets de pipelines de données, chacun avec une page article qui détaille l'objectif, les données, les étapes et les choix techniques.

## Projets présentés

| Projet | Sujet | Stack | Statut |
|---|---|---|---|
| [RNE Data Platform](https://kepsilone.github.io/projets/rne-data-platform.html) | Pipeline sur les données ouvertes du Registre national des entreprises (INPI), établissements de l'Essonne | Python, DuckDB, dbt, Streamlit | En préparation |
| [Suivi de données de fabrication](https://kepsilone.github.io/projets/suivi-donnees-fabrication.html) | Contrôle et analyse de mesures de production | Python, SQL, Power BI | À venir |

## Comment le site est construit

- HTML, CSS et JavaScript, sans framework ni étape de build
- Hébergé gratuitement avec GitHub Pages
- Responsive (ordinateur et mobile), navigation au clavier, menu rapide `Ctrl + K`
- Référencement : données structurées schema.org, sitemap, balises Open Graph

```
├── index.html              Page d'accueil
├── projets/                Une page article par projet
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
