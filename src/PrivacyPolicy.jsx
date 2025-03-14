import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> 10/03/2025</p>

      <h2>1. Information We Collect</h2>
      <p>We collect your email address when you sign up or log in to manage your account.</p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To allow you to log in and access member-only features.</li>
        <li>To communicate important updates about the club.</li>
        <li>To improve security and prevent unauthorized access.</li>
      </ul>

      <h2>3. Data Sharing & Security</h2>
      <p>We do not sell, rent, or share your email with third parties. Your data is securely stored using Firebase Authentication.</p>

      <h2>4. Your Rights</h2>
      <p>You can request to update or delete your email by contacting our admin.</p>

      <h2>5. Data Retention</h2>
      <p>Your email will be kept as long as your account is active. If you request account deletion, we will remove your data permanently.</p>

      <h2>6. Changes to This Policy</h2>
      <p>We may update this Privacy Policy. Any significant changes will be notified through email or on our website.</p>

      <h2>7. Contact Us</h2>
      <p>📧 Email: <a href="mailto:sscdynamoclub@gmail.com">sscdynamoclub@gmail.com</a></p>
    </div>
  );
};

export default PrivacyPolicy;
