import React from 'react'
import { Comment, Header, Form, Button } from 'semantic-ui-react'

export default function Comments({ comments, onComment }: { comments: string[]; onComment: (comment: string) => void }): JSX.Element {
  function handleSubmit(e: any): void {
    onComment(e.target[0].value)
  }


  return (
    <Comment.Group>
      <Header as='h3' dividing>
        Comments
      </Header>
      {
        comments.map((comment, i) => (
          <Comment key={i}>
            <Comment.Avatar src='https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg' />
            <Comment.Content>
              <Comment.Author>Anon</Comment.Author>
              <Comment.Text>
                {comment}
              </Comment.Text>
            </Comment.Content>
          </Comment>
        ))
      }
      <Form reply onSubmit={handleSubmit}>
        <Form.TextArea />
        <Button data-cy="add-comment" content='add comment' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>
  )
}
