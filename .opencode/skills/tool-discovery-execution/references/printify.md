# Recipe: create and manage Printify products

Printify has fixed native operations rather than a dynamic catalog. Run `describe` before the first call so you have the current schema, then `execute` the exact tool:

- `native:printify-list-blueprints` — search products, inspect one blueprint's print providers, then inspect one provider's variant ids, prices, and print areas.
- `native:printify-upload-artwork` — upload a public image URL or base64 image and retain the returned artwork id. Prefer `url`; base64 params must be written to a file and passed as `@/path/to/params.json` (see *Describe, then execute* in SKILL.md) — inline they exceed the shell's argument limit.
- `native:printify-create-product` — create a product using blueprint/provider/variant data and artwork ids returned by the upload tool.
- `native:printify-list-products` — list only products created for the current team through this gateway.
- `native:printify-publish-product`, `native:printify-update-product`, and `native:printify-order-product` — act only on products owned by the current team.

The safe creation order is **list blueprints → upload artwork → create product**. Never substitute an image id from another source: create and update reject artwork not uploaded for this team. Publishing, updating, and ordering reject product ids not created for this team. Ordering is a real paid side effect; use a stable caller-generated `external_id`, reuse it after an uncertain retry, and never repeat a successful order to verify it.
