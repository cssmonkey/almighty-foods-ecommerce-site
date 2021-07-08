import React, { FC, useState } from 'react';
import sanityClient from '@sanity/client';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import cx from 'classnames';

const sanity = sanityClient({
  dataset: process.env.SANITY_PROJECT_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

interface ContactFormProps {
  type: 'contactEnquiry' | 'wholesaleContactEnquiry';
}

const ContactForm: FC<ContactFormProps> = ({ type }) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter your full name'),
    email: Yup.string().email().required('Please enter your email address'),
    subject: Yup.string().required('Please enter a subject line'),
    message: Yup.string().required('Please enter your message'),
  } as const);

  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
  } as const;

  const onSubmit = (values) => {
    const request = { ...values, _type: type };

    sanity
      .create(request)
      .then(() => {
        setSubmitting(false);
        setSuccess(true);
      })
      .catch(() => {
        setSubmitting(false);
        setError(true);
      });
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
          {error && (
            <div className="error-summary">
              <p className="error-message">
                Something went wrong, please try again
              </p>
            </div>
          )}
          {success ? (
            <div className="form-submit-message">
              <h3>Message sent</h3>
              <p>Your message has been sent, thank you for getting in touch</p>
            </div>
          ) : (
            <>
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
                <button
                  disabled={submitting}
                  className={cx('btn is-primary', {
                    'is-loading': submitting,
                  })}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </Form>
    </Formik>
  );
};

export default ContactForm;
