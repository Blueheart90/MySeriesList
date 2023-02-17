const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            colors: {
                ghostWhite: "#e8e9f3",
                silver: "#cecece",
                frenchGray: "#a6a6a8",
                raisinBlack: "#272635",
                kiwi: "#7ddb29",
                primary: "#12062e",
                secundary: "#20234f",
                light: "#f2f4fa",
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                "hero-welcome": "url('../storage/img/man-watching-his-tv.jpg')",
            },
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
