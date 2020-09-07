import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'antd';
import { useParams } from 'react-router-dom';
import CrudeArticle from '../CrudeArticle';

// const initialState = {
//     articledetail: {}
// }

// const reduce = (state, action) => {
//     switch (action.type) {
//         case 'OnSuccess':
//             return {
//                 articledetail: action.payload
//             }
//         case 'OnFailure':
//             return {
//                 articledetail: {}
//             }
//         default:
//             return state
//     }

// }

const ArticleDetailView = () => {
    // fetch api data using axios with async and await using hook
    // const [fdata, dispatch] = useReducer(reduce, initialState)
    // let detid = useParams()
    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:8000/api/${detid.detailid}/`)
    //         .then(response => {
    //             console.log(response.data)
    //             dispatch({ type: 'OnSuccess', payload: response.data })
    //         })
    //         .catch(error => {
    //             console.log('view detail error')
    //             dispatch({ type: 'OnFailure' })
    //         })
    // }, [detid.detailid])

    const [fdata, setData] = useState({ articledetail: {} });
    let detid = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({ ...fdata });
                const result = await axios(
                    `http://127.0.0.1:8000/api/${detid.detailid}/`,
                );

                setData({ articledetail: result.data });
            }
            catch (e) {
                console.log(e);
                setData({ articledetail: fdata.articledetail });
            }

        };

        fetchData();

    }, [detid.detailid]);

    // console.log(fdata.articledetail);

    //  deleting .....................
     const tailLayout = {
            wrapperCol: {
            offset: 4,
            span: 8,
            },
        };

    const Deleteitem=()=> {
        console.log('deleteing..');

         axios.delete( `http://127.0.0.1:8000/api/${detid.detailid}`).then(res => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
  
    return (
        <>
            <Card title={fdata.articledetail.title}>
                <p>{fdata.articledetail.content}</p>
            </Card>
            <br />
            <p>update</p>

            <CrudeArticle
                requestType='put'
                articleID={detid.detailid}
                btx='Update'
            />
            <Form
             onClick={Deleteitem}
              >
              <Form.Item {...tailLayout}>
               <Button type="danger" htmltype='submit'>
               Delete
               </Button>
              </Form.Item>
            </Form>

        </>

    );
}
export default ArticleDetailView;
