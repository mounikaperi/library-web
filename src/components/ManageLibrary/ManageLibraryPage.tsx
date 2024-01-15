import { useOktaAuth } from "@okta/okta-react"
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AdminMessages } from "./AdminMessages";
import { AdminAddNewBook } from "./AdminAddNewBook";
import { ChangeQuantityOfBooks } from "./ChangeQuantityOfBooks";

export const ManageLibraryPage = () => {

  const { authState } = useOktaAuth();
  const [ changeQuantityOfBooks, setChangeQuantityOfBooks ] = useState(false);
  const [ messages, setMessages ] = useState(false);

  function addBookToLibrary() {
    setChangeQuantityOfBooks(false);
    setMessages(false);
  }

  function setBooksQuantity() {
    setChangeQuantityOfBooks(true);
    setMessages(false);
  }
  
  function sendMessages() {
    setChangeQuantityOfBooks(false);
    setMessages(true);
  }

  if (authState?.accessToken?.claims.userType === undefined) {
    return <Redirect to='/home' />
  }

  return (
    <div className="container">
      <div className="mt-5">
        <h3>Manage Library</h3>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tab">
            <button onClick={addBookToLibrary} className="nav-link active" id="nav-add-book-tab" 
              data-bs-toggle="tab" data-bs-target="#nav-add-book" type="button" role="tab" 
              aria-controls="nav-add-book" aria-selected="false">
                Add new Book
            </button>
            <button onClick={setBooksQuantity} className="nav-link" id="nav-quantity-tab" 
              data-bs-toggle="tab" data-bs-target="#nav-quantity" type="button" role="tab" 
              aria-controls="nav-quantity" aria-selected="true">
                Change quantity
            </button>
            <button onClick={sendMessages} className="nav-link" id="nav-messages-tab" data-bs-toggle="tab" 
              data-bs-target="#nav-messages" type="button" role="tab" aria-controls="nav-messages"
              aria-selected="true">
                Messages
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-content">
          <div className="tab-pane fade show active" id="nav-add-book" role="tabpanel"
            aria-labelledby="nav-add-book-tab">
              <AdminAddNewBook />
          </div>
          <div className="tab-pane fade" id="nav-quantity" role="tabpanel" aria-labelledby="nav-quantity-tab">
            {changeQuantityOfBooks ? <ChangeQuantityOfBooks /> : <></> }
          </div>
          <div className="tab-pane fade" id="nav-messages" role="tabpanel" aria-labelledby="nav-messages-tab">
            { messages ? <AdminMessages />: <></> }
          </div>
        </div>
      </div>
    </div>
  )
}