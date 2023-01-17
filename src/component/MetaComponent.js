import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
const MetaComponent = ({ title, desciption }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desciption} />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaComponent;
