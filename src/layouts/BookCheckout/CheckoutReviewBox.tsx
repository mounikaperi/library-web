import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";

export const CheckoutReviewBox: React.FC<{
  book: BookModel | undefined, mobile: boolean, currentLoansCount:number 
}> = (props) => {
  return (
    <div className={props.mobile ? 'card d-flex mt-5': 'card col-3 container d-flex mb-5'}>
      <div className="card-body container">
        <div className="mt-3">
          <p><b>{props.currentLoansCount}/5</b> books checked out</p><hr />
          { props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 
            ? (<h4 className="text-success">Available</h4>)
            : (<h4 className="text-danger">Wait List</h4>)
          }
          <div className="row">
            <p className="col-6 lead"><b>{props.book?.copies || 0}</b> copies</p>
            <p className="col-6 lead"><b>{props.book?.copiesAvailable || 0}</b> available</p>
          </div>
        </div>
        <Link to="/" className="btn btn-success btn-lg">Sign In</Link><hr />
        <p className="mt-3">This number can change until placing order has been complete</p>
        <p>Sign In to be able to leave a review</p>
      </div>
    </div>
  );
}