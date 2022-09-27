import React from 'react'
import Link from 'next/link'

const FooterWidgets = () => (
  <div className='ps-footer__widgets'>
    {/* <aside className='widget widget_footer widget_contact-us'>
      <h4 className='widget-title'>Contact us</h4>
      <div className='widget_content'>
        <p>Call us 24/7</p>
        <h3>1800 97 97 69</h3>
        <p>
          502 New Design Str, Melbourne, Australia <br />
          <a href='mailto:contact@martfury.co'>contact@martfury.co</a>
        </p>
        <ul className='ps-list--social'>
          <li>
            <a className='facebook' href='#'>
              <i className='fa fa-facebook'></i>
            </a>
          </li>
          <li>
            <a className='twitter' href='#'>
              <i className='fa fa-twitter'></i>
            </a>
          </li>
          <li>
            <a className='google-plus' href='#'>
              <i className='fa fa-google-plus'></i>
            </a>
          </li>
          <li>
            <a className='instagram' href='#'>
              <i className='fa fa-instagram'></i>
            </a>
          </li>
        </ul>
      </div>
    </aside> */}
    <aside className='widget widget_footer widget_contact-us'>
      <h4 >FOLLOW US</h4>
      <h4 >INFO@FLYBLOX.COM</h4>
      <div className='widget_content'>
        <ul className='ps-list--social'>
          <li>
            <a className='facebook' target='_blank' href='https://www.facebook.com/Flyblox'>
              <i className='fa fa-facebook'></i>
            </a>
          </li>
          <li>
            <a className='twitter' target='_blank' href='https://twitter.com/flyblox_'>
              <i className='fa fa-twitter'></i>
            </a>
          </li>
          <li>
            <a target='_blank' href='https://t.me/flyblox'>
              <img style={{ width: "18px", height: "18px" }} src='/static/img/telegram.png' alt='telegram' />
            </a>
          </li>
          <li>
            <a className='instagram' target='_blank' href='https://www.instagram.com/_flyblox_/'>
              <i className='fa fa-instagram'></i>
            </a>
          </li>
        </ul>
      </div>
    </aside>
    <aside className='widget widget_footer'>
      <h4 className='widget-title'>QUICK LINKS</h4>
      <ul className='ps-list--link'>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>

        <li>
          <Link href='/page/about-us'>
            {/* <a target='_blank'>About Us</a> */}
            <a>About Us</a>
          </Link>
        </li>
        <li>
          <Link href='/page/contact-us'>
            <a>Contact Us</a>
          </Link>
        </li>
        <li>
          <Link href='/page/contact-us'>
            <a>Bug Bounty</a>
          </Link>
        </li>
        <li>
          <Link href='/page/contact-us'>
            <a>Complaints</a>
          </Link>
        </li>
        <li>
          <Link href='/page/contact-us'>
            <a>Report Product</a>
          </Link>
        </li>
      </ul>
    </aside>
    <aside className='widget widget_footer'>
      <h4 className='widget-title'>SERVICES</h4>
      <ul className='ps-list--link'>
        <li>
          <Link href='/page/fees'>
            <a>Fees</a>
          </Link>
        </li>
        <li>
          <Link href='/account/register'>
            <a>Register Account</a>
          </Link>
        </li>
        <li>
          <Link href='/page/profit-calculator'>
            <a>Profit Calculater</a>
          </Link>
        </li>
        <li>
          <Link href='/account/sell-item'>
            <a>Sell Item</a>
          </Link>
        </li>
      </ul>
    </aside>
    <aside className='widget widget_footer'>
      <h4 className='widget-title'>EDUCATE</h4>
      <ul className='ps-list--link'>
        <li>
          <Link href='/page/faqs'>
            <a>FAQs</a>
          </Link>
        </li>
        <li>
          <Link href='/page/terms-and-conditions'>
            <a>Terms and Service</a>
          </Link>
        </li>
        <li>
          <Link href='#'>
            <a>Privacy Policy</a>
          </Link>
        </li>
        {/* <li>
          <Link href='#'>
            <a>News</a>
          </Link>
        </li> */}
        <li>
          <Link href='/page/coming-soon'>
            <a>Coming Soon</a>
          </Link>
        </li>
        <li>

          <a href={`${process.env.baseURL}/pdf/bitcoin.pdf`} target='_blank'>
            <a>Bitcoin White Paper</a>
          </a>
        </li>
        <li>
          <Link href='/page/band-item'>
            <a>Band Items</a>
          </Link>
        </li>
        <li>
          <Link href='/page/community-guidelines'>
            <a>Community Guidelines</a>
          </Link>
        </li>
      </ul>
    </aside>
  </div>
)

export default FooterWidgets
