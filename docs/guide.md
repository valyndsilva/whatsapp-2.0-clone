## Create next app with tailwincss

```
npx create-next-app -e with-tailwindcss my-project
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

### If you're on Next.js v10 or newer

```
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

## If you're on Next.js v9 or older

```
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

## Create your configuration files

Next, generate your tailwind.config.js and postcss.config.js files:

```
npx tailwindcss init -p
```


.babelrc

{
  "presets": ["next/babel"],
  "plugins": ["babel-plugin-styled-components"]
}
