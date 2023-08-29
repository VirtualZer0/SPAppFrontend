import sanitizeHtml from 'sanitize-html';

export const sanitizeContent = (content: string | null | undefined) => {
  if (!content) {
    return '';
  }

  return sanitizeHtml(content, {
    transformTags: {
      a: (tagName, attr) => ({ tagName, attribs: { ...attr, target: '_blank' } })
    }
  });
};
