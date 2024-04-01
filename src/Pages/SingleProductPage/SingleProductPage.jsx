import SingleProductPageDesktop from "./SingleProductPageDesktop/SingleProductPageDesktop";
import SingleProductPageMobile from "./SingleProductPageMobile/SingleProductPageMobile";

import React from 'react'

const SingleProductPage = () => {
  return (
    <>
        <SingleProductPageDesktop/>
        <SingleProductPageMobile/>
    </>
  );
};

export default SingleProductPage