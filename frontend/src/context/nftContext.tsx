import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContenxt";
import { INft } from "../types/NFT";
import { useNavigate, useParams } from "react-router";

interface NFTContextType {
    _id: string
    name: string;
    description: string;
    price: number;
    auctionEndTime: string;
    auctionCreate: boolean;
    image: string | File | null;
    updateNFT: (
        id: string,
        name: string,
        description: string,
        price: number,
        auctionEndTime: string,
        image: string | null,
    ) => Promise<void>;
    fetchGetNftData: (id: string) => Promise<void>
    fetchGetNftAuction: (id: string) => Promise<void>
    isOpenModalAuction: boolean;
    isOpenBidAuction: boolean;
    isOpenBuyModal: boolean
    setIsOpenModalAuction: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenBidAuction: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenBuyModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateNftContext = createContext<NFTContextType | null>(null);

export const UpdateNftProvider = ({ children }: { children: React.ReactNode }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [auctionEndTime, setAuctionEndTime] = useState("");
    const [image, setImage] = useState<File | string>("");
    const [itemId, setItemId] = useState("");
    const [auctionCreate, setAuctionCreated] = useState(false)
    const [isOpenModalAuction, setIsOpenModalAuction] = useState(false);
    const [isOpenBidAuction, setIsOpenBidAuction] = useState(false);
    const [isOpenBuyModal, setIsOpenBuyModal] = useState(false);
    const navigate = useNavigate();
    const { token } = useAuth();
    const { id } = useParams();

    const fetchGetNftData = async (id: string): Promise<void> => {

        if (!token) {
            alert("You have not token");
        }

        try {
            const response = await axios.get(`http://localhost:5555/api/v1/nfts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data.data;
            console.log(response.data)
            console.log(data)

            if (response.status === 200) {
                navigate(`/editNft/${id}`)
            }

            setName(data.name || "");
            setDescription(data.description || "");
            setPrice(data.price || 0);
            setAuctionEndTime(data.auctionEndTime || "");
            setImage(data.image || "");
        } catch (error) {
            console.error("Error fetching NFT data:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchGetNftData(id);
        }
    }, [token, id]);

    const updateNFT = async (
        id: string,
        name: string,
        description: string,
        price: number,
        auctionEndTime: string,
        image: string | null,
    ) => {
        if (!token || !id) {
            alert("error")
        }

        try {
            const response = await axios.put<INft>(
                `http://localhost:5555/api/v1/nfts/${id}`,
                {
                    name,
                    description,
                    price,
                    auctionEndTime,
                    image,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = response.data?.data;
            if (response.status === 200) {
                navigate("/profile")
            }
            console.log(response.data)
            console.log(data)
            setName(data?.name);
            setDescription(data?.description);
            setPrice(data?.price);
            setAuctionEndTime(data?.auctionEndTime);
            setImage(data?.image);
        } catch (error) {
            console.error("Error updating NFT:", error);
        }
    };

    const fetchGetNftAuction = async (id: string): Promise<void> => {
        if (!token) {
            alert("You have not token");
        }

        try {
            const response = await axios.get(`http://localhost:5555/api/v1/nfts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                setIsOpenModalAuction(true);
                setAuctionCreated(true)
            }
            const data = response.data.data;
            console.log(response.data)
            console.log(data)

            if (response.status === 200) {
                setIsOpenModalAuction(true)
            }

            setName(data.name || "");
            setDescription(data.description || "");
            setPrice(data.price || 0);
            setAuctionEndTime(data.auctionEndTime || "");
            setImage(data.image || "");
            setItemId(data._id || "")
        } catch (error) {
            console.error("Error fetching NFT data:", error);
        }
    };

    return (
        <UpdateNftContext.Provider
            value={{
                _id: itemId,
                name,
                description,
                price,
                auctionEndTime,
                image,
                updateNFT,
                fetchGetNftData,
                fetchGetNftAuction,
                isOpenModalAuction,
                setIsOpenModalAuction,
                auctionCreate,
                isOpenBidAuction,
                setIsOpenBidAuction,
                isOpenBuyModal,
                setIsOpenBuyModal
            }}
        >
            {children}
        </UpdateNftContext.Provider>
    );
};

export const useNft = () => {
    const context = useContext(UpdateNftContext);
    if (!context) throw new Error("useNft must be used within an UpdateNftProvider");
    return context;
};




