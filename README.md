# Riftpedia

![License](https://img.shields.io/github/license/forthtilliath/riftpedia?style=for-the-badge) [![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/) ![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white&style=for-the-badge) [![next-intl](https://img.shields.io/badge/next--intl-0070F3?style=for-the-badge)](https://next-intl.dev/) ![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

Encyclopédie des champions et objets de **League of Legends**, propulsée par l'API publique [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon) de Riot Games. Aucune donnée n'est stockée en local : champions, objets et images sont toujours ceux du patch actuellement en ligne.

## Fonctionnalités

- **Champions** : liste filtrable par rôle (Combattant, Tank, Mage, Assassin, Tireur, Support), fiche détaillée avec stats, splash art et sélecteur de skins.
- **Objets** : liste filtrable par carte (Faille de l'invocateur / Abîme hurlant) avec recherche, regroupée par palier (départ, basique, épique, légendaire, mythique). Fiche détaillée avec arbre de fusion (composants et évolutions).
- **Multilingue** (FR/EN) via [next-intl](https://next-intl.dev/), routing localisé (`/fr/...`, `/en/...`).
- **Toujours à jour** : la version du jeu est résolue dynamiquement (mise en cache 1h) et les images sont chargées directement depuis les CDN de Riot ([Data Dragon](https://ddragon.leagueoflegends.com)) et [CommunityDragon](https://communitydragon.org/) — aucun asset à retélécharger à chaque nouveau patch.

## Stack technique

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/) / TypeScript
- [next-intl](https://next-intl.dev/) pour l'internationalisation
- [Sass](https://sass-lang.com/) (modules CSS)
- [axios](https://axios-http.com/) + [axios-cache-interceptor](https://axios-cache-interceptor.js.org/) pour l'appel et le cache des données Data Dragon

## Démarrer le projet

```bash
bun install
bun run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) — redirige automatiquement vers `/fr/champions/all`.

## Scripts

```bash
bun run dev            # next dev (Turbopack)
bun run build           # build de production
bun run start            # sert le build de production
bun run lint              # eslint
bun run check-types        # tsc --noEmit
```

## Structure

```
src/
├── app/[locale]/       # routes App Router (champions, champion/[name], items, item/[id])
├── features/           # composants (navbar, listes, fiches détail...)
├── i18n/               # config next-intl (routing, navigation, request)
├── locales/            # fichiers de traduction FR/EN
├── middleware / proxy   → src/proxy.ts (résolution de la locale)
└── utils/
    ├── api/apiRiot.ts  # appels Data Dragon (champions, objets, version courante)
    └── constantes.ts   # construction des URLs d'images CDN
```
