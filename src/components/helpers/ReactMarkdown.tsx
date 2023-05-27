import { FC } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface ReactMarkdownProps  {
  children: string;
  className?: string;
};

const CustomReactMarkdown: FC<ReactMarkdownProps> = ({ children, className }) => {
  return (
    <ReactMarkdown
      className={`${className} 
      
      prose 
      dark:prose-headings:text-my-neutral-50
        prose-headings:text-my-neutral-950
        dark:prose-p:text-my-neutral-200
        dark:prose-blockquote:text-my-neutral-200
        dark:prose-figure:text-my-neutral-200
        dark:prose-strong:text-my-neutral-200
        dark:prose-code:text-my-neutral-200
        dark:prose-ul:text-my-neutral-200
        dark:prose-ol:text-my-neutral-200
        dark:prose-figcaption:text-my-neutral-200
        dark:prose-lead:text-my-neutral-200
        dark:prose-hr:text-my-neutral-200
        dark:prose-a:text-blue-400
        dark:prose-pre:text-my-neutral-200
        dark:prose-table:text-my-neutral-200
        dark:prose-th:text-my-neutral-200
        dark:prose-em:text-my-neutral-200
        dark:prose-td:text-my-neutral-200
         
  
        prose-p:text-my-neutral-700
        prose-blockquote:text-my-neutral-700
        prose-figure:text-my-neutral-700
        prose-strong:text-my-neutral-700
        prose-code:text-my-neutral-700
        prose-ul:text-my-neutral-700
        prose-ol:text-my-neutral-700
        prose-figcaption:text-my-neutral-700
        prose-lead:text-my-neutral-700
        prose-hr:text-my-neutral-700
        prose-a:text-blue-600
        prose-pre:text-my-neutral-700
        prose-table:text-my-neutral-700
        prose-th:text-my-neutral-700
        prose-em:text-my-neutral-700
        prose-td:text-my-neutral-700
      prose-emerald markdown__content`}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default CustomReactMarkdown;
