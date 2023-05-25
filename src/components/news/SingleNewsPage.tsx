import { NewsType } from '@/db/tables/News';
import { type FC } from 'react';
import CustomReactMarkdown from '../helpers/ReactMarkdown';
import ShouldRender from '../helpers/ShouldRender';
import EditNews from './EditNews';

interface SingleNewsPageProps {
    news: NewsType | null
    session: SafeSession | null
}

const SingleNewsPage: FC<SingleNewsPageProps> = ({news,session}) => {
  return (
    <div className="w-full border-b border-my-neutral-200/30 dark:border-my-neutral-700/50 pb-4">
      <ShouldRender if={session?.role === "NewsEditor"}>
    <EditNews data={news}   />
    </ShouldRender>
    <h2 className="text-[24px] md:text-[28px] font-bold text-center px0:text-left text-my-neutral-950 dark:text-my-neutral-50">{news?.title}
    </h2>
<CustomReactMarkdown 
    className="
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
      prose-td:text-my-neutral-700">
        {news?.body!}
        </CustomReactMarkdown>
</div>
)
}

export default SingleNewsPage