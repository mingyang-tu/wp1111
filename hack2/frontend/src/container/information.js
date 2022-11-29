/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {

    const getTag = (tags) => {
        return (
            <>
                {/* TODO Part III-2-a render tags */}
                {
                    tags.map((item, idx) => {
                        return <div className='tag' key={idx}>{item}</div>
                    })
                }
            </>
        )
    }
    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <>
                {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
                <div className='tag'>{priceText}</div>
            </>
        )
    }

    const getBusiness = (time) => {
        const businessTime = [
            "Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"
        ];

        return (
            <div className='businessTime'>
                {/* TODO Part III-2-c: render business time for each day*/}
                {
                    businessTime.map((item, idx) => {
                        return <div className='singleDay' key={idx}>
                            <div className='day'>{item}</div>
                            <div className='time'>{(time.All) ? (time.All) : ((time[item]) ? time[item]: "Closed")}</div>
                        </div>
                    })
                }
            </div>
        )
    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information