import { useOktaAuth } from "@okta/okta-react"
import { useState } from "react";
import { addNewBookByAdmin } from "../../services/adminService";

export const AdminAddNewBook = () => {

  const { authState } = useOktaAuth();

  const [ title, setTitle ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ copies, setCopies ] = useState(0);
  const [ category, setCategory ] = useState('Category');
  const [ selectedImage, setSelectedImage ] = useState<any>('');

  const [ displayWarning, setDisplayWarning ] = useState(false);
  const [ displaySuccess, setDisplaySuccess ] = useState(false);

  function categoryField(value: string) {
    setCategory(value);
  }

  async function base64ConversionForImages(e: any) {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  }

  function getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      setSelectedImage(reader.result);
    };
    reader.onerror = function(error) {
      console.log('Error', error);
    }
  }

  async function submitNewBook() {
    try {
      await addNewBookByAdmin(authState, { title, author, description, copies, category, img: selectedImage});
      setDisplaySuccess(true);
      setDisplayWarning(false);
    } catch (error: any) {
      setDisplaySuccess(false);
      setDisplayWarning(true);
    } finally {
      setTitle('');
      setAuthor('');
      setDescription('');
      setCopies(0);
      setCategory('Category');
      setSelectedImage(null);
    }
  }

  return (
    <div className="container mt-5">
      {
        displaySuccess &&
          <div className='alert alert-success' role='alert'>
            Book added successfully
          </div>
      }
      {
        displayWarning &&
          <div className="alert alert-danger" role="alert">
            All fields must be filled out
          </div>
      }
      <div className="card">
        <div className="card-header">
          Add button new Book
        </div>
        <div className="card-body">
          <form method="POST">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name="title" required 
                  onChange={e => setTitle(e.target.value)} value={title} />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Author</label>
                <input type="text" className="form-control" name="author" required
                  onChange={e => setAuthor(e.target.value)} value={author} />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Category</label>
                <button className="form-control btn btn-secondary dropdown-toggle" type="button"
                  id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {category}
                </button>
                <ul id="addNewBook1" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><button onClick={() => categoryField('FE')} className="dropdown-item">Front End</button></li>
                  <li><button onClick={() => categoryField('BE')} className="dropdown-item">Back End</button></li>
                  <li><button onClick={() => categoryField('Data')} className="dropdown-item">Data</button></li>
                  <li><button onClick={() => categoryField('DevOps')} className="dropdown-item">DevOps</button></li>
                </ul>
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}
                onChange={e => setDescription(e.target.value)} value={description}></textarea>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Copies</label>
              <input type="number" className="form-control" name="Copies" required
                onChange={e => setCopies(Number(e.target.value))} value={copies} />
            </div>
            <input type="file" onChange={e => base64ConversionForImages(e)}/>
            <div>
              <button type="button" className="btn btn-primary mt-3" onClick={submitNewBook}>
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}