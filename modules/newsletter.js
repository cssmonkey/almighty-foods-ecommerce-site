import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { m, AnimatePresence } from 'framer-motion';
import cx from 'classnames';

import BlockContent from '@sanity/block-content-to-react';
import { serializers } from '@lib/serializers';

import { fadeAnim } from '@lib/animate';

const Newsletter = ({ data = {} }) => {
  // Extract our module data
  const { title, subTitle, submit, successMsg, errorMsg } = data;

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { handleSubmit, register, watch, reset, errors } = useForm();

  // Call to reset the form
  const resetForm = (e) => {
    e.preventDefault();
    reset();
    setError(false);
    setSuccess(false);
    setSubmitting(false);
  };

  // handle form submission
  const onSubmit = (data, e) => {
    e.preventDefault();

    setSubmitting(true);
    setError(false);

    fetch('/api/mailchimp/newsletter-join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setSubmitting(false);
        setSuccess(true);
      })
      .catch((error) => {
        setSubmitting(false);
        setError(true);
      });
  };

  return (
    <form className="form newsletter-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="newsletter-form__inner">
        <h3 className="newsletter-form__title">{title}</h3>
        {subTitle && <h4 className="newsletter-form__subtitle">{subTitle}</h4>}
        <AnimatePresence exitBeforeEnter>
          {!error && !success && (
            <m.div
              initial="hide"
              animate="show"
              exit="hide"
              variants={fadeAnim}
              className="form--fields"
            >
              <input
                type="text"
                name="fullname"
                autoComplete="off"
                className="control--pot"
                aria-hidden="true"
                ref={register}
              />
              <div className="control--group is-inline">
                <div className={`control${errors.email ? ' has-error' : ''}`}>
                  <label htmlFor="newsletter-email" className="control--label">
                    Email Address
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    ref={register({
                      required: 'This field is required.',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'invalid email address',
                      },
                    })}
                    onFocus={(e) => {
                      e.target.parentNode.classList.add('is-filled');
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      e.target.parentNode.classList.toggle('is-filled', value);
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      e.target.parentNode.classList.toggle('is-filled', value);
                    }}
                  />

                  {errors.email && (
                    <span role="alert" className="control--error">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={cx('btn is-primary', {
                    'is-loading': submitting,
                  })}
                  disabled={submitting}
                >
                  {submit ? submit : 'Send'}
                </button>
              </div>
            </m.div>
          )}

          {success && (
            <m.div
              key="success"
              initial="hide"
              animate="show"
              exit="hide"
              variants={fadeAnim}
              className="form--success"
            >
              <div className="form--success-content">
                {successMsg ? (
                  <BlockContent
                    renderContainerOnSingleChild
                    className="rc"
                    blocks={successMsg}
                    serializers={serializers}
                  />
                ) : (
                  <h2>Success!</h2>
                )}
              </div>
            </m.div>
          )}

          {error && (
            <m.div
              key="error"
              initial="hide"
              animate="show"
              exit="hide"
              variants={fadeAnim}
              className="form--error"
            >
              <div className="form--error-content">
                {errorMsg ? (
                  <BlockContent
                    renderContainerOnSingleChild
                    className="rc"
                    blocks={errorMsg}
                    serializers={serializers}
                  />
                ) : (
                  <h2>Error!</h2>
                )}
                <p className="form--error-reset">
                  <button className="btn" onClick={(e) => resetForm(e)}>
                    try again
                  </button>
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default Newsletter;
