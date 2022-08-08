// Styles
import styles from "../styles/Slider.module.scss"
import { GrClose } from "react-icons/gr"
// Components
import PlayerComponent from './reproductor'

const SliderComponent = ({ Static, showSlide, data }) => {

    let timelineValue = 0;

    return (
        <div className={!Static ? styles.slider_product : styles.slider_product_static}>
            {
                !Static ? null :
                    <div
                        className={styles.close_icon}>
                        <GrClose className={styles.icon} onClick={() => showSlide(false, 0)} />
                    </div>
            }
            <div className={styles.current_img}>
                {!Static
                    ? <img src={data.album.images[0].url} alt="" onClick={() => showSlide(true, 0)} />
                    : <>

                        <div className="audio-player">
                            <div className="icon-container">
                                <img src={data.album.images[0].url} alt="" />
                            </div>
                            {
                                !data.preview_url
                                    ? <span className={styles.badge}>No preview available</span>
                                    : <PlayerComponent timelineValue={timelineValue} data={data} />
                            }
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default SliderComponent