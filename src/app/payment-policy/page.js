import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
;

export default function PaymentPolicyPage() {
  return (
    <div className="policy-section">
      <div className="container">
        <SectionTitle title="Payment & Cancellation" subtitle="Label Guidelines" />
        
        <div className="policy-content">
          <div className="policy-block">
            <h2 className="policy-blockTitle">Order Confirmation</h2>
            <p>
              At Abeer, every silhouette is custom crafted to your measurements and choices. 
              An order is officially confirmed only after a successful electronic payment transaction is completed.
            </p>
          </div>

          <div className="policy-block">
            <h2 className="policy-blockTitle">Prepaid Only Policy</h2>
            <p>
              To maintain the integrity of our slow-crafted handmade workflow, **we do not accept Cash on Delivery (COD)**. 
              All purchases made via the Abeer online storefront must be fully prepaid. 
              We accept all major credit/debit cards, UPI payments, and net banking options.
            </p>
          </div>

          <div className="policy-block">
            <h2 className="policy-blockTitle">Cancellation & Alterations</h2>
            <p>
              Once your payment is completed and order details are logged, the processing cycle begins, and the order 
              **cannot be cancelled or refunded**.
            </p>
            <p>
              We advise all customers to review sizing specifications, fit drapes, and shipping address details thoroughly 
              prior to order submission. If you make a mistake on your shipping details, contact customer care immediately 
              via WhatsApp (+91 8076006802) within 12 hours.
            </p>
          </div>

          <div className="policy-block">
            <h2 className="policy-blockTitle">Customization Guidelines</h2>
            <p>
              Orders placed directly on our website are processed with standard dimensions and cannot be customized.
            </p>
            <p>
              Customization requests (length adjustments, sizing tweaks, pattern modifications) are accepted **only through 
              Instagram DM (@abeer.label) or WhatsApp (+91 8076006802)** prior to ordering. 
              Customization charges start from a base fee of **₹200 onwards** depending on the alterations requested.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
