import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KatexProps {
  math: string;
  options?: katex.KatexOptions;
}

const Katex: React.FC<KatexProps> = ({ math, options = {} }) => {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: true,
    ...options,
  })
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default Katex