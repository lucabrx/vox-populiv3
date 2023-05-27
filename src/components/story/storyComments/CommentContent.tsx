"use client"
import Image from 'next/image';
import { type FC } from 'react';
import CommentMenu from './CommentMenu';
import Link from 'next/link';
import ShouldRender from '@/components/helpers/ShouldRender';
import { usePathname } from 'next/navigation';
import { CommentType } from '@/db/tables/Comment';
import { UserType } from '@/db/tables/User';
import dayjs from 'dayjs'
import relativeFormat from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeFormat) 

interface CommentContentProps {
  comment: {
    Comment: CommentType
    User: UserType
  }
  sessionId?: string | null;
}

const CommentContent: FC<CommentContentProps> = ({ comment,sessionId }) => {
    const timeAgo = dayjs(comment?.Comment.created_at).fromNow()
    const pathname = usePathname()
    const newsId = pathname?.split("/")[2]
  return (
    <>

<div className='flex justify-start items-start gap-3  pb-1 relative w-full'> 
<ShouldRender if={sessionId === comment.User.id}>
<CommentMenu 
body={comment?.Comment.body}
userId={comment.User.id}
commentId={comment.Comment.id}
params={newsId!} />
</ShouldRender>
<Link href={`/user/${comment?.Comment.userId}`}>
<Image
src={comment?.User?.image || '/images/placeholder.png'}
alt={comment?.User?.name!}
width={48}
height={48}
className="rounded-full self-start mt-1"
/>
</Link>

<div className='flex flex-col justify-start items-start '>
<div className='flex gap-2 justify-center items-center'>
    <h2 className='text-lg text-my-neutral-950 dark:text-my-neutral-50 font-medium'>{comment?.User?.name}</h2> 
    <p className='text-sm text-my-neutral-700 dark:text-my-neutral-200'>
    {timeAgo}
    </p>
</div>
<p className='text-my-neutral-700 dark:text-my-neutral-200'>
  {comment?.Comment.body}
</p>
</div>
</div>
</>
)
}

export default CommentContent