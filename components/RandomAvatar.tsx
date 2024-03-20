import Avatar from 'boring-avatars'
import React from 'react'

function RandomAvatar() {
    return (
        <Avatar
            size={40}
            name={Math.random().toString()}
            variant="marble"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
    )
}

export default RandomAvatar