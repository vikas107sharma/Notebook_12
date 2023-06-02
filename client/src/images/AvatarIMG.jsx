import "./avatar.css";

const AvatarIMG = (avatar, setAvatar) => {

  const handleclick=(e)=>{
    console.log(e)
    console.log(e.target.currentSrc)
    setAvatar(e.target.currentSrc)
  }

  return (

    <div className="avatar_box">
      <img
        src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png"
        alt="avatar"
        onClick={handleclick}
      />

      <img
        src="https://www.kindpng.com/picc/m/78-787033_avatars-clipart-generic-user-woman-people-icon-hd.png"
        alt="avatar"
        onClick={handleclick}
      />
      <img
        src="https://www.kindpng.com/picc/m/630-6306130_avatar-avatar-male-user-icon-hd-png-download.png"
        alt="avatar"
        onClick={handleclick}
      />
      <img
        src="https://www.kindpng.com/picc/m/78-786605_person-icon-transparent-background-hd-png-download.png"
        alt="avatar"
        onClick={handleclick}
      />
      <img
        src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
        alt="avatar"
        onClick={handleclick}
      />
      <img
        src="https://www.kindpng.com/picc/m/664-6643641_avatar-transparent-background-user-icon-hd-png-download.png"
        alt="avatar"
        onClick={handleclick}
      />
      <img
        src="https://www.kindpng.com/picc/m/124-1247870_black-hair-girl-happiness-female-avatar-icon-png.png"
        alt="avatar"
        onClick={handleclick}
      />

      <img
        src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png"
        alt="avatar"
        onClick={handleclick}
      />

      <img
        src="https://www.kindpng.com/picc/m/78-787127_transparent-talking-to-someone-clipart-material-design-avatar.png"
        alt="avatar"
        onClick={handleclick}
      />
    </div>
  );
};

export default AvatarIMG;
