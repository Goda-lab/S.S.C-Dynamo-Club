import React from "react";
import facebookIcon from "./facebook.png"; // Import Facebook icon
import instagramIcon from "./instagram.png"; // Import Instagram icon
import youtubeIcon from "./youtube.png"; // Import YouTube icon
import mailIcon from "./mail.png"; // Import Mail icon

function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 mt-10">
      <p className="text-sm">© 2025 S.S.C Dynamo Club. All Rights Reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="mailto:sscdynamo@gmail.com" className="hover:underline">
          <img src={mailIcon} alt="Email" className="w-8 h-8" />
        </a>
        <a href="https://facebook.com/sscdynamoclub" target="_blank" rel="noopener noreferrer" className="hover:underline">
          <img src={facebookIcon} alt="Facebook" className="w-8 h-8" />
        </a>
        <a href="https://instagram.com/sscdynamoclub" target="_blank" rel="noopener noreferrer" className="hover:underline">
          <img src={instagramIcon} alt="Instagram" className="w-8 h-8" />
        </a>
        <a href="https://youtube.com/sscdynamoclub" target="_blank" rel="noopener noreferrer" className="hover:underline">
          <img src={youtubeIcon} alt="YouTube" className="w-8 h-8" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;