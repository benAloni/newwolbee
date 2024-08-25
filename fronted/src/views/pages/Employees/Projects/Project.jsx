import React, { useState } from 'react';
import Slider from 'react-slick';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nyx from '../../../../imgs/nyx.png';
import vip from '../../../../imgs/vip.jpg';
import omer from '../../../../imgs/omeradam.jpg';
import amir from '../../../../imgs/amirdadon.jpg';
import shlomi from '../../../../imgs/shlomikoriat.jpg';
import kosher from '../../../../imgs/buymekosher.jpg';
import burger from '../../../../imgs/burger.jpg';
import food from '../../../../imgs/foodgift.jpg';
import vegangift from '../../../../imgs/vegangift.jpg';
import asiagift from '../../../../imgs/asiagift.jpg';
import pizzagift from '../../../../imgs/pizzagift.jpg';
import eyalgolan from '../../../../imgs/eyalgolan.jpg';
import spa from '../../../../imgs/spa.jpg';
import meditazia from '../../../../imgs/meditazia.jpg';
import yoga from '../../../../imgs/yoga.jpg';
import hotel from '../../../../imgs/hotel.jpg';
import lifestyle1 from '../../../../imgs/lifestyle1.jpg';
import lifestyle2 from '../../../../imgs/lifestyle2.png';
import lifestyle3 from '../../../../imgs/lifestyle3.png';
import lifestyle4 from '../../../../imgs/lifestyle4.png';
import { TiPin } from "react-icons/ti";
import nicole from '../../../../imgs/avatar_4.JPG'


// נתוני תמונות לדוגמה לכל גלריה
const gallery1Images = [
  { id: 7, src: kosher, price: 100, link: 'https://e-kosher.gr/he/' },
  { id: 8, src: burger, price: 50, link: 'https://pinukitchen.co.il/' },
  { id: 9, src: food, price: 30, link: 'https://wolt.com/he/isr' },
  { id: 10, src: vegangift, price: 130, link: 'https://vegansupplies.co.il/home?utm_medium=adwords&utm_campaign=&utm_source=&gad_source=1&gclid=Cj0KCQjwvb-zBhCmARIsAAfUI2vajooQ1XbSCi_09rn9LdTg0KnenNNs647-W9MabBfwtOspFZ9UNQsaAhOiEALw_wcB' },
  { id: 11, src: asiagift, price: 150, link: 'https://www.eastwest-stores.co.il/he/' },
  { id: 12, src: pizzagift, price: 110, link: 'https://www.dominos.co.il/' },


  
];


const gallery2Images = [
  { id: 2, src: vip, price: 200, link: 'https://buyme.co.il/supplier/22546?gad_source=1&gclid=CjwKCAjw9cCyBhBzEiwAJTUWNacKmPMLAUTjrqak9HNikzMNZafdtyKyz8Xd_Awqqb0OtjBwOVgOZxoCo40QAvD_BwE' },
  { id: 3, src: omer, price: 300, link: 'https://2207.kupat.co.il/show/omer-adam' },
  { id: 4, src: amir, price: 400, link: 'https://www.amirdadon.com/he/home#!live' },
  { id: 5, src: shlomi, price: 500, link: 'https://comy.co.il/event/shlomi-koriat/' },
  { id: 5, src: eyalgolan, price: 310, link: 'https://comy.co.il/event/shlomi-koriat/' },

];

