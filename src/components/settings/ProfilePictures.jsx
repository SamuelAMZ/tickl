import React from "react";

const ProfilePictures = () => {
  return (
    <div className="_settings-profil-pictures">
      {/* main image */}
      <div className="main-picture">
        <p>Main Image</p>
        <div
          className="item"
          style={{ backgroundImage: "url(/img/random1.jpg)" }}
        ></div>
        <div className="actions">
          <form>
            <label htmlFor="main-picture">Change</label>
            <input
              id="main-picture"
              style={{ visibility: "hidden" }}
              type="file"
            />
          </form>
          <button>Remove</button>
        </div>
      </div>

      {/* background image */}
      <div className="back-picture">
        <p>Background Image</p>
        <div
          className="item"
          style={{ backgroundImage: "url(/img/random.jpg)" }}
        ></div>
        <div className="actions">
          <form>
            <label htmlFor="back-picture">Change</label>
            <input
              id="back-picture"
              style={{ visibility: "hidden" }}
              type="file"
            />
          </form>
          <button>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictures;
