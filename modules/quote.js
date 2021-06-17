import React from 'react'

const Quote = ({ data = {} }) => {
  // Extract our module data
  const { text } = data

  return (
    <div className="quote">
      <div className="quote__inner">
        <blockquote>
          <p>{text}</p>
        </blockquote>
      </div>
    </div>
  )
}

export default Quote
