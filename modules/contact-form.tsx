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

const formSubmitId = process.env.FORMSUBMIT_ID;

interface ContactFormProps {
  type: 'contactEnquiry' | 'wholesaleContactEnquiry';
}

const CustomerForm: FC<ContactFormProps> = ({ type }) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter your full name'),
    email: Yup.string().email().required('Please enter your email address'),
    message: Yup.string().required('Please enter your message'),
  } as const);

  const initialValues = {
    name: '',
    email: '',
    message: '',
  } as const;

  const onSubmit = (values) => {
    const request = {
      ...values,
      _type: type,
    };

    fetch(`https://formsubmit.co/ajax/${formSubmitId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        subject: 'Customer enquiry from website',
        name: request.name,
        email: request.email,
        message: request.message,
      }),
    })
      .then(() => {
        setSubmitting(false);
        setSuccess(true);
      })
      .catch(() => {
        setSubmitting(false);
        setError(true);
      });

    sanity.create(request);
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

const WholesalerForm: FC<ContactFormProps> = ({ type }) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter your full name'),
    company: Yup.string().required('Please enter the name of your company'),
    email: Yup.string().email().required('Please enter your email address'),
    website: Yup.string().required('Please enter your website url'),
    message: Yup.string().required('Please enter your message'),
  } as const);

  const initialValues = {
    name: '',
    company: '',
    email: '',
    website: '',
    message: '',
  } as const;

  const onSubmit = (values) => {
    const request = {
      ...values,
      _type: type,
    };

    fetch(`https://formsubmit.co/ajax/${formSubmitId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        subject: 'Wholesale enquiry from website',
        name: request.name,
        company: request.company,
        email: request.email,
        message: request.message,
        website: request.website,
      }),
    })
      .then(() => {
        setSubmitting(false);
        setSuccess(true);
      })
      .catch(() => {
        setSubmitting(false);
        setError(true);
      });

    sanity.create(request);
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
                <label className="page-form__label" htmlFor="company">
                  Company
                </label>
                <div className="page-form__control">
                  <Field
                    name="company"
                    type="text"
                    className="input"
                    placeholder="Company"
                  />
                  <ErrorMessage name="company" render={renderError} />
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
                <label className="page-form__label" htmlFor="website">
                  Website
                </label>
                <div className="page-form__control">
                  <Field
                    name="website"
                    type="text"
                    className="input"
                    placeholder="Website url"
                  />
                  <ErrorMessage name="website" render={renderError} />
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

const ContactForm: FC<ContactFormProps> = ({ type }) => {
  if (type === 'contactEnquiry') {
    return <CustomerForm type={type} />;
  }
  return <WholesalerForm type={type} />;
};

export default ContactForm;
