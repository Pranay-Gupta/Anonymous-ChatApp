import React, { useState } from "react";
import Picker from "emoji-picker-react";

const EmojiSelector = ({ message, setMessage }) => {
  const onEmojiClick = (event, emojiObject) => {
    // setChosenEmoji(emojiObject);

    setMessage(message + emojiObject.emoji);
  };

  return (
    <div>
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
};

export default EmojiSelector;
