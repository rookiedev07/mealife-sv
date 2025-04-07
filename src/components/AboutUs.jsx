import React from "react";

const AboutUs = () => {
    return (
        <div className="container">

            <div className="text">
                <h1>Meet Our Passionate Team</h1>
                <p>Bringing Restaurants, Cafes & Hotels Closer – Faster, Smarter, Better!</p>
                <button>
                    Get in Touch<i className="fas fa-envelope"></i>
                </button>
            </div>
            <div className="founders">
                <div className="founder" id="founder1"><div className="role"><h1>Sameer Khan</h1><p>Founder</p></div></div>
                <div className="founder" id="founder2"><div className="role"><h1>Vishal Borana</h1><p>Co-Founder</p></div></div>
                <div className="founder" id="founder4"><div className="role"><h1>Pujan Suthar</h1><p>Co-Founder</p></div></div>
                <div className="founder" id="founder3"><div className="role"><h1>Mujahid Shaikh</h1><p>Co-Founder</p></div></div>
            </div>
            <div className="form">
                <form>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="fname">First Name:</label>
                            <input type="text" id="fname" name="fname" placeholder="Your name.."/>
                        </div>
                        <div className="col">
                            <label htmlFor="lname">Last Name:</label>
                            <input type="text" id="lname" name="lname" placeholder="Your last name.."/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" placeholder="Your email.."/>
                        </div>
                        <div className="col">
                            <label htmlFor="phone">Phone Number:</label>
                            <input type="tel" id="phone" name="phone" placeholder="Your phone number.."/>
                        </div>
                    </div>
                    <div className="row">
                        <div className ="col">
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" placeholder="Write your message.."></textarea>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default AboutUs;