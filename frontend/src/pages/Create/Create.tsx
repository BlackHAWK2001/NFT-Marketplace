import s from './Create.module.scss';
// import fileUploadIcon from '../../assets/upload field.png';
import plusIcon from '../../assets/plusIcon.svg';
import nft from "../../assets/MultipleNft.png"
import removeIcon from '../../assets/removeIcon.png'
import axios, { AxiosError } from 'axios'
import { useState } from 'react';
import { useAuth } from '../../context/authContenxt';
import { IAddNft } from '../../types/NftType';
import { useNavigate } from 'react-router';
// import { usePostAddNftMutation } from '../../store/api/AddNfts';






const Create = () => {
    const { token } = useAuth(); // Get token from context
    const [isChecked, setIsChecked] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate();
    const [data, setData] = useState<IAddNft>({
        name: "",
        description: "",
        price: 0,
        auctionEndTime: null, // 
        collection: "",
    });


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "auctionEndTime") {
            const localDate = new Date(value);  
            const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));  
            setData((prevData) => ({
                ...prevData,
                auctionEndTime: utcDate,  
            }));
        } else {
            setData((prevData) => ({ ...prevData, [name]: value }));
        }
    };




    const handleCheckeCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const handleCollectionSelect = (collectionName: string) => {
        setData((prevData) => ({
            ...prevData,
            collection: collectionName,
        }));
    };

  
   


    
    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
      
       
        if (!data.name || !data.description || !data.price || !data.auctionEndTime) {
          alert("Please fill in all fields!");
          return;
        }
      
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No token found! You need to be logged in.");
          return;
        }
      
        const sendPayload = async (payload: any) => {
          try {
            const response = await axios.post(
              "http://localhost:5555/api/v1/nfts",
              payload,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log("Data sent successfully:", response.data);
            if (response.status === 201) {
            
              setImage(null);
              setData({
                name: "",
                description: "",
                price: 0,
                auctionEndTime: new Date(), 
                collection: "",
              });
              navigate("/");
            }
          } catch (e: unknown) {
            if (e instanceof AxiosError) {
              console.error(
                "Error sending data:",
                e.response ? e.response.data : e.message
              );
            } else {
              console.error("Unknown error:", e);
            }
            alert("There was an error sending your data.");
          }
        };
   
        if (image) {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onloadend = async () => {
            const base64Image = reader.result as string;
          
            const payload: any = {
              name: data.name,
              description: data.description,
              price: data.price,
              auctionEndTime: (data.auctionEndTime instanceof Date
                ? data.auctionEndTime
                : new Date(data.auctionEndTime!)
              ).toISOString(),
              image: base64Image,
            };
            
            if (data.collection && data.collection !== "Create collection") {
              payload.collection = data.collection;
            }
            console.log("Payload:", payload);
            await sendPayload(payload);
          };
        } else {
          
          const payload: any = {
            name: data.name,
            description: data.description,
            price: data.price,
            auctionEndTime: (data.auctionEndTime instanceof Date
              ? data.auctionEndTime
              : new Date(data.auctionEndTime!)
            ).toISOString(),
            image: undefined,
          };
          if (data.collection && data.collection !== "Create collection") {
            payload.collection = data.collection;
          }
          console.log("Payload:", payload);
          await sendPayload(payload);
        }
      };
      

    return (
        <section className={s.createPage}>
            <div className={s.container}>
                <form onSubmit={onSubmitHandler} className={s.createPageContent}>
                    <div className={s.leftContent}>
                        <div className={s.contentTop}>
                            <p className={s.contentTitle}>Create single collectible</p>
                            <button type='button' className={s.switchButton}>
                                Switch to Multiple
                            </button>
                        </div>


                        <h2 className={s.uploadTitle}>Upload file</h2>
                        <p className={s.uploadContenttTitle}>Drag or choose your file to upload</p>

                        <div className={s.uploadContent}>

                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                                className={s.fileInput}
                            />
                        </div>
                        <h2 className={s.uploadDetails}>Item Details</h2>
                        <div className={s.detailsBlock}>
                            <label htmlFor="name"  >ITEM NAME</label>
                            <input
                                onChange={onChangeHandler}
                                value={data.name}
                                type="text"
                                name='name'
                                id='name'
                                placeholder='e. g. "Redeemable Bitcoin Card with logo"'
                                className={s.detailsFiled}

                            />
                        </div>

                        <div className={s.detailsBlock}>
                            <label htmlFor="description" >DESCRIPTION</label>
                            <input
                                onChange={onChangeHandler}
                                value={data.description}
                                type="text"
                                name='description'
                                id='description'
                                placeholder='e. g. “After purchasing you will able to recived the logo...”'
                                className={s.detailsFiled}
                            />
                        </div>

                        <span className={s.line}></span>

                        <div className={s.detailsInfo}>

                            <label htmlFor="start">Choose Date</label>
                            <input
                                type="date"
                                id="start"
                                name="auctionEndTime"
                                value={data.auctionEndTime ? data.auctionEndTime.toISOString().split("T")[0] : ""} //  YYYY-MM-DD
                                onChange={onChangeHandler}
                                min="2025-02-09"
                                max="2030-02-09"
                            />



                        </div>

                        <div className={s.detailsInfo}>
                            <div className={s.detailsInfoLeft}>
                                <h3>Instant sale price</h3>
                                <p>Enter the price for which the item will be instantly sold</p>
                            </div>
                            <input type="checkbox" className={s.detailsInfoField} onChange={handleCheckeCheckbox}
                                checked={isChecked} />
                        </div>
                        {isChecked && (
                            <input
                                onChange={onChangeHandler}
                                value={data.price}
                                type="number" placeholder="Enter price" name='price' className={s.detailsCheckedInput} />
                        )}




                        <div className={s.detailsCollection}>
                            {/* <h3 className={s.collectionTitle}>Choose collection</h3>
                            <p className={s.collectionSubtitle}>Choose an exiting collection or create a new one</p> */}

                            {/* <div className={s.detailsCollections}>
                                <div className={s.collection} onClick={() => handleCollectionSelect("Create collection")}>
                                    <img src={plusIcon} alt="" />
                                    <p className={s.collectionCrypto}>Create collection</p>
                                </div>

                                <div className={s.collection} onClick={() => handleCollectionSelect("Crypto Legend - Professor")}>
                                    <img src={plusIcon} alt="icon" />
                                    <p className={s.collectionCrypto}>Crypto Legend - Professor</p>
                                </div>

                                <div className={s.collection} onClick={() => handleCollectionSelect("Legend Photography")}>
                                    <img src={plusIcon} alt="icon" />
                                    <p className={s.collectionCrypto}>Legend Photography</p>
                                </div>

                                <div className={s.collection} onClick={() => handleCollectionSelect("Crypto Legend - Professor")}>
                                    <img src={plusIcon} alt="icon" />
                                    <p className={s.collectionCrypto}>Crypto Legend - Professor</p>
                                </div>
                            </div> */}


                            <button type='submit' className={s.createNft}>
                                Create item
                            </button>
                        </div>

                    </div>
                    <div className={s.rightContent}>
                        <div className={s.rightBlock}>
                            <h3 className={s.previewTitle}>Preview</h3>
                            <img
                                src={image ? URL.createObjectURL(image) : nft}
                                alt="uploaded-preview"
                                className={s.previeImg}
                            />
                            <div className={s.nftPreviewInfo}>
                                <p className={s.nftTitle}>NFT TITLE</p>
                                <p className={s.nftPrice}>2.45 ETH</p>
                            </div>
                            <button type='button' className={s.nftDeleteButton}>
                                <img src={removeIcon} alt="remove-icon" className={s.removeIcon} />
                                Clear all
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Create
