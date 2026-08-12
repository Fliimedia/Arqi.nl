# Arqi.nl

Statische website voor Arqi, business en IT bureau in Amstelveen. Onderdeel van Flii Media.

## Structuur

```
index.html              homepage, single file met inline CSS en JS
kennisbank/index.html   overzicht van 114 begrippen in 7 categorieen
kennisbank/<term>.html  detailpagina per begrip: definitie, uitleg, praktijkvoorbeeld
404.html                foutpagina
sitemap.xml             116 urls
robots.txt              indexering toegestaan, verwijst naar sitemap
manifest.json           PWA manifest
vercel.json             cleanUrls staat aan, zodat /kennisbank/kubernetes werkt zonder .html
CNAME                   custom domain voor GitHub Pages
```

## Deploy

Vercel pakt de repo direct op als static site. `cleanUrls` in `vercel.json` is nodig:
de links in de kennisbank verwijzen naar `kubernetes` en niet naar `kubernetes.html`.

Op GitHub Pages werken die extensieloze links niet zonder aanpassing. Zet in dat geval
`cleanUrls` om naar mappen per term, of pas de links aan.

## Conventies

- Single file per pagina, CSS en JS inline
- Geen em dashes of en dashes in code of content
- Kleurtoken: `--c-red` is het accent, nu chromium `#5C6E7A`
- Beeldmateriaal staat nog op `fliimedia.github.io/Flii.nl/assets`

## Openstaand

- Klantlogo's in de ticker, teamleden, casebeelden en de Google reviewbanner zijn placeholders
- Telefoonnummer en adres zijn die van Flii Media
- Detailpagina's per dienst (`diensten/<slug>`) bestaan nog niet
