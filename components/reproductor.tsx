import React, { useRef } from "react"

const PlayerComponent = ({ timelineValue, data }) => {
    let Play: boolean = false;

    const player = useRef(null);
    const timeline = useRef(null);

    const playSong = () => {
        Play = !Play;
        if (Play) {
            player.current.play();
        } else {
            player.current.pause();
        }
    }

    function changeTimelinePosition(onPauseState: any) {
        if (onPauseState !== null) {
            timeline.current.style.backgroundSize = `${onPauseState}% 100%`;
            return;
        }
        const percentagePosition = (100 * player.current.currentTime) / player.current.duration;
        timeline.current.style.backgroundSize = `${timelineValue}% 100%`;
        timelineValue = percentagePosition;
        timeline.current.value = timelineValue;
    }

    return <>
        <audio
            src={data.preview_url}
            ref={player}
            onTimeUpdate={() => changeTimelinePosition(null)}
            onPause={() => changeTimelinePosition(timeline.current.value)}
            controls={false}>
        </audio>
        <div className="controls">
            <button className="player-button" onClick={() => playSong()}>
                {Play ? "Pause" : "Play"}
            </button>
            <input
                type="range"
                className="timeline"
                max="100"
                ref={timeline}
            />
        </div>
    </>
}

export default PlayerComponent