import { useState, useEffect } from "react";
import axios from 'axios'; 
import { useHistory } from "react-router-dom";
require('dotenv').config(); 

const SERVERURL = process.env.REACT_APP_SERVERURL;
console.log(SERVERURL);

export const useGetNextNewsByUserID = (userId, batchSn) => {
    const [newsItem, setNewsItem] = useState(null);
    const [nextSerialNumber, setNextSerialNumber] = useState(null);
    const [newsId, setNewsId] = useState(null);
    const [totalItems, setTotalItems] = useState(null);
    const [newsLoading, setNewsLoading] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            await axios.get(`${SERVERURL}/api/getnews/${userId}/${batchSn}`)
                .then(res => {
                    const data = res.data;
                    setNewsItem(data.content);
                    setNextSerialNumber(data.NextSerialNumber);
                    setNewsId(data.NewsID);
                    setTotalItems(data.TotalNewsItemsForUser);
                    setNewsLoading(false);
                });
        }, 500)
    }, [userId, batchSn]);

    return { newsItem, nextSerialNumber, newsId, totalItems, newsLoading };
};

export const useSetNewsItemProperties = (userId, newsId, newsLabels) => {
    const [newsIdEcho, setNewsId] = useState(null);
    useEffect(() => {
        if (newsId !== null) {
            axios.get(`${SERVERURL}/api/addlabel/${userId}/${newsId}/${newsLabels.type}/${newsLabels.category}/${newsLabels.sentiment}`)
                .then(res => {
                    const data = res.data;
                    setNewsId(data.NewsID)
                })           
        }
    }, [newsLabels]);

    return { newsIdEcho };
}

export const useAuthenticateUser = (creds) => {
    const history = useHistory();
    useEffect(() => {
        if (creds !== null) {
            axios.get(`${SERVERURL}/api/auth/${creds.userId}/${creds.password}`)
                .then(res => {
                    let data = res.data;
                    if (data.userID !== undefined && data.userID !== "") {
                        sessionStorage.setItem('userId', data.userID);
                        history.push('/label-form');
                    }
                    else{
                        return false;
                    }
                })  
        }
    }, [creds,history]);
    return true;
}


