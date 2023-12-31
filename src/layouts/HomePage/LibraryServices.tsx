export const LibraryServices = () => {
  return (
    <div className="container my-5">
      <div className="row p-4 align-items-center border shadow-lg">
        <div className="col-lg-7 p-3">
          <h3 className="display-4">Can't find what you are looking for?</h3>
          <p className="lead fs-6">If you cannot find what you are looking for, send our library admin's personal message!</p>
          <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
            <a className="btn main-color btn-lg text-white" href="#">Sign Up</a>
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
      </div>
    </div>
  );
}