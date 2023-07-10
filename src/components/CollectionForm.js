import React, { useState } from "react";
import { Form, Button, Container, Card, Col, Row } from "react-bootstrap";
import classes from "../styles/Dashboard.module.css";

function CollectionForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the collection object
    const collection = {
      name: name,
      description: description,
      topic: topic,
    };

    // Clear the input fields
    setName("");
    setDescription("");
    setTopic("");

    // Perform your desired actions with the collection data
    console.log("Collection:", collection);
  };
  return (
    <Container className="m-5">
      <Card className={classes.dashboardCard}>
        <h2 className={classes.dashboardTitle}>Create Collection</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-5">
            <Form.Group as={Col} controlId="formName">
              <Form.Label column sm="3">
                Name
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formTopic">
              <Form.Label column sm="3">
                Topic
              </Form.Label>

              <Form.Control
                type="text"
                name="topic"
                value={topic}
                placeholder="Enter topic"
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default CollectionForm;
