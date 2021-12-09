import React, { useRef, useState } from 'react';
import cx from 'classnames';
import BlockContent from '@sanity/block-content-to-react';
import { serializers } from '@lib/serializers';
import { useIntersection } from 'use-intersection';

import VideoLoop from '@components/video-loop';
import Photo from '@components/photo';

const buildThresholdList = () => {
  let thresholds = [];
  let numSteps = 20;

  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
};

const Hero = ({ data = {} }) => {
  const { content, bgType, photos, video, footerContent } = data;
  const heroRef = useRef();
  const [animate, setAnimate] = useState('');

  const intersecting = useIntersection(
    heroRef,
    {
      rootMargin: '0px',
      threshold: buildThresholdList(),
    },
    ({ isIntersecting, intersectionRatio }) => {
      console.log(intersectionRatio);
      if (isIntersecting && intersectionRatio > 0.2) {
        setAnimate('fade-in');
      } else if (intersectionRatio < 0.2) {
        setAnimate('fade-out');
      }
    }
  );

  return (
    <section
      ref={heroRef}
      intersecting={intersecting}
      className={cx('hero', {
        'hero--fade-in': animate === 'fade-in',
        'hero--fade-out': animate === 'fade-out',
      })}
    >
      {content && (
        <div className="hero--overlay">
          <div className="hero--content">
            <BlockContent
              renderContainerOnSingleChild
              className="rc"
              blocks={content}
              serializers={serializers}
            />
          </div>
          {footerContent && (
            <div className="hero--footer-content">
              <div>
                {footerContent.footerImage.image && (
                  <img
                    width="98px"
                    src={footerContent.footerImage.image}
                    className="hero--footer-image"
                    alt={footerContent.footerImage.alt || ''}
                  />
                )}
              </div>
              <div>
                {footerContent.footerSecondImage.image && (
                  <img
                    src={footerContent.footerSecondImage.image}
                    className="hero--footer-image"
                    alt={footerContent.footerSecondImage.alt || ''}
                  />
                )}
              </div>

              {footerContent.footerText && (
                <p className="hero--footer-text">{footerContent.footerText}</p>
              )}
            </div>
          )}
        </div>
      )}

      {bgType === 'video' && (
        <>
          <div className="hero--bg is-desktop">
            <VideoLoop title={video.title} id={video.id} />
          </div>
          <div className="hero--bg is-mobile">
            <VideoLoop title={video.title} id={video.id} />
          </div>
        </>
      )}

      {bgType === 'photo' && (
        <>
          {photos?.desktopPhoto && (
            <Photo
              photo={photos.desktopPhoto}
              width={1600}
              srcSizes={[800, 1000, 1200, 1600]}
              sizes="100vw"
              layout="fill"
              className="hero--bg is-desktop"
            />
          )}
          {photos?.mobilePhoto && (
            <Photo
              photo={photos.mobilePhoto}
              width={800}
              sizes="100vw"
              layout="fill"
              className="hero--bg is-mobile"
            />
          )}
        </>
      )}
    </section>
  );
};

export default Hero;
