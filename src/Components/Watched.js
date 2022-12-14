import axios from 'axios';
import React, { useEffect, useState } from 'react';




export default function Watched(props) {
    const { navigate, token, SingleCard, isLoggedIn, username } = props
    const [error, setError] = useState(null)
    const [alreadyWatched, setAlreadyWatched] = useState(false)

    useEffect(() => {
        axios.get('https://onmywatch.herokuapp.com/api/watchedlist/',
            {
                headers: {
                    Authorization: `Token ${token}`,
                }
            })
            .then(res => {
                console.log('*****')
                console.log(res.data)
                console.log('*****')
                setAlreadyWatched(res.data.reverse())
            })
    }, [])


    return (
        <>
            <p style={{ marginLeft: '20px', textAlign: "left", fontSize: 30, fontStyle: 'italic', color: "#293e8a", }}>Shows I've "Scene"</p>

            <div className='watched-background'>
                {/* <h1 style={{ textAlign: "center", fontSize: 50, marginTop: 0 }}>I've already watched these fantastic shows:</h1> */}
                <div className='watchlist-cards'>
                    {!alreadyWatched &&
                        <img src="/loadingAnimation.gif"
                            className="checkGif"
                            alt="gifImage"
                            height="200"
                            style={{ paddingRight: 200, marginTop: 100 }}>
                        </img>}
                    {alreadyWatched && alreadyWatched.map((cardObject, index) => {
                        return (
                            <SingleCard
                                cardObject={cardObject}
                                key={index}
                                id={cardObject.id}
                                isLoggedIn={isLoggedIn}
                                token={token}
                                username={username}
                                navigate={navigate}
                            />
                        )
                    }
                    )}
                </div>
            </div>
        </>
    )

}