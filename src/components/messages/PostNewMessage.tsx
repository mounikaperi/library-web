import { useOktaAuth } from "@okta/okta-react"
import { useState } from "react";

export const PostNewMessage = () => {
  const { authState } = useOktaAuth();

  const [ title, setTitle ] = useState('');
  const [ question, setQuestion ] = useState('');
  const [ displayWarning, setDisplayWarning ] = useState('');
  const [ displaySuccess, setDisplaySuccess ] = useState('');

  return (
    <div className="card mt-3">
      { 
        displaySuccess &&
        <div className="alert alert-success" role="alert">Question Added Successfully!!!</div>
      }
      <div className="card-header">Ask Question to admin</div>
      <div className="card-body">
        <form method="POST">
          {
            displayWarning &&
              <div className="alert alert-danger" role="alert">All fields must be filled out</div>
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
        </form>
      </div>
    </div>
  );
}