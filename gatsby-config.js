module.exports = {
    siteMetadata: {
        title: "doodly",
    },
    plugins: [
        {
            resolve: "gatsby-source-contentful",
            options: {
                accessToken: "vrsByWI23wo8tBOESv5YGdpEuDRpLZLMO60dLch9CN8",
                spaceId: "e07ev7fdcztb",
            },
        },
        "gatsby-plugin-emotion",
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png",
            },
        },
        `gatsby-plugin-image`,
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
    ],
};
