require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
    pathPrefix: `/doodly`,
    siteMetadata: {
        title: "doodly",
        description: "Get some doodles here!",
        url: "https://marshmellochoco.github.io/doodly",
        image: "/src/images/icon.png",
        twitterUsername: "@marshchoco01",
    },
    plugins: [
        "gatsby-plugin-emotion",
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png",
                name: "doodly",
                start_url: "/",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: `gatsby-source-stripe`,
            options: {
                objects: ["Price"],
                secretKey: process.env.STRIPE_SECRET_KEY,
                downloadFiles: false,
            },
        },
        `gatsby-plugin-offline`,
    ],
};
