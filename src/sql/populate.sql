BEGIN

  edec_caracteristici_package.populate;
  edec_media_package.populateMedia;
  edec_users_package.populateUsers;
  edec_produse_package.populateProduse;
  edec_produse_package.generateCaracteristics(4);

END;
END;