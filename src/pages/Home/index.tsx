import React, { useEffect } from "react";

import {
  Header,
  Footer,
  Carousel,
  LoanOffers,
  ApplicationProcess,
  WhyChooseUs,
  Testimonials,
  ContactUs,
  ScrollToTopButton,
  AboutUs,
  FloatingWhatsapp,
  BlogCarousel,
  Auth,
} from "../../components";

import { usePreLoginState } from "../../hooks";
import { CONFIG } from "../../config";
import { createSignal, isFeatureActive } from "../../utils";
import {
  getAbout,
  getBannerImages,
  getBlogList,
  getServices,
  getTestimonials,
} from "../../services";
import { Helmet } from "react-helmet-async";
import { INITIAL_SEARCH_VALUES } from "../../config/Constants";

export const Home = (): React.ReactElement => {
  const { blogFeatureId } = CONFIG;

  const {
    state: { feature, blogs, carouselData, about, services, testimonials },
    dispatch,
  } = usePreLoginState();

  useEffect(() => {
    window.scrollTo(0, 0);

    const { controller, signal } = createSignal();
    const apiArray = [
      getBannerImages(signal),
      getAbout(signal),
      getServices(signal),
      getTestimonials(signal),
    ];

    if (isFeatureActive(feature, blogFeatureId)) {
      apiArray.push(getBlogList(INITIAL_SEARCH_VALUES, signal));
    }

    Promise.all(apiArray).then((data: any) => {
      if (!data?.[0]?.data?.abort) dispatch("INIT_VALUES", data);
    });

    return () => controller.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content="Loans, Personal loans, Business loans, Education loans, Student loans, Installment loans, Quick loans, Unsecured loans, Loan application, Loan approval, Quickk educationloan, online abroad loan, quickkabroad loan"
        />
        <meta
          property="og:title"
          content="Quickk Loans | Hassle Free Loan Service"
        />
      </Helmet>
      <Header />
      <Carousel carouselData={carouselData} />
      <WhyChooseUs />
      <LoanOffers services={services} />
      <Testimonials testimonials={testimonials} />
      {isFeatureActive(feature, blogFeatureId) && (
        <BlogCarousel blogData={blogs} />
        )}
      <ApplicationProcess />
      <AboutUs about={about} />
      <ContactUs />
      <FloatingWhatsapp />
      <ScrollToTopButton />
      <Footer />
      <Auth />
    </>
  );
};
