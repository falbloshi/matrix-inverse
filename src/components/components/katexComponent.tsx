import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KatexComponentProps {
  math: string;
  options?: katex.KatexOptions;
}

const KatexComponent: React.FC<KatexComponentProps> = ({ math, options = {} }) => {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: true,
    ...options,
  })
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default KatexComponent