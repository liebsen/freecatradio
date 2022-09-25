import tryToCatch from 'try-to-catch';
const options = {
    html: {
        removeAttributeQuotes: false,
        removeOptionalTags: false,
    },
};

const [error, data] = await tryToCatch(minify, './src/assets/js/snackbar.js', options);

if (error)
    return console.error(error.message);

console.log(data);