
CREATE OR REPLACE PACKAGE edec_media IS

PROCEDURE populate ;

END edec_media;
/

CREATE OR REPLACE PACKAGE BODY edec_media IS

PROCEDURE insert_media (v_url IN media.url%TYPE,v_json IN MEDIA.FILE_JSON%TYPE) IS
BEGIN
  INSERT INTO media(url,FILE_JSON) VALUES (v_url,v_json);
END insert_media; 

PROCEDURE populate IS
BEGIN
  insert_media('http://www.realgoods.ch/pictures_products/02-040.jpg','01');
  insert_media('http://www.danone.ro/wp-content/uploads/2014/03/activia4.jpg','02');
  insert_media('http://ecx.images-amazon.com/images/I/41O3QMq%2B31L.jpg','03');
  insert_media('http://www.chocolate-brands.com/image/cache/data/Milka/Milka-chocolates/milka-yoghurt-chocolate-bar-100g-500x500.png','04');
  insert_media('http://ecx.images-amazon.com/images/I/41SyquzsESL._SY300_.jpg','05');
  insert_media('http://magazinalimentaronline.ro/image/cache/data/Imagini%20produse%20bune/delicatese/Biscuiti%20Oreo%2066%20gr-500x500.jpg','06');
  insert_media('http://www.shopnaturally.com.au/images/P/nakula-coconut-cream.jpg','07');
  insert_media('http://www.shopnaturally.com.au/images/P/dr-superfoods-super-raspberries-01.jpg','08');
  insert_media('http://www.eastendfoods.co.uk/assets/Uploads/products_photos/_resampled/resizedimage300300-Ginger-1.jpeg','09');
  insert_media('http://www.needlesports.com/imagecache/2bc73150-344c-4a8a-b7e9-9e5b00f700cf_720x720.jpg','10');
  insert_media('https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xft1/v/t1.0-9/p526x296/10559814_430017620499821_','11');
  insert_media('https://scontent-fra.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10393885_846123735406859_5951780144140279786_n.jpg?oh','12');
  insert_media('https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11146289_916495305067208_4078020279216839614_n.j','13');
  insert_media('http://tux.crystalxp.net/png/dreicoz-tux-archlinux-22357.png','14');
  insert_media('https://jamfnation.jamfsoftware.com/img/default-avatars/generic-user.png','15');
END populate;

END edec_media;
/

BEGIN
  edec_media.populate;
END;
