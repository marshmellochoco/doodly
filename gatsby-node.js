const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
    const { data } = await graphql(`
        query {
            allStripePrice {
                distinct(field: product___id)
            }
        }
    `);

    data.allStripePrice.distinct.forEach((id) => {
        actions.createPage({
            path: "/doodle/" + id,
            component: path.resolve("./src/templates/doodles-template.js"),
            context: { id: id },
        });
    });
};
