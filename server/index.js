import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import { ServerStyleSheet } from 'styled-components';

import App from '../src/App';

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/', (req, res) => {
    const sheet = new ServerStyleSheet();
    let rootElement, styleTags;

    try {
        rootElement = ReactDOMServer.renderToString(
            sheet.collectStyles(<App />)
        );
        styleTags = sheet.getStyleTags();
    } catch (e) {
        console.log(e);
    } finally {
        sheet.seal();
    }

    // const app = ReactDOMServer.renderToString(<App />);

    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        const styledData = data.replace('</head>', `${styleTags}</head>`);

        return res.send(
            styledData.replace(
                '<div id="root"></div>',
                `<div id="root">${rootElement}</div>`
            )
        );
    });
});

app.use(express.static('./build'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
