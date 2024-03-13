import React from 'react';

function Footer() {
  return (
    <>
      <footer>
        <div className="salutation">
          Like it? Give a <span className="star">Star</span> on <a href="https://github.com/astromanish/git-stats">GitHub</a>
        </div>
        <div className="footer-contact">
          <div className="footer-contact-names">
            <div>
              <a href="https://github.com/astromanish">Manish Singh</a>
            </div>
            <div>
              <a href="https://github.com/rush-tea">Adarsh Tripathi</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
