import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// Lib
import ShortCuts from "../lib/shortcut";
// Styles
import { MdOutlineNavigateNext } from 'react-icons/md'
import styles from "../styles/Search.module.scss"

const SearchComponent = () => {
    const [items, setitems] = useState(null);
    const queryField = useRef(null);

    const router = useRouter();

    const search = async (query: string) => {
        if (query.length < 3 || query === null) {
            setitems(null);
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/search/${query}`);
        const { tracks } = await res.json();
        setitems(tracks.tracks.items);
    }

    const onEnter = (e) => {
        if (items !== null && e.key === "Enter") {
            redirect(items[0].id);
        }
    }

    const redirect = (id) => router.push(`/song/${id}`);

    const shortcuts = ["b"];

    ShortCuts(shortcuts);

    return (
        <div className={styles.searcher}>
            <input
                type="text"
                name="buscar"
                id="buscar"
                placeholder="Search something"
                onChange={(e) => search(e.target.value)}
                onKeyPress={(e) => onEnter(e)}
                autoComplete="off"
                ref={queryField} />

            <div className={styles.result_component}>
                {
                    items === null ? null :
                        items.map((item: any, index: number) => (
                            <div className={styles.result_info} key={index}>
                                <img src={item.album.images[2].url} alt="thumbnail product" />
                                <div className={styles.info}>
                                    <h3>{item.name}</h3>
                                    <span><b>{item.artists[0].name}</b></span>
                                </div>
                                <Link href={"/song/" + item.id}>
                                    <a className={styles.watch_icon} onClick={() => (queryField.current.value = "", setitems(null))}>
                                        <MdOutlineNavigateNext />
                                    </a>
                                </Link>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default SearchComponent;
