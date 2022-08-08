import { useState, useEffect } from "react"
import Link from "next/link"
// Components
import Layout from "../../components/layout"
import SliderComponent from "../../components/slider"
// None static
import Head from "next/head"
import { useRouter } from "next/router";
// Styles
import { BsChevronLeft } from "react-icons/bs"
// REDUX
import { saveItems } from "../../store/actions/listItems"
import { useDispatch, useSelector } from "react-redux"
import { AuthAction, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function IdSong() {
    const router = useRouter();
    const { id } = router.query;

    const [showSlider, setShowSlider] = useState(false);
    const [Song, setSong] = useState<any>(undefined);
    const [AlreadyOnCollection, setAlreadyOnCollection] = useState(false);

    const dispatch = useDispatch();

    const items = useSelector((state: any) => state.list);
    const collections = useSelector((state: any) => state.collections);

    const getSongByIdL = async (_id): Promise<void> => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/songById/${_id}`, {
            method: 'GET'
        });
        const trackResponse = await res.json();
        if (trackResponse.tracks.error !== undefined) {
            redirect();
            return;
        }
        setSong(trackResponse.tracks);
        console.log(trackResponse.tracks)
    }

    const redirect = () => router.push("/");

    useEffect(() => {
        if (!id) return;
        if (collections.length > 0) {
            const idsBought = collections.split(",");
            idsBought.forEach((idInternal) => {
                if(idInternal === id) {
                    setAlreadyOnCollection(true);
                }
            })
        }
        getSongByIdL(id);
    }, [id])

    const showSlide = (hidSho) => (setShowSlider(hidSho));

    const saveItem = (id: string, nombre: string, imgUri: string, price: string): void => {
        let trackAlreadyOnList: boolean = false;
        const data = {
            id: id,
            name: nombre,
            img: imgUri,
            price: price
        }
        items.forEach((item: any) => {
            if (item.name === nombre) {
                trackAlreadyOnList = true;
            }
        });
        if (trackAlreadyOnList) return;
        trackAlreadyOnList = false;
        dispatch(saveItems(data));
        toast.success("Added", {
            theme: "dark",
            position: 'bottom-right'
          })
    }

    if (!Song) return <h1>Redirecting...</h1>;

    return <>
        <Head>
            <title>TuneCloud | {Song.name}</title>
            <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            {
                showSlider
                    ? <div className="wrapper_layer" aria-label="hidden" onClick={() => showSlide(false)}></div>
                    : null
            }
            <div className="content_index">
                <Link href="/"><a className="icon_back"><BsChevronLeft /> Go back</a></Link>
                <SliderComponent Static={false} showSlide={showSlide} data={Song} />
                <div className="info_product">
                    <span>{Song.artists[0].name || Song}</span>
                    <h1>{Song.name}</h1>
                    <p><b>Album: </b> {Song.album.name}</p>
                    <p><b>Duration: </b>{((Song.duration_ms / 1000) / 60).toFixed()} minutos</p>
                    <p><b>Release Date:</b> {Song.album.release_date.split("-")[0]}</p>
                    <div className="price_product">
                        <h2>${parseInt(localStorage.getItem("price"))} <span className="discount">50%</span></h2>
                        <h3>${parseInt(localStorage.getItem("price")) * 2} </h3>
                    </div>
                    <div className="price_changed">
                        {
                            !AlreadyOnCollection
                                ? <button onClick={() => saveItem(Song.id, Song.name, Song.album.images[1].url, localStorage.getItem("price"))}>
                                   Add to Cart
                                </button>
                                : <button onClick={() => showSlide(true)}>You already have this track</button>
                        }
                    </div>
                </div>
                {showSlider
                    ? <SliderComponent Static={true} showSlide={showSlide} data={Song} />
                    : null}
            </div>
        </Layout>
    </>
}

export const getServerSideProps = withAuthUserTokenSSR({
    whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})((): any => {
    return {
        props: {}
    }
})

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(IdSong)
