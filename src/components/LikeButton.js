import React, { useEffect, useState } from 'react'
import {gql, useMutation} from "@apollo/client" 

function LikeButton({user, post: {id, likesCount, likes}}) {

    const [liked, setLiked] = useState(false);
    useEffect(()=>{
        if(user && likes.find(like=>like.username === user.username)){
            setLiked(true);
        } else setLiked(false)
    },[user, likes])

    const handleLikePost = () => {
        setLiked(!liked);
        likePost();
    }

    const [likePost] = useMutation(LIKE_POST_MUTATION,{
        variables: {postId: id}
    })

    return (
        <div className="bottom_button like" >
            {!liked ? <svg onClick={handleLikePost} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.0002 5.2672C13.7602 3.2072 17.0202 2.3672 19.6602 4.1672C21.0602 5.1272 21.9402 6.7472 22.0002 8.4472C22.1302 12.3272 18.7002 15.4372 13.4502 20.1972L13.3402 20.2972C12.5802 20.9972 11.4102 20.9972 10.6502 20.3072L10.5502 20.2172L10.4898 20.1623C5.27384 15.4233 1.86075 12.3223 2.00021 8.4572C2.06021 6.7472 2.94021 5.1272 4.34021 4.1672C6.98021 2.3572 10.2402 3.2072 12.0002 5.2672ZM12.0002 18.8272L12.1002 18.7272C16.8602 14.4172 20.0002 11.5672 20.0002 8.6772C20.0002 6.6772 18.5002 5.1772 16.5002 5.1772C14.9602 5.1772 13.4602 6.1672 12.9402 7.5372H11.0702C10.5402 6.1672 9.04021 5.1772 7.50021 5.1772C5.50021 5.1772 4.00021 6.6772 4.00021 8.6772C4.00021 11.5672 7.14021 14.4172 11.9002 18.7272L12.0002 18.8272Z" fill="#4F4F4F"/>
            </svg>:
            <svg onClick={handleLikePost} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3497 20.3072C12.5897 20.9972 11.4197 20.9972 10.6597 20.2972L10.5497 20.1972C5.29966 15.4472 1.86966 12.3372 1.99966 8.4572C2.05966 6.7572 2.92966 5.1272 4.33966 4.1672C6.97966 2.3672 10.2397 3.2072 11.9997 5.2672C13.7597 3.2072 17.0197 2.3572 19.6597 4.1672C21.0697 5.1272 21.9397 6.7572 21.9997 8.4572C22.1397 12.3372 18.6997 15.4472 13.4497 20.2172L13.3497 20.3072Z" fill="#FF5151"/>
            </svg>}
            <p>{likesCount}</p>
        </div>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likesCount
        }
    }
`

export default LikeButton
