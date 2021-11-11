import React, { FC } from 'react';
import cx from 'classnames';

import BlockContent from '@sanity/block-content-to-react';
import { serializers } from '@lib/serializers';
import Photo, { PhotoImage } from '@components/photo';

interface TeamMember {
  name: string;
  content?: object;
  image?: PhotoImage;
}

interface OurTeamProps {
  className?: string;
  title?: string;
  teamMembers: TeamMember[];
}

const OurTeam: FC<OurTeamProps> = ({ title, className, teamMembers }) => {
  return (
    <div className={cx('our-team', className)}>
      {title && <h3 className="our-team__title">{title}</h3>}
      <div className="our-team__grid">
        {teamMembers.map(({ name, content, image }, i) => {
          return (
            <div className="our-team__row" key={i}>
              <div className="our-team__content">
                <h4 className="our-team__content-title">{name}</h4>

                {content && (
                  <BlockContent
                    renderContainerOnSingleChild
                    className="rc"
                    blocks={content}
                    serializers={serializers}
                  />
                )}
              </div>

              {image && (
                <div className="our-team__image-container">
                  <Photo
                    photo={image}
                    width={320}
                    sizes="320px"
                    className="our-team__image"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurTeam;
