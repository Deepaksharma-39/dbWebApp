import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = ({titleTemplate,description}) => {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {"Teracure"} | {titleTemplate}
                </title>
                <meta name="description" content={description} />
            </Helmet>
        </HelmetProvider>
    );
};


export default SEO;