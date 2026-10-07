# JUEGA M²

Landing y configurador inicial de **JUEGA M²**, un servicio para transformar patios, terrazas, muros y rincones pequeños en espacios activos infantiles.

## Marca
Ver [`brand/BRAND.md`](brand/BRAND.md).

## Desarrollo local
Sitio estático: puedes abrir `index.html` o servirlo con:

```bash
python3 -m http.server 8080
```

## GitHub Pages
El workflow `.github/workflows/deploy-pages.yml` publica el sitio cuando hay cambios en `main`.

El repositorio debe tener GitHub Pages configurado una vez con **Source: GitHub Actions** desde Settings → Pages.

## Cloudflare
La arquitectura de producción y la siguiente etapa de carga/generación de imágenes están en [`cloudflare/ARCHITECTURE.md`](cloudflare/ARCHITECTURE.md).

## Estado v1
- landing responsive;
- catálogo tipo marketplace;
- estimador referencial;
- upload local de fotografía;
- selector de pack y complementos;
- referencias visuales;
- accesibilidad básica;
- workflow de GitHub Pages;
- arquitectura preparada para Cloudflare.

La versión actual **no envía fotografías a un servidor** ni genera todavía una transformación IA sobre la foto subida. Esa capacidad debe ir detrás de Cloudflare Pages Functions/Workers para proteger credenciales y tratar las fotografías de forma controlada.
