import { Avatar } from '../Avatar';
import { Comment } from '../Comment';
import styles from './styles.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import ptPT from 'date-fns/locale/pt-BR';
import { useState } from 'react';

export function Post({ author, publishedAt, content }) {


    const [comments, setComments] = useState(['Post muito bacana, hein?!']);
    const [newComment, setNewComment] = useState('');
    const isNewCommentEmpty = newComment.length === 0;

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
      locale: ptPT
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptPT,
    addSuffix: true
  });


   function handleNewCommentChange() {
    event.target.setCustomValidity('');
    setNewComment(event.target.value)
  }

    function handleCreateNewComment(event) {
      event.preventDefault();
      setComments([...comments, newComment]);
      setNewComment('');
    }

    function deleteComment(commentToDelete) {
        const commentsWithOutDeletedOne = comments.filter(comment => {
          return comment !== commentToDelete;
        })

        setComments(commentsWithOutDeletedOne);
    }

    function handleNewCommentInvalid() {
      event.target.setCustomValidity('Esse campo é obrigatório!');

    }
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
        {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {
          content.map(line => {
            if (line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>;
            } else if (line.type === 'link') {
              return <p key={line.content}><a href="">{line.content}</a></p>;
            }
          })
        }
      </div>

     <form
        onSubmit={handleCreateNewComment} 
        className={styles.commentForm}
     >
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder='Deixe um comentário...'
          name="comment"
          onChange={handleNewCommentChange}
          value={newComment}
          required
          onInvalid={handleNewCommentInvalid}
        />

        <footer>
          <button 
              type='submit' 
              disabled={isNewCommentEmpty}
           >
            Publicar
        </button>
        </footer>
      </form>

      <div className={styles.commentList}>

          {comments.map(comment => <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
        />)}
      </div>
    </article>
  )
}