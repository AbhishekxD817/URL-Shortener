import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RedirectPage() {
    const navigate = useNavigate();
    const { shortenUrl } = useParams();
    const [destinationUrl, setDestinationUrl] = useState(null);

    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get(`http://localhost:9999/url/${shortenUrl}`, { withCredentials: true });
                if (response.status === 200) {
                    setDestinationUrl(response.data.url.destinationUrl);
                } else {
                    navigate('/');
                    console.log(response.data.message);
                }
            } catch (error) {
                console.error(error);
                navigate("/");
            }
        })();
    }, [navigate, shortenUrl]);

    useEffect(() => {
        if (destinationUrl) {
            window.location.href = destinationUrl; // or navigate(destinationUrl) for internal routes
        }
    }, [destinationUrl]);

    return null; 
}
