import React from 'react'
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

const EmojiPicker = (props) => {
    return (
        <Picker
        disableSearchBar={false}
            onEmojiClick={props.onEmojiClick}
            disableAutoFocus={true}
            skinTone={SKIN_TONE_MEDIUM_DARK}
            groupNames={{ smileys_people: "PEOPLE" }}
        />
    )
}

export default EmojiPicker
