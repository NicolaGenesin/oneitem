const uploadImage = (image, storeId, id) => new Promise((resolve, reject) => {
  const uploadTask = storage
    .ref(`/${storeId}/${id}`)
    .child(`product_image_${uuidv4()}`)
    .putString(image.data_url.split(',')[1], 'base64', { contentType: 'image/jpg' });

  uploadTask.on('state_changed',
    () => {},
    (error) => {
      console.log(error);
      reject();
    }, async () => {
      const dataUrl = await uploadTask.snapshot.ref.getDownloadURL();

      fire.firestore()
        .collection('products')
        .doc(id)
        .update({ images: fire.firestore.FieldValue.arrayUnion({ data_url: dataUrl }) })
        .then(() => {
          console.log('Image Uploaded');
          resolve();
        })
        .catch((e) => {
          console.log(e);
          reject();
        });
    });
});

export const uploadImages = async (imagesToUpload, storeId, id) => {
  await Promise.all(
    imagesToUpload.map(async (image) => uploadImage(image, storeId, id)),
  );
};

export default { uploadImages };
