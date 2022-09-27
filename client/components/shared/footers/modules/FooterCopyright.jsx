import React from 'react'
import Link from 'next/link'
import Telegram from "public/static/img/telegram.png"
const FooterCopyright = () => (
  <div className='ps-footer__copyright'>
    <div>
        {/* <p>Call us 24/7</p>
        <h3>1800 97 97 69</h3>
        <p>
          502 New Design Str, Melbourne, Australia <br />
          <a href='mailto:contact@martfury.co'>contact@martfury.co</a>
        </p> */}
    <p>&copy; 2021 FlyBlox. All Rights Reserved</p>
    </div>
    {/* <ul>
        <li>
          <Link href='/page/terms-and-conditions'>
            <a target='_blank'>Terms & Conditions</a>
          </Link>
        </li>
        <li>
          <Link href='#'>
            <a>FAQ</a>
          </Link>
        </li>
    </ul> */}
    <p>
      <span>We accept:</span>
      <a href='#'>
        <img
          src='/static/img/payment-method/bnb.png'
          alt='FlyBlox'
          width='40px'
        />
      </a>
      <a href='#'>
        <img
          src='/static/img/payment-method/eth.png'
          alt='FlyBlox'
          width='40px'
        />
      </a>
      <a href='#'>
        <img
          src='/static/img/payment-method/usdt.png'
          alt='FlyBlox'
          width='40px'
        />
      </a>
      <a href='#'>
        <img
          src='/static/img/payment-method/hex.png'
          alt='FlyBlox'
          width='40px'
        />
      </a>
      {/* <a href='#'>
        <img src='/static/img/payment-method/4.jpg' alt='FlyBlox' />
      </a>
      <a href='#'>
        <img src='/static/img/payment-method/5.jpg' alt='FlyBlox' />
      </a> */}
    </p>
  </div>
)

export default FooterCopyright
