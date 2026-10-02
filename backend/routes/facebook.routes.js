const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../config/db");

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI;
const FACEBOOK_API_VERSION = "v24.0";


// =====================================================
// 1. CONNECT FACEBOOK
// =====================================================

router.get("/connect", (req, res) => {
    const scopes = [
        "pages_show_list",
        "pages_read_engagement",
        "pages_manage_posts",
        "public_profile"
    ].join(",");

    const facebookLoginUrl =
        `https://www.facebook.com/${FACEBOOK_API_VERSION}/dialog/oauth` +
        `?client_id=${FACEBOOK_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(FACEBOOK_REDIRECT_URI)}` +
        `&scope=${scopes}`;

    res.redirect(facebookLoginUrl);
});


// =====================================================
// 2. FACEBOOK OAUTH CALLBACK
// =====================================================

router.get("/callback", async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({
            error: "Authorization code not received"
        });
    }

    try {

        // Exchange authorization code for User Access Token
        const tokenResponse = await axios.get(
            `https://graph.facebook.com/${FACEBOOK_API_VERSION}/oauth/access_token`,
            {
                params: {
                    client_id: process.env.FACEBOOK_APP_ID,
                    client_secret: process.env.FACEBOOK_APP_SECRET,
                    redirect_uri: FACEBOOK_REDIRECT_URI,
                    code
                }
            }
        );

        const userAccessToken = tokenResponse.data.access_token;


        // Get Facebook Pages managed by the user
        const pagesResponse = await axios.get(
            `https://graph.facebook.com/${FACEBOOK_API_VERSION}/me/accounts`,
            {
                params: {
                    access_token: userAccessToken,
                    fields: "id,name,access_token"
                }
            }
        );

        const pages = pagesResponse.data.data || [];


        // Save Pages to MySQL
        for (const page of pages) {

            await db.execute(
                `INSERT INTO social_accounts
                (platform, platform_account_id, account_name, access_token)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    account_name = VALUES(account_name),
                    access_token = VALUES(access_token)`,
                [
                    "facebook",
                    page.id,
                    page.name,
                    page.access_token
                ]
            );
        }


        // Send safe Page information to React
        const pagesData = encodeURIComponent(
            JSON.stringify(
                pages.map(page => ({
                    id: page.id,
                    name: page.name
                }))
            )
        );


        // Redirect user back to React
        res.redirect(
            `${process.env.FRONTEND_URL}/facebook/callback?pages=${pagesData}`
        );

    } catch (error) {

        console.error(
            "Facebook API error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            error: "Facebook API request failed",
            details: error.response?.data || error.message
        });
    }
});


// =====================================================
// 3. PUBLISH POST TO FACEBOOK PAGE
// =====================================================

router.post("/post", async (req, res) => {

    const { pageId, message } = req.body;

    if (!pageId || !message) {
        return res.status(400).json({
            error: "pageId and message are required"
        });
    }

    try {

        // Get Page Access Token from MySQL
        const [rows] = await db.execute(
            `SELECT access_token
             FROM social_accounts
             WHERE platform = 'facebook'
             AND platform_account_id = ?`,
            [pageId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                error: "Facebook Page not found"
            });
        }

        const pageAccessToken = rows[0].access_token;


        // Publish post to Facebook Page
        const response = await axios.post(
            `https://graph.facebook.com/${FACEBOOK_API_VERSION}/${pageId}/feed`,
            null,
            {
                params: {
                    message,
                    access_token: pageAccessToken
                }
            }
        );


        // Return Facebook Post ID
        res.json({
            message: "Post published successfully",
            postId: response.data.id
        });

    } catch (error) {

        console.error(
            "Facebook posting error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            error: "Failed to publish post",
            details: error.response?.data || error.message
        });
    }
});


module.exports = router;