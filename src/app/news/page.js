"use client"

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getNewsList } from "../../redux/news/newsSlice";
import styles from './News.module.css'
import Loader from '../component/Loader';

const News = () => {
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((state) => state.news);

    useEffect(() => {
        dispatch(getNewsList());
    }, [dispatch]);

    return (
        <div>
            <h1> <strong> <center>Top Headlines</center></strong> </h1>
            {loading && <Loader />}
            {error && <p>{error}</p>}
            <div className={styles.newsWrapper}>
                {data?.articles.map((item, index) => {
                    return (
                        <div key={index} className={styles.cardNews} onClick={() => window.open(item.url, "_blank")} >
                            <img
                                src={item.urlToImage}
                                alt="news image"
                                className={styles.imgNews}
                            />
                            <h2 className={styles.txtTitle}><strong>{item.title}</strong></h2>
                            <h5 className={styles.txtAuthor}>{item.author || "Unknown"} - {new Intl.DateTimeFormat("id-ID", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            }).format(new Date(item?.publishedAt))}</h5>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default News