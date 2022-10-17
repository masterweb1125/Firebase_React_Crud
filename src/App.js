import { useState } from "react";
import storage from "./firebaseConfigstorage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import 'bootstrap/dist/css/bootstrap.css';
import { ProgressBar } from 'react-bootstrap';
import { collection, addDoc } from "firebase/firestore";
import db from "./firestoreConfigs";
import { Form } from 'react-bootstrap';




function App() {



  // State to store uploaded file
  const [file, setFile] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [question, setQuestion] = useState();
  const [videourl, setVideoURl] = useState();



  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  if (percent === 100) {
    setPercent(0);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an video first!");
    }

    try {
      const docRef = addDoc(collection(db, "Upload"), {
        Name: file.name,
        DateTime: date + time,
        Question: question,
        Url: videourl,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    const storageRef = ref(storage, `/files/${file.name}`);


    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setVideoURl(url);
        });
      }
    );
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center flex-column" style={{ height: "500px" }}>
        <input className="form-control" style={{ margin: "20px" }} type="file" onChange={handleChange} accept="/video/*" />
        <button className="btn btn-primary" style={{ margin: "20px" }} onClick={handleUpload}>Upload to Firebase</button>

        <p>{percent} "% Done"</p>
        <div className="container">
          <ProgressBar>
            <ProgressBar striped animated variant="success" now={percent} key={1} />
          </ProgressBar>
        </div>

        <div>
          {/* <input className="form-control" style={{ margin: "20px" }} placeholder="Enter your Date" value={date}
            onChange={(e) => setDate(e.target.value)} /> */}

          <input className="form-control" style={{ margin: "20px" }} placeholder="Enter your Question" value={question}
            onChange={(e) => setQuestion(e.target.value)} />

          {/* <Form.Group controlId="dob" style={{ margin: "20px" }}>
            <Form.Label>Select Date</Form.Label> */}
          <Form.Control style={{ margin: "20px" }} value={date} type="date" name="date" placeholder="Enter your Date" onChange={(e) => setDate(e.target.value)} />
          <Form.Control style={{ margin: "20px" }} value={time} type="time" name="time" placeholder="Enter your Time" onChange={(e) => setTime(e.target.value)} />
          {/* </Form.Group> */}
        </div>

      </div>

    </>


  );
}

export default App;