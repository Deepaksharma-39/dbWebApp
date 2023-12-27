import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const ProductDescriptionTab = ({
  spaceBottomClass,
  productFullDesc,
  product,
}) => {
  return (
    <div className={clsx("description-review-area", spaceBottomClass)}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">Precautions</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    
                    <li>
                      <span>Class </span> {product.class}
                    </li>
                    <li>
                      <span>Quantity</span> {product.numbers}
                    </li>
                    <li>
                      {"Note: "}
                      {product.note}
                    </li>
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
              
                <h3>Action</h3>
                <ul>
                  {product.action.map((action, index) => (
                    <>
                      <li key={index}>{action}</li>
                    </>
                  ))}
                </ul>
                <br />
                <h3>Compostion</h3>
           
           {product.composition.map((action, index) => (
             <>
               <li key={index}>{action}</li>
             </>
           ))}
         
             <br/>
                <h3>Uses</h3>
                <ul>
                {product.uses.map((action, index) => (
                  <>
                    <li key={index}>{action}</li>
                  </>
                ))}
                </ul>
                <br />
                <h3>Dosage & Administration</h3>
                <ul>
                {product.dosage.map((action, index) => (
                  <>
                    <li key={index}>{action}</li>
                  </>
                ))}
                </ul>
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                
              <h3>Instructions</h3>
                
                  {product.instruction.map((action, index) => (
                    <>
                      <li key={index}>{action}</li>
                    </>
                  ))}
                
                <br />
                <h3>Side-Effects</h3>
                {product.warning.map((action, index) => (
                  <>
                    <li key={index}>{action}</li>
                  </>
                ))}
                <br />
                <h3>Safety: Age / Pregnancy / Withdrawal</h3>
              <ul>
              {product.safety.map((action, index) => (
                  <>
                    <li key={index}>{action}</li>
                  </>
                ))}
              </ul>
              
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;
