import { DiscussionEmbed } from 'disqus-react';

const Reviews = ({ url, id, slug }) => {
  const disqusShortname = 'learnlit';

  const disqusConfig = {
    url: url,
    identifier: id,
    title: slug,
  };

  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default Reviews;
