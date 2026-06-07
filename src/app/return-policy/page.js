import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
; // Reuse CSS layout module

export default function ReturnPolicyPage() {
  return (
    <div className="policy-section">
      <div className="container">
        <SectionTitle title="Returns & Exchanges" subtitle="Label Guidelines" />
        
        <div className="policy-content">
          {/* Return Block */}
          <div className="policy-block">
            <h2 className="policy-blockTitle">Return Policy (Damaged Items Only)</h2>
            <p>
              At Abeer, we stand behind the quality of our handcrafted luxury ethnic wear. 
              **Returns are accepted only in the case of manufacturing damages or defective products received.**
            </p>
            <p>
              To initiate a return for a damaged item:
            </p>
            <ul>
              <li>The damage request must be raised within **3 days** of order delivery.</li>
              <li>You must contact customer support via WhatsApp or email with your Order ID.</li>
              <li>
                <strong>An unboxing video is mandatory.</strong> The video must show the package seal being opened for the first time 
                and inspect the item clearly. Claims without a complete, continuous unboxing video will not be accepted.
              </li>
            </ul>
          </div>

          {/* Exchange Block */}
          <div className="policy-block">
            <h2 className="policy-blockTitle">Exchange Policy (Sizing Only)</h2>
            <p>
              We provide exchanges exclusively for **size discrepancies**. If a piece does not fit as desired, you can request 
              a size exchange within **3 days** of delivery.
            </p>
            <p>
              Please note the following exchange criteria:
            </p>
            <ul>
              <li>Exchanges are strictly subject to product size availability in our warehouse.</li>
              <li>The garment must be returned in **unused, unwashed, and original condition** with all brand tags attached.</li>
              <li>Customized order items are ineligible for size exchanges.</li>
            </ul>
          </div>

          {/* Refund Block */}
          <div className="policy-block">
            <h2 className="policy-blockTitle">Refund Policy (Store Credit)</h2>
            <p>
              Abeer **does not offer monetary or bank refunds** for order returns or size discrepancies.
            </p>
            <p>
              Upon validating and processing an eligible return claim, you will be issued **Store Credit** matching the purchase amount. 
              Store credit carries no expiration date and can be applied to any future silhouette releases on our online shop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
