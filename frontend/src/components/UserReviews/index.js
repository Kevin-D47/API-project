// import { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'

// import { getAllUserReviewsThunk } from '../../store/reviews'

// import { NavLink } from 'react-router-dom'
// import { Modal } from '../../context/Modal'


// const UserReviewsPage = () => {

//     const dispatch = useDispatch();

//     const sessionUser = useSelector(state => state.session.user)

//     const allReviews = useSelector(state => state.reviews)
//     let allReviewArr = Object.values(allReviews)

//     let allUserReviewsArr = allReviewArr.flat()

//     useEffect(() => {
//         dispatch(getAllUserReviewsThunk());
//     }, [dispatch])



//     console.log(allUserReviewsArr)


//     return (
//         <div>
//             <div>My Reviews</div>
//             <div className='user-spots-container'>
//                 {allUserReviewsArr.map((review) => {
//                     <div>{review.stars}</div>
//                 })}

//             </div>
//         </div>

//     )
// }

// export default UserReviewsPage
