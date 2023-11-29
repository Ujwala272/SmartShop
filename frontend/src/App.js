import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, Form, FormControl } from 'react-bootstrap';


function VisualSearch() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const submitFile = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file[0]);
  
      axios.post('http://localhost:5000/query', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        setImages(response.data);
      });
    } else {
      alert('Please select a file before submitting.');
    }
  };

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Upload your image</Form.Label>
          <Form.Control type="file" onChange={event => setFile(event.target.files)} />
        </Form.Group>
        <Button variant="primary" onClick={submitFile}>Submit</Button>
      </Form>
      {images.map((image, index) => (
        <img key={index} src={image} alt="Product" />
      ))}
    </Container>
  );
}

function PriceDrop() {
  return <h2>Price Drop Page</h2>;
}

function StyleAdvice() {
  return <h2>Style Advice Page</h2>;
}

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">SmartShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/visual-search">Visual Search</Nav.Link>
            <Nav.Link as={Link} to="/price-drop">Price Drop</Nav.Link>
            <Nav.Link as={Link} to="/style-advice">Style Advice</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/visual-search" element={<VisualSearch />} />
        <Route path="/price-drop" element={<PriceDrop />} />
        <Route path="/style-advice" element={<StyleAdvice />} />
      </Routes>
    </Router>
  );
}

export default App;