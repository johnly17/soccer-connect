import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";



function Comments({
  id,
  eventDetail,
  user,
  comment,
  comments,
  setComments,
  eventID,
  loading
}) {

  

  function handleDeleteComment(e) {
    fetch(`/comments/${id}`, {
      method: "DELETE",
    })
      .then((data) => {
        setComments(comments.filter((comment) => comment.id !== data.id));
        window.location.reload(true)
      });
  }


  if (loading) return <h1>Loading...</h1>

  return (
    <div style={{ display: "flex", margin: '20px auto' }}>
      <Card.Img
        style={{
          width: "40px",
          height: "35px",
          marginRight: "10px",
        }}
        src={comment.user.image}
      />
      <Card.Text style={{paddingTop: '0px'}}>{comment.user.first_name} {comment.user.last_name}: {comment.body}</Card.Text>
      {comment.user.id === user.id ? (
        <Button
          style={{
            backgroundColor: "white",
            border: "0",
            marginLeft: "10px",
            marginBottom: '5px'
          }}
          type="submit"
          onClick={handleDeleteComment}
          // href={`/events/${eventID}`}
        >
          🗑️
        </Button>
      ) : null}
      
      {/* <Card>
        {comments?.length !== 0 ? (
          comments?.map((comment) => {
            return (
              <Container
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                <Container style={{ display: "flex" }}>
                  <Card.Img
                    style={{
                      width: "40px",
                      height: "35px",
                      marginRight: "10px",
                    }}
                    src={comment.user.image}
                  />
                  <Card.Text id={id}>
                    {comment.user.first_name} {comment.user.last_name}:{" "}
                    {comment.body}
                  </Card.Text>
                </Container>
                {comment.user.id === user.id ? (
                  <Button
                    style={{
                      backgroundColor: "white",
                      border: "0",
                      marginLeft: "10px",
                    }}
                    type="submit"
                    onClick={handleDeleteComment}
                    href={`/event/${eventID}`}
                  >
                    🗑️
                  </Button>
                ) : null}
              </Container>
            );
          })
        ) : (
          <Card.Text className="text-center" style={{ paddingTop: "20px" }}>
            Add the first comment!
          </Card.Text>
        )}
        {user.length !== 0 ? (
          <Form style={{ padding: "15px" }} onSubmit={handleNewComment}>
            <Form.Control
              placeholder="new comment..."
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></Form.Control>
            <Button style={{ margin: "10px auto" }} type="submit">
              Add Comment
            </Button>
          </Form>
        ) : null}
      </Card> */}
    </div>
  );
}

export default Comments;
