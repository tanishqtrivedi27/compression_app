import { FileUploadForm } from './components/fileUploadForm';
import { FileDownload } from './components/fileDownloadButton';

function App() {
  return (
    <>
      <h2> TEXT COMPRESSION </h2>
      <br /><br />
      <FileUploadForm />
      <br />
      <FileDownload />
    </>
  )
}

export default App
