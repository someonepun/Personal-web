import React from "react";

/**
 * Article component for displaying an article with title, image, and content.
 * Props:
 * - title: string
 * - image: string (URL)
 * - content: string or React node
 * - author: string (optional)
 * - date: string (optional)
 */
const Article = ({ title, image, content, author, date }) => {
  return (
    <article className="bg-white rounded-lg shadow-sm p-2 mb-6 max-w-2xl mx-auto">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      <h4 className="text-xl mb-2">{title}</h4>
      {(author || date) && (
        <div className="text-sm text-gray-500 mb-2">
          {author && <span>By {author}</span>}
          {author && date && <span> &middot; </span>}
          {date && <span>{date}</span>}
        </div>
      )}
      <div className="text-gray-700 leading-relaxed">{content}</div>
    </article>
  );
};

export default Article;
