import { useState } from "react";
import { Modal } from "react-bootstrap";

const Popup = ({ show, onHide }) => {
  //   const [modalShow, setModalShow] = useState(false);
  //   onHide={() => setModalShow(false)}

  const onCloseModal = () => {
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onCloseModal}
      className="product-quickview-modal-wrapper"
    >
      <Modal.Header closeButton></Modal.Header>
      <div className="contact-form">
        <div className="contact-title mb-30">
          <h2>Product Enquiry Form </h2>
        </div>
        <form className="contact-form-style">
          <div className="row">
            <div className="col-lg-6">
              <input name="name" placeholder="Name*" type="text" required />
            </div>
            <div className="col-lg-6">
              <input name="email" placeholder="Email*" type="email" required />
            </div>
            <div className="col-lg-6">
              <input
                name="number"
                placeholder="Phone*"
                type="number"
                required
              />
            </div>
            <div className="col-lg-6">
              <input
                name="pincode"
                placeholder="Pincode*"
                type="number"
                required
              />
            </div>
            <div className="col-lg-12">
              <p>
                Hello! Fill this form and we will get back to you will all the
                necessary Details
              </p>
              <button className="submit" type="submit">
                SEND
              </button>
            </div>
          </div>
        </form>
        <p className="form-message" />
      </div>
    </Modal>
  );
};

export default Popup;