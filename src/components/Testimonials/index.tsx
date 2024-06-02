import "./styles.css";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./styles.css";
import { Container, Typography } from "@mui/material";

import { Modal } from "../UI";
import { CONFIG, RESPONSIVE } from "../../config";
import { TestimonialInterface } from "../../store";
import { ButtonGroup, Image, SectionHeader } from "..";

export const Testimonials = ({
  testimonials,
}: {
  testimonials: TestimonialInterface[];
}) => {
  const [open, setOpen] = useState(false);

  const [modelContent, setContent] = useState({
    name: "",
    customerCollegeName: "",
    customerComment: "",
    customerImage: "",
  });

  const modelOpen = ({
    customerImage,
    name,
    customerCollegeName,
    customerComment,
  }: any) => {
    setContent({
      ...modelContent,
      customerImage,
      name,
      customerCollegeName,
      customerComment,
    });
    setOpen(true);
  };

  return (
    <section className="py-lg-16 py-10 bg-offer-carousel" id="testimonials">
      <SectionHeader title="Some of our Awesome Testimonials" />
      <Container maxWidth="xl">
        {testimonials && testimonials.length > 0 && (
          <Carousel 
            responsive={RESPONSIVE} 
            // infinite={true} 
            arrows={false}
            renderButtonGroupOutside={true}
            customButtonGroup={<ButtonGroup />}>
            {testimonials &&
              testimonials.map((testimonial: any) => (
                <div
                  key={testimonial.value}
                  className="p-4 bg-white shadow m-1 border-radius-new"
                  style={{ height: "24rem" }}
                >
                  <Image
                    src={`${CONFIG.testimonialComma}`}
                    className="pb-4 comms"
                  />
                  <p className="text-muted">
                    {`${testimonial?.customerComment.slice(0, 188)}${".".repeat(
                      6
                    )}`}
                    <span
                      className="text-primary pointer"
                      onClick={() => modelOpen(testimonial)}
                    >
                      show more
                    </span>
                  </p>
                  <hr />
                  <div
                    style={{ whiteSpace: "break-spaces", width:'95%' }}
                    className="d-flex align-items-center"
                    id="bottom"
                  >
                      <Image src={`${testimonial?.customerImage}`}  className="author-img"/>
                    <div style={{ paddingLeft: '1rem' }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 600 }}
                        style={{ textTransform: "capitalize" }}
                      >
                        {testimonial?.name}
                      </Typography>
                      <p
                        className="m-0 small font-medium text-muted overflowP"
                        style={{ wordWrap: "break-word" }}
                      >
                        {testimonial?.customerCollegeName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
        )}
      </Container>
      <Modal
        title={<div className="text-center">Testimonial</div>}
        open={open}
        toggleModal={() => setOpen(false)}
      >
        <>
          <div className="text-center py-4">
            <Image src={`${modelContent.customerImage}`} className="avatar avatar-md rounded-3" />
          </div>
          <div className="h5 text-center" style={{ fontWeight: "bolder" }}>
            {modelContent.name}
          </div>
          <div className="h5 text-center" style={{ fontWeight: "bolder" }}>
            {modelContent.customerCollegeName}
          </div>
          <Image src={`${CONFIG.testimonialComma}`} className="pb-4 comms" />
          <p style={{ textAlign: "justify" }}>{modelContent.customerComment}</p>
        </>
      </Modal>
    </section>
  );
};
