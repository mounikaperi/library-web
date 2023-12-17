import BookModel from "../../models/BookModel";

export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
    const bookImage = props.book.img ? props.book.img : require('../../images/books2.jpg');
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                <img
                    src={bookImage}
                    width='100'
                    height='300'
                    alt="book"
                    className="card-img-top"
                />
                <h6 className='mt-2'>{props.book.title}</h6>
                <p>{props.book.author}</p>
                <a className='btn main-color text-white' href="#">Reserve</a>
            </div>
        </div>
    );
}