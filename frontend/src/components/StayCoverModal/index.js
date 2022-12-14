import React from "react"



import './stayCover.css'



const StayCover = ({ setShowStayCover }) => {

    return (
        <div className="stay-cover-modal-container">
            <div className="stay-cover-close-container">
                <div className="stay-cover-close-bttn" onClick={() => setShowStayCover(false)}>X</div>
            </div>
            <div className="stay-cover-header-conatiner">
                <div className='stay-cover-title'>
                    <div style={{ color: '#fd5a5f' }}>stay</div><div>cover</div>
                </div>
                <div>StayCover is comprehensive protection included for free with every booking.</div>
            </div>
            <div className="stay-cover-bottom-container">
                <div className="stay-cover-left">
                    <div className="stay-cover-protection-container">
                        <div className="stay-cover-sub-title">Booking Protection Guarantee</div>
                        <div className="stay-cover-modal-description">In the unlikely event a Host needs to cancel your booking within 30 days of check-in, we’ll find you a similar or better home, or we’ll refund you.</div>
                    </div>
                    <div className="stay-cover-protection-container">
                        <div className="stay-cover-sub-title">Get-What-You-Booked Guarantee</div>
                        <div className="stay-cover-modal-description">If at any time during your stay you find your listing isn't as advertised—for example, the refrigerator stops working and your Host can’t easily fix it, or it has fewer bedrooms than listed—you'll have three days to report it and we’ll find you a similar or better home, or we’ll refund you.</div>
                    </div>
                </div>
                <div className="stay-cover-right">
                    <div className="stay-cover-protection-container">
                        <div className="stay-cover-sub-title">Check-In Guarantee</div>
                        <div className="stay-cover-modal-description">If you can’t check into your home and the Host cannot resolve the issue, we’ll find you a similar or better home for the length of your original stay, or we’ll refund you.</div>
                    </div>
                    <div className="stay-cover-protection-container">
                        <div className="stay-cover-sub-title">24-hour Safety Line</div>
                        <div className="stay-cover-modal-description">If you ever feel unsafe, you’ll get priority access to specially-trained safety agents, day or night.</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default StayCover
