import { type FC } from 'react';
import CommentContent from './CommentContent';
import WriteComment from './WriteComment';
import { CommentType } from '@/db/tables/Comment';
import { UserType } from '@/db/tables/User';


interface CommentsProps {
  params: string;
  session?: SafeSession | null;
  comments: {
    Comment: CommentType 
    User: UserType 
  }[] 
}

const Comments: FC<CommentsProps> = ({params, session, comments}) => {

  return (


<div className='flex flex-col w-full justify-center items-start space-y-2 mt-4'>
    <WriteComment />
    {comments?.map((comment) => (
        <CommentContent 
        key={comment.Comment.id}
        comment={comment}
        sessionId={session?.id}
        />
    ))}
</div>
)
}

export default Comments