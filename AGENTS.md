# Technical Decisions
- Keep the ebook catalogue static and bundled with asset-pointer URLs so reading and downloads require no account or database.
- Render PDF pages with PDF.js in an accessible dialog because embedded browser PDF viewing can appear blank in the preview and on phones.
- Keep privacy choices device-local and gate reading bookmarks on valid optional consent; no third-party consent service is needed for the static catalogue.
