npx create-next-app whatsapp-2.0-clone
cd whatsapp-2.0-clone
npm install styled-components
npm install --save-dev babel-plugin-styled-components
Note: babel-plugin-styled-components fixes the sttling issues with styled-components

Create .babelrc in root folder:
{
"presets": ["next/babel"],
"plugins": ["babel-plugin-styled-components"]
}

delete .next folder from root and run:
npm run dev

npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install @mui/icons-material
