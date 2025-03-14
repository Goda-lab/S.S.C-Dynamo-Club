import React from "react";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className="p-5 max-w-2xl mx-auto">
      <Helmet>
        <title>About S.S.C Dynamo Club</title>
        <meta name="description" content="S.S.C Dynamo Club is a Kenyan football club dedicated to nurturing children's talents for their future. We provide training, mentorship, and opportunities for young players to develop their skills and achieve their dreams in football." />
        <meta name="keywords" content="S.S.C Dynamo Club,Kenya football, football club, children's football, football training, football mentorship, football opportunities" />
        <meta name="author" content="S.S.C Dynamo Club" />
      </Helmet>
      <h2 className="text-3xl font-bold mb-4">S.S.C DYNAMO CLUB</h2>
      
      <h3 className="text-2xl font-semibold mb-2">About This Team</h3>
      <p className="mb-4">
        S.S.C Dynamo Club is a football club dedicated to nurturing children's talents for their future. We provide training, mentorship, and opportunities for young players to develop their skills and achieve their dreams in football.
      </p>
      
      <h3 className="text-2xl font-semibold mb-2">How to Find Us</h3>
      <p className="mb-4">
        You can find us at the following location: Redemeed Primary, opposite Harvest.
      </p>
      
      <h3 className="text-2xl font-semibold mb-2">Contribution & Support</h3>
      <p className="mb-4">
        If you are interested in supporting or joining our club, feel free to contact us. We appreciate any form of assistance, including sponsorships, partnerships, and volunteer coaching.
      </p>
      
      <p className="font-semibold">
        Thank you for your interest in S.S.C Dynamo Club!
      </p>
    </div>
  );
};

export default About;