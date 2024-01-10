import { useOktaAuth } from "@okta/okta-react"
import { useState } from "react";
import { submitNewQuestion } from "../../services/messagesService";

export const PostNewMessage = () => {
  const { authState } = useOktaAuth();

  const [ title, setTitle ] = useState('');
  const [ question, setQuestion ] = useState('');
  const [ displayWarning, setDisplayWarning ] = useState(false);
  const [ displaySuccess, setDisplaySuccess ] = useState(false);

  async function postNewMessage() {
    try {
      await submitNewQuestion(authState, title, question);
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } catch (error: any) {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    } finally {
      setTitle('');
      setQuestion('');
    }
  }

  return (
    <div className="card mt-3">
      <div className="card-header">Ask Question to admin</div>
      <div className="card-body">
        <form method="POST">
          {
            displayWarning &&
              <div className="alert alert-danger" role="alert">All fields must be filled out</div>
          }
          { 
            displaySuccess &&
            <div className="alert alert-success" role="alert">Question Added Successfully!!!</div>
          }
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title"
              onChange={e => setTitle(e.target.value)} value={title} />
          </div>
          <div className="mb-3">
            <label className="form-label">Question</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} 
              onChange={ e=> setQuestion(e.target.value)} value={question} />
          </div>
          <button type='button' className="btn btn-primary mt-3" onClick={postNewMessage}>Submit Question</button>
        </form>
      </div>
    </div>
  );
}