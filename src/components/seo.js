import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ title, description, image, article }) => {
    const { site } = useStaticQuery(query);
    const {
        defaultTitle,
        defaultDescription,
        url,
        defaultImage,
        twitterUsername,
    } = site.siteMetadata;

    return (
        <Helmet title={defaultTitle}>
            <meta name="defaultDescription" content={defaultDescription} />
            <meta name="defaultImage" content={defaultImage} />

            {url && <meta property="og:url" content={url} />}

            {(article ? true : null) && (
                <meta property="og:type" content="article" />
            )}

            {defaultTitle && (
                <meta property="og:defaultTitle" content={defaultTitle} />
            )}

            {defaultDescription && (
                <meta
                    property="og:defaultDescription"
                    content={defaultDescription}
                />
            )}

            {defaultImage && (
                <meta property="og:image" content={defaultImage} />
            )}

            <meta name="twitter:card" content="summary_large_image" />

            {twitterUsername && (
                <meta name="twitter:creator" content={twitterUsername} />
            )}

            {defaultTitle && (
                <meta name="twitter:defaultTitle" content={defaultTitle} />
            )}

            {defaultDescription && (
                <meta
                    name="twitter:defaultDescription"
                    content={defaultDescription}
                />
            )}

            {defaultImage && (
                <meta name="twitter:image" content={defaultImage} />
            )}
        </Helmet>
    );
};

export default Seo;

Seo.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    article: PropTypes.bool,
};

Seo.defaultProps = {
    title: null,
    description: null,
    image: null,
    article: false,
};

const query = graphql`
    query SEO {
        site {
            siteMetadata {
                defaultTitle: title
                defaultDescription: description
                url
                defaultImage: image
            }
        }
    }
`;
