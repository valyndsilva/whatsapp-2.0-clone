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

```
npx create-next-app whatsapp-2.0-clone
cd whatsapp-2.0-clone
npm install styled-components
npm install --save-dev babel-plugin-styled-components
```

Note: babel-plugin-styled-components fixes the sttling issues with styled-components

Create .babelrc in root folder:

```
{
"presets": ["next/babel"],
"plugins": ["babel-plugin-styled-components"]
}
```

delete .next folder from root and run:

```
npm run dev

npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install @mui/icons-material
npm install moment
npm install firebase
npm install react-loading
npm install fuse.js
```
