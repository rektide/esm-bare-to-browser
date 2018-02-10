# Esm Bare To Browser

> Bake what-have-you to browser-compatible ESM for your site

Up to three things are required to take a module from the wild and use it on your website:

1. Where applicable, convert CJS modules to esm import syntax
2. For each import statement, pre-run Node.js's module resolution algorithm (in module mode)
3. For each import statement, convert the local filepath into a served up filepath

At the end of this, you should have "basically" your existing dependency tree, but converted to ESM, and ready to serve at the pre-specified path location.

# Why

Browser "modules" require you to hardcode specific urls, since they do not support "bare" specifiers unlike the rest of the JS ecosystem.

Alas this means manually baking your site specific paths into the "modules". This tool accomplishes that, performing the essential localization of modules to your particular site.
