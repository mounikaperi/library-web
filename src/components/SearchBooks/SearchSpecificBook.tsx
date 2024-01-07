import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";

export const SearchSpecificBook: React.FC<{ book: BookModel }> = (props) => {
  const bookImage = props.book.img ? props.book.img : require('../../images/books2.jpg');
  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g=0">
        <div className="col-md-3">
          <div className="d-none d-lg-block">
            <img src={bookImage} width="250" height="300" alt="Book" />
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            <img src={bookImage} width="250" height="300" alt="Book" />
          </div>
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{props.book.author}</h5>
            <h4>{props.book.title}</h4>
            <p className="card-text">{props.book.description}</p>
          </div>
        </div>
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <Link className="btn btn-md main-color text-white" to={`/checkout/${props.book.id}`}>View Details</Link>
        </div>
      </div>
    </div>
  );
}