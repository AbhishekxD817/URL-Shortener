import Url from "../models/url-model.js";


export const createNewShortenUrl = async (req, res, next) => {
    try {
        let { destinationUrl } = req.body;
        let urlExists = await Url.findOne({ destinationUrl });
        console.log(urlExists)
        if (urlExists) {
            return res.json({
                url: urlExists
            })
        }
        let shortenUrl = Date.now();
        let newUrl = await Url({
            shortenUrl: shortenUrl,
            destinationUrl
        })
        console.log(newUrl)

        await newUrl.save();
        return res.json({
            url: newUrl
        })
    } catch (error) {
        const { message = "Internal Error while creating new shorten Url" } = error;
        return res.status(500).json({
            message
        })
    }
}

export const getDestinationUrl = async (req, res, next) => {
    try {
        let { shortenUrl } = req.params;
        let url = await Url.findOne({ shortenUrl });
        console.log(url)
        if (!url) {
            return res.json({
                message: "Url not found OR Invalid Url"
            })
        } else {
            return res.json({
                url: url
            })
        }

    } catch (error) {
        let { message = "Internal Server error while getting destination Url" } = error;
        return res.status(500).json({
            message
        })
    }
}