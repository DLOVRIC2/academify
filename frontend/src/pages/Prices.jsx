import React, { useState } from 'react';
import './style/Prices.css'; 

const Prices = () => {
  const [annualBilling, setAnnualBilling] = useState(false);

  const toggleBilling = () => setAnnualBilling(!annualBilling);

  return (
    <div className="prices-container">
      <header>
        <h3 className="header">Choose Your Plan</h3>
        <div className="toggle mb-2">
          <input type="radio" name="billing" value="annual" id="annualBilling" checked={annualBilling} onChange={() => setAnnualBilling(true)} />
          <label htmlFor="annualBilling">Annually</label>
          <input type="radio" name="billing" value="monthly" id="monthlyBilling" checked={!annualBilling} onChange={() => setAnnualBilling(false)} />
          <label htmlFor="monthlyBilling">Monthly</label>
        </div>
      </header>

      <div className="pricing-row">
        <div className="pricing-card shadow">
          <ul className="list-unstyled text-center">
            <li className="pack bold-text">Free</li>
            <li className="price bottom-bar">{annualBilling ? 'Free' : 'Free'}</li>
            <li className="bottom-bar">5 Article Analyses per Month</li>
            <li className="bottom-bar">Access to the Community</li>
            <li className="bottom-bar">Early Access to New Features</li>
            <li><button className="btn">Subscribe</button></li>
          </ul>
        </div>
        <div className="pricing-card active">
          <ul className="list-unstyled text-center">
            <li className="pack bold-text">Student/Researcher</li>
            <li className="price bottom-bar">{annualBilling ? '$100' : '$10'}</li>
            <li className="bottom-bar">100 Article Analyses per Month</li>
            <li className="bottom-bar">Write 30 LinkedIn Posts</li>
            <li className="bottom-bar">50 Tweets</li>
            <li className="bottom-bar">Integrate with Notion Database</li>
            <li><button className="btn active-btn">Subscribe</button></li>
          </ul>
        </div>
        <div className="pricing-card shadow">
          <ul className="list-unstyled text-center">
            <li className="pack bold-text">Organization</li>
            <li className="price bottom-bar">Contact Us</li>
            <li className="bottom-bar">Customized Solutions</li>
            <li className="bottom-bar">Dedicated Support Team</li>
            <li className="bottom-bar">Access to the Community</li>
            <li className="bottom-bar">Advanced Analytics and Reporting</li>
            <li><button className="btn">Contact Us</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Prices;
