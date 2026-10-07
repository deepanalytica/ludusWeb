# Arquitectura de despliegue — JUEGA M²

## Recomendación

GitHub es la fuente de verdad. GitHub Actions puede publicar una versión de revisión en GitHub Pages y Cloudflare Pages debe servir la producción con dominio propio.

GitHub Pages no tiene que quedar “delante” de Cloudflare. Ambos despliegan desde el mismo repositorio:

```text
GitHub repository
      │
      ├── GitHub Actions ──> GitHub Pages (staging / revisión)
      │
      └── Cloudflare Pages ──> dominio de producción
                                │
                                ├── Pages Functions / Worker
                                ├── R2 temporal para fotos
                                └── proveedor de generación visual
```

## Fase 1 — landing estática

- HTML/CSS/JS sin framework.
- Upload local en navegador para probar UX.
- Packs, estimador y renders de referencia.
- No se envían imágenes a ningún servidor.

## Fase 2 — motor de visualización

`POST /api/visualize` con multipart form-data:
- `image`: JPG / PNG / WEBP;
- `pack`: `mini | active | adventure | custom`;
- `ageRange`;
- `spaceRange`;
- `addons[]`.

Respuesta inicial:
```json
{"jobId":"...","status":"processing","previewUrl":null}
```

El frontend consulta `GET /api/visualize/:jobId` hasta obtener el render.

### Seguridad mínima

- nunca poner claves de IA en JavaScript;
- validar MIME real, peso y resolución;
- rate limiting / Turnstile;
- eliminar metadatos EXIF cuando corresponda;
- consentimiento explícito para procesar fotografías del hogar;
- retención corta y R2 privado con URLs temporales;
- no entrenar con fotos del cliente salvo consentimiento separado;
- logs sin almacenar la imagen completa.

## Fase 3 — lead + cotización

Al aprobar una configuración: nombre, contacto, comuna, medidas, pack, complementos, render y consentimiento.

## Cloudflare Pages

- Framework preset: None / Static HTML.
- Build command: vacío.
- Output directory: `/`.
- Production branch: `main`.
- Secretos solo en Functions/Workers.
