import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import _404Image from "../../assets/images/404.jpg";

const NotFound = (props) => {
  return (
    <>
      <Helmet>
        <title>Page not found | HotelBooking</title>
      </Helmet>
      <Container fluid>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <img
                style={{ maxWidth: 700, width: "100%" }}
                src={_404Image}
                alt="page not found"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-center fs-3 back-text">
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              Back to Home page
            </Link>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default NotFound;