const gallery3Images = [
  { id: 13, src: spa, price: 220, link: 'https://www.roxonsparamatgan.co.il/%D7%97%D7%91%D7%99%D7%9C%D7%95%D7%AA-%D7%94%D7%A6%D7%A2%D7%95%D7%AA/?utm_source=google_ads&utm_medium=cpc&utm_campaign=%D7%A7%D7%9E%D7%A4%D7%99%D7%99%D7%9F%20%D7%A1%D7%A4%D7%90%20%D7%9E%D7%9E%D7%95%D7%A7%D7%93%2010%20%D7%A7%D7%9E&utm_content=%D7%A1%D7%A4%D7%90&AgId=%D7%A1%D7%A4%D7%90&content_site=&utm_ad=661319313766&utm_term=%D7%A1%D7%A4%D7%90&matchtype=b&device=c&GeoLoc=1007981&placement=&network=g&campaign_id=20256951578&adset_id=147306874942&ad_id=661319313766&gad_source=1&gclid=Cj0KCQjwvb-zBhCmARIsAAfUI2uIFUk7RsNThHWk19ZMh3B56YSC1E1YzFyfAyvrC852oebjewJz-FIaApCBEALw_wcB' },
  { id: 14, src: yoga , price: 250, link: 'https://www.physi-yoga.org/?gclid=Cj0KCQjwvb-zBhCmARIsAAfUI2talXTMNcQoPdLhgignz5PKWv0mLv80NkOFkPulETsRKw0rqalN3AYaAuqJEALw_wcB' },
  { id: 14, src: meditazia , price: 230, link: 'https://newmanvipassana.co.il/personalcourse/?gad_source=1&gclid=Cj0KCQjwvb-zBhCmARIsAAfUI2uJ_aUq08z7Zaa4A-Gi7SJsNE9zbXqrGXlgl0_a60pJgY-t6xCux94aAvL3EALw_wcB' },
  { id: 15, src: hotel , price: 400, link: 'https://www.fattalgifts.co.il/?utm_source=google-ads&utm_campaign&utm_agid=150645426479&utm_term=%D7%9E%D7%AA%D7%A0%D7%95%D7%AA&creative=665980449544&device=c&placement&gad_source=1&gclid=Cj0KCQjwvb-zBhCmARIsAAfUI2sRPnnT6JcWR4hEBDrJAmkR_e5kTJgulj5EHLVYGW_-bZMV5zsX5hkaAtVREALw_wcB' },

  { id: 1, src: nyx, price: 100, link: 'https://shop.sharespa.co.il/collections/spa/products/%D7%97%D7%91%D7%99%D7%9C%D7%95%D7%AA-%D7%A1%D7%A4%D7%90-%D7%91%D7%9E%D7%9C%D7%95%D7%9F-%D7%A0%D7%99%D7%A7%D7%A1-%D7%94%D7%A8%D7%A6%D7%9C%D7%99%D7%94?tw_source=google&tw_adid=684146416258&tw_campaign=19819624730&gad_source=1&gclid=CjwKCAjw9cCyBhBzEiwAJTUWNWvZD56gF0k9-tr9-CYYkVX2QvroA6uuuzcGNFatZdkaBPQAQXgotxoCSAwQAvD_BwE' },
  { id: 2, src: vip, price: 200, link: 'https://buyme.co.il/supplier/22546?gad_source=1&gclid=CjwKCAjw9cCyBhBzEiwAJTUWNacKmPMLAUTjrqak9HNikzMNZafdtyKyz8Xd_Awqqb0OtjBwOVgOZxoCo40QAvD_BwE' },

];

const gallery4Images = [
  { id: 16, src: lifestyle1 , price: 140, link: '' },
  { id: 17, src: lifestyle2 , price: 210, link: '' },
  { id: 18, src: lifestyle3 , price: 500, link: '' },
  { id: 19, src: lifestyle4 , price: 370, link: '' },
  
];

