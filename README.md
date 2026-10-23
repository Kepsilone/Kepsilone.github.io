# Sabeur Jedid — Portfolio Data Engineering

**Site en ligne : [kepsilone.github.io](https://kepsilone.github.io/)**

Portfolio personnel consacré au Data Engineering, à l'intelligence artificielle et à l'automatisation.

À travers Kepsilone, je partage mes projets, mes expérimentations et ma progression dans l'apprentissage de ces domaines.

Le site présente mes compétences, mon parcours et mes projets techniques. Chaque projet sera accompagné d'une documentation décrivant ses objectifs, les données utilisées, les technologies mises en œuvre et les résultats obtenus.

## Projets présentés

| Projet | Sujet | Stack | Statut |
|---|---|---|---|
| [Crypto Streaming Pipeline](https://kepsilone.github.io/projets/crypto-streaming-pipeline.html) | Pipeline de streaming temps réel sur les transactions BTCUSDT de Binance ([code](https://github.com/Kepsilone/crypto-streaming-pipeline)) | Python, Kafka, TimescaleDB, FastAPI, Grafana, Docker | V1 disponible |
| [Analyse des vols](https://kepsilone.github.io/projets/analyse-des-vols.html) | Flight Data Monitoring sur des enregistrements de vol réels publiés par la NASA | Python, PySpark, Parquet, DuckDB, Power BI | En préparation |
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
