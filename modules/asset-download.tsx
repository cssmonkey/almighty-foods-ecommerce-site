import React, { FC } from 'react';

interface AssetDownloadProps {
  data: {
    title: string;
    submit: string;
    assetUrl: string;
  };
}

const AssetDownload: FC<AssetDownloadProps> = ({ data }) => {
  const { title, submit, assetUrl } = data;
  return (
    <div className="asset-download">
      <h3 className="asset-download__title">{title}</h3>
      <div className="asset-download__controls">
        <a
          download
          className="asset-download__btn btn is-primary"
          href={`${assetUrl}?dl=`}
        >
          {submit}
        </a>
      </div>
    </div>
  );
};

export default AssetDownload;