const Project = () => {
  const [maxPrice, setMaxPrice] = useState(500);

  const filterImagesByPrice = (images) => images.filter(image => image.price <= maxPrice);

  const iconStyle = {
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translateY(-70%)',
    color: '#FF902F', // צבע שחור לאייקון
   

  };
  const pinIconSize = 24;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handlePriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const galleries = [
    { id: 1, title: 'Food', images: filterImagesByPrice(gallery1Images) },
    { id: 2, title: 'Performances', images: filterImagesByPrice(gallery2Images) },
    { id: 3, title: 'Relxing gifts', images: filterImagesByPrice(gallery3Images) },
    { id: 4, title: 'Fashion and grooming', images: filterImagesByPrice(gallery4Images) },
  ];

  return (
    <div>
      <div className="page-wrapper" style={{ marginTop: '50px' }}>
        <div className="content container-fluid">
          {/* כותרת העמוד */}
          {/* <Breadcrumbs
            // maintitle="מתנה"
            title="לוח בקרה"
            subtitle="מתנה"
            modal="#create_project"
            name="צור פרויקט"
            Linkname="/projects"
            Linkname1="/project-list"
          /> */}

          <h1 style={{ direction: 'ltr', textAlign: 'left' }}>Nicole Miller birthday</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <ul style={{ fontSize: '17px', direction: 'ltr', textAlign: 'left', flex: '1' }}>
              <li><TiPin size={pinIconSize} /> She will turn 27 on her upcoming birthday</li>
              <br />
              <li><TiPin size={pinIconSize} /> She currently lives in Shoham</li>
              <br />
              <li><TiPin size={pinIconSize} /> Her main hobbies are yoga, watching movies and camping</li>
              <br />
              <li><TiPin size={pinIconSize} /> She is Allergic to gluten and eggs</li>
              <br />
              <li><TiPin size={pinIconSize} /> Likes to listen to the Beatles and Shlomo Artzi</li>
            </ul>
            <div style={{ flex: '0 0 150px', marginLeft: '20px' }}>
              <img src={nicole} alt="Nicole Miller" style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' ,marginRight:'80px' }} />
            </div>
          </div>

          <hr />
          {/* /כותרת העמוד */}
          <div style={{ marginTop: '50px' }}>
            <h1 style={{ textAlign: 'center' }}>Choose gift for Nicole</h1>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <label htmlFor="priceRange" style={{ display: 'block', marginBottom: '10px' }}>Select Amount ₪{maxPrice}</label>
              <input
                type="range"
                id="priceRange"
                name="priceRange"
                min="0"
                max="500"
                value={maxPrice}
                onChange={handlePriceChange}
                style={{ width: '50%' }}
              />
            </div>
            {galleries.map(gallery => (
              <div key={gallery.id} style={{ margin: '50px 0' }}>
                <h2 style={{ textAlign: 'center' }}>{gallery.title}</h2>
                <div style={{ margin: '0 auto', width: '80%' }}>
                  <Slider {...settings}>
                    {gallery.images.map(image => (
                      <div key={image.id} className="image-container">
                        <a href={image.link} target="_blank" rel="noopener noreferrer">
                          <img src={image.src} alt={`תמונה ${image.id}`} className="image" />
                        </a>
                        <p style={{ textAlign: 'center' }}>מחיר: ₪{image.price}</p>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .page-wrapper {
          padding: 20px;
        }

        .content {
          text-align: center;
        }

        h1 {
          font-size: 2em;
          margin-bottom: 20px;
        }

        h2 {
          font-size: 1.5em;
          margin-bottom: 20px;
        }

        input[type="range"] {
          appearance: none;
          width: 50%;
          height: 8px;
          background: #ddd;
          outline: none;
          opacity: 0.7;
          transition: opacity .2s;
        }

        input[type="range"]:hover {
          opacity: 1;
        }

        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 25px;
          height: 25px;
          background: #4CAF50;
          cursor: pointer;
          border-radius: 50%;
        }

        input[type="range"]::-moz-range-thumb {
          width: 25px;
          height: 25px;
          background: #4CAF50;
          cursor: pointer;
          border-radius: 50%;
        }

        .image-container {
          padding: 10px;
          width: 100%;
          box-sizing: border-box;
        }

        .image {
          width: 100%;
          height: 200px; /* Adjust the height as needed */
          object-fit: cover;
          border-radius: 8px;
          display: block;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default Project;
