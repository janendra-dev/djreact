import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Articlelist from '../Articlelist';
import CrudeArticle from "../CrudeArticle";


// const initialState = {
//     articles: []
// }

// const reduce = (state, action) => {
//     switch (action.type) {
//         case 'OnSuccess':
//             return {
//                 articles: action.payload
//             }
//         case 'OnFailure':
//             return {
//                 articles: []
//             }
//         default:
//             return state
//     }

// }

const ArticleListView = () => {
    // fetch api data using axios with async and await using hook
    // const [fdata, dispatch] = useReducer(reduce, initialState)

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/api/')
    //         .then(response => {
    //             console.log(response.data)
    //             dispatch({ type: 'OnSuccess', payload: response.data })
    //         })
    //         .catch(error => {
    //             dispatch({ type: 'OnFailure' })
    //         })
    // }, [fdata])
    const [fdata, setData] = useState({ articles: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({ ...fdata });
                const result = await axios(
                    'http://127.0.0.1:8000/api/',
                );

                setData({ articles: result.data });
            }
            catch (e) {
                console.log(e);
                setData({ articles: fdata.articles });
            }

        };

        fetchData();

    }, []);

    console.log(fdata.articles);
    return (
        <>
            <Articlelist data={fdata.articles} />
            <br />
            <p>create article</p>
            <CrudeArticle
                requestType='post'
                articleID='null'
                btx='Create' />
        </>
    );
}
export default ArticleListView;
