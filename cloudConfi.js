
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');


cloudinary.config({
    cloud_name:process.env.Cloud_name,
    api_key:process.env.API_Key,
    api_secret:process.env.API_Secret
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wonderLust',
    alloworderformet:["png","jpg","jpeg"]
  },
});

module.exports  = {
    cloudinary,
    storage
}