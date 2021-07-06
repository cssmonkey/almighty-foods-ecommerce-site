import React, { FC } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface ContactFormProps {}

const ContactForm: FC<ContactFormProps> = ({}) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter your full name'),
    email: Yup.string().email().required(),
    subject: Yup.string().required(),
    message: Yup.string().required(),
  } as const);

  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
  } as const;

  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  const renderError = (message: string): JSX.Element => (
    <p className="error-message">{message}</p>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
      }}
    >
      <Form>
        <div className="page-form">
          <div className="page-form__field">
            <label className="page-form__label" htmlFor="name">
              Full name
            </label>
            <div className="page-form__control">
              <Field
                name="name"
                type="text"
                className="input"
                placeholder="Full name"
              />
              <ErrorMessage name="name" render={renderError} />
            </div>
          </div>
          <div className="page-form__field">
            <label className="page-form__label" htmlFor="email">
              Email address
            </label>
            <div className="page-form__control">
              <Field
                name="email"
                type="text"
                className="input"
                placeholder="Email address"
              />
              <ErrorMessage name="email" render={renderError} />
            </div>
          </div>

          <div className="page-form__field">
            <label className="page-form__label" htmlFor="subject">
              Subject
            </label>
            <div className="page-form__control">
              <Field
                name="subject"
                type="text"
                className="input"
                placeholder="Subject"
              />
              <ErrorMessage name="subject" render={renderError} />
            </div>
          </div>
          <div className="page-form__field">
            <label className="page-form__label" htmlFor="message">
              Message
            </label>
            <div className="page-form__control">
              <Field
                name="message"
                as="textarea"
                className="textarea"
                placeholder="Message"
              />
              <ErrorMessage name="message" render={renderError} />
            </div>
          </div>
          <div className="page-form__controls">
            <button className="form-submit-button is-primary">Submit</button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default ContactForm;
