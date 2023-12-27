import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";

const ReturnPolicy = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Medical Equipment Home"
        description="Medical Equipment home of flone react minimalist eCommerce template."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        <div>
          <div className="card">
            <div className="card-body">
            <h3>Return Policy:</h3>
            We strive to ensure the precise delivery of the products you request. However, in the case of:<br/>
            (a) an incomplete order, <br/>
            (b) receipt of an expired product, <br/>
            (c) delivery of a damaged product, or <br/>
            (d) reception of an incorrect product, <br/>

            </div>
            <div className="card-body">
            Kindly inform Teracure Support promptly within 7 working days of receiving the products to expedite resolution. It's essential to note that Teracure cannot be held liable for such delivery issues if notification isn't made within 7 working days of receipt.
            </div>

            <div className="card-body">
            Products labeled as non-refundable cannot be returned, and it's the User's responsibility to ascertain the returnable or non-returnable status of the Product before placing an order.
            </div>

           
            <div className="card-body">
            We acknowledge that situations may arise where you wish to return products that are not defective. In such cases, you must inform us within 7 working days of receiving the product. Subsequently, Teracure reserves the exclusive right to accept or decline such returns.
            </div>

            <div className="card-body">
            <h3>Return Policy Exceptions:</h3>
            Please be aware that certain product categories do not qualify for replacements or exchanges. Additionally, Teracure retains the authority to decline returns (or refunds) for specific products, as indicated on their respective product pages with the note: "This item cannot be returned for a refund or exchange."
            </div>

            <div className="card-body">
            <h3>Refund Policy:</h3>
            At Teracure, our goal is your complete satisfaction with our products. We're pleased to provide a full refund under the following conditions: <br/>
            A Full Refund is Possible If:<br/>
            i. You've received a defective item.<br/>
            ii. The ordered item(s) is lost or damaged during transit.<br/>
            iii. You've received a product that has surpassed its expiry date. <br/>
            (Kindly note: The mode of refund may vary based on circumstances. If the refund is through a Credit/Debit Card or Net Banking, please allow 7 to 10 working days for the credit to reflect in your account. Although we regret any inconvenience caused by this timeframe, the refund delay is per the bank's policy, over which we have no control.)<br/>
            iv: <b>Cash on Delivery:</b>To facilitate refunds for Cash on Delivery (COD) orders, the User must send an email to saimedilink@gmail.com. Subsequently, the User will receive a refund to their bank account. If the refund is to be processed to the User's bank account, the User will need to furnish their bank account details.<br/>
            v: In such instances, the refunded amount will be returned to the User's original payment source.<br/>
            vi: <b>Refund Request Process:</b>To initiate a refund, kindly send an email to saimedilink@gmail.com containing your order details and the reason for requesting the refund. We highly value User feedback and utilize it to consistently enhance the quality of our services.<br/>

            </div>

          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ReturnPolicy;
