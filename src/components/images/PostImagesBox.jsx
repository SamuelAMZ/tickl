import React, { useState, useEffect, useRef } from "react";

const PostImagesBox = ({ images }) => {
  const [imagesInDom, setImagesInDom] = useState(false);
  const postImagesWrapper = useRef();

  const determinClass = () => {
    if (images && imagesInDom) {
      if (images.length === 1) {
        // span the first image
        const image1 = Array.from(postImagesWrapper.current.children)[0];
        image1.classList.remove("span-one");
        return "one-image";
      }
      if (images.length === 2 || images.length === 4) {
        // span the first image
        const image1 = Array.from(postImagesWrapper.current.children)[0];
        image1.classList.remove("span-one");
        return "two-multi-images";
      }
      if (images.length === 3) {
        // span the first image
        const image1 = Array.from(postImagesWrapper.current.children)[0];
        image1.classList.add("span-one");

        return "two-multi-images";
      }
    }
  };

  //   determin if images are present in dom or not
  useEffect(() => {
    const imagesPresentInDom = document.querySelectorAll(
      "#post-images-uploaded"
    );
    if (imagesPresentInDom.length >= 1) {
      setImagesInDom(true);
    }
    if (imagesPresentInDom.length === 0) {
      setImagesInDom(false);
    }
  }, [images]);

  return (
    <div
      ref={postImagesWrapper}
      id="post-images-box-container"
      className={determinClass()}
    >
      {images &&
        images.map((img, idx) => {
          return (
            <div key={idx} className="single-post-image-uploaded">
              <img id="post-images-uploaded" src={img} />
            </div>
          );
        })}
    </div>
  );
};

export default PostImagesBox;
