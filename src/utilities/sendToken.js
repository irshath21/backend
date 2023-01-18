
// creating a token and saving in a cookie

const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken()

    // options for cookie

    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24*60*60*1000
            // Date.now() is present day + 5 *24 *60*60*1000
            // converting into the milliseconds for the date
        ),
        domain:"https://full-stack-e-commerce-webiste.vercel.app/",
        path: '/',
        httpOnly: true,
        secure: env.ENVIRONMENT === 'LIVE',
        sameSite: env.ENVIRONMENT === 'LIVE' ? 'none' : 'lax'
        
    }

    res.status(statusCode).cookie("token", token, options).json({
        success:true,
        user,
        token,
        options
    })

}

module.exports = sendToken;