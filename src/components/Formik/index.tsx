import React from 'react';
import { Form, Formik } from 'formik';

export const CustomFormik = (props: any) =>{
    return (
        <Formik
          initialValues={props?.initialValues}
          validationSchema={props?.validationSchema}
          onSubmit={props?.onSubmit}
          enableReinitialize={props?.enableReinitialize}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {props.children}
            </Form>
          )}
        </Formik>
    )
}
