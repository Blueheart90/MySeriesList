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
                sans: ["Open sans", ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                "hero-welcome": "url('../storage/img/man-watching-his-tv.jpg')",
                "family-tv":
                    "linear-gradient(59deg, rgba(18,6,46,0.7987570028011204) 30%, rgba(255,255,255,0.4009978991596639) 50%, rgba(32,35,79,0.7987570028011204) 70%), url('../storage/img/family-watching-his-tv.jpg')",
            },
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
