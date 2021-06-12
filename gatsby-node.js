const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
    const { data } = await graphql(`
        query {
            allContentfulDoodle {
                nodes {
                    slug
                }
            }
        }
    `);

    data.allContentfulDoodle.nodes.forEach((node) => {
        actions.createPage({
            path: "/doodle/" + node.slug,
            component: path.resolve("./src/templates/doodles-template.js"),
            context: { slug: node.slug },
        });
    });
};
