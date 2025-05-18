
import s from './EditNFt.module.scss';
import nft from "../../assets/MultipleNft.png"
import removeIcon from '../../assets/removeIcon.png'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useNft } from '../../context/nftContext';



interface IAddNft {
  name: string;
  description: string;
  price: number;
  auctionEndTime: Date | string | null;
  // collection: string;
  data?: any;
  image: string | File | null;
}

const EditNft = () => {


  const { name, description, price, auctionEndTime,  image, updateNFT } = useNft();
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState<IAddNft>({
    name: "",
    description: "",
    price: 0,
    auctionEndTime: null,
    // collection: "",
    image: ""
  });
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();
  console.log(name)
  console.log(description)
  console.log(price)
  console.log(auctionEndTime)
  console.log(image)


  
  useEffect(() => {
    setData({
      name: name,
      description: description,
      price: price,
      auctionEndTime: auctionEndTime ? new Date(auctionEndTime) : null,
      // collection: collection,
      image: image
    });
  
  }, [name, description, price, auctionEndTime, image]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "auctionEndTime") {
      const localDate = new Date(value);
      setData((prevData) => ({
        ...prevData,
        auctionEndTime: localDate,
      }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCheckeCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!id) {
      alert("Error: ID not defined");
      return;
    }
  
    
    const isoDate = new Date(data.auctionEndTime).toISOString();
  
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        await updateNFT(
          id, 
          data.name,
          data.description,
          data.price,
          isoDate,
          base64Image,
          // data.collection
        );
        // navigate("/profile");
      };
      console.log("Data before update:", data);
      console.log("Sending updateNFT...");
    } else {
      await updateNFT(
        id,
        data.name,
        data.description,
        data.price,
        isoDate,
        typeof data.image === "string" ? data.image : null,
        // data.collection
      );
      // navigate("/profile");
    }
  };

  return (
    <section className={s.createPage}>
      <div className={s.container}>
        <form onSubmit={onSubmitHandler} className={s.createPageContent}>
          <div className={s.leftContent}>
            <div className={s.contentTop}>
              <p className={s.contentTitle}>Update NFT</p>
            </div>

            <h2 className={s.uploadTitle}>Upload file</h2>
            <p className={s.uploadContenttTitle}>Drag or choose your file to upload</p>
            <div className={s.uploadContent}>
              <input
                type="file"
                onChange={(e) =>
                  setSelectedImage(e.target.files ? e.target.files[0] : null)
                }
                className={s.fileInput}
              />
            </div>
            <h2 className={s.uploadDetails}>Item Details</h2>
            <div className={s.detailsBlock}>
              <label htmlFor="name">ITEM NAME</label>
              <input
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                name="name"
                id="name"
                placeholder='e.g. "Redeemable Bitcoin Card with logo"'
                className={s.detailsFiled}
              />
            </div>

            <div className={s.detailsBlock}>
              <label htmlFor="description">DESCRIPTION</label>
              <input
                onChange={onChangeHandler}
                value={data.description}
                type="text"
                name="description"
                id="description"
                placeholder='e.g. "After purchasing you will be able to receive the logo..."'
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
                value={
                  data.auctionEndTime
                    ? (data.auctionEndTime instanceof Date
                      ? data.auctionEndTime
                      : new Date(data.auctionEndTime)
                    )
                      .toISOString()
                      .split("T")[0]
                    : ""
                }
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
              <input
                type="checkbox"
                className={s.detailsInfoField}
                onChange={handleCheckeCheckbox}
                checked={isChecked}
              />
            </div>
            {isChecked && (
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                placeholder="Enter price"
                name="price"
                className={s.detailsCheckedInput}
              />
            )}

            <div className={s.detailsCollection}>
              <button type="submit" className={s.createNft} >
                Update NFT
              </button>
            </div>
          </div>
          <div className={s.rightContent}>
            <div className={s.rightBlock}>
              <h3 className={s.previewTitle}>Preview</h3>
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : typeof image === "string" && image
                      ? image
                      : nft
                }
                alt="uploaded-preview"
                className={s.previeImg}
              />
              <div className={s.nftPreviewInfo}>
                <p className={s.nftTitle}>NFT TITLE</p>
                <p className={s.nftPrice}>2.45 ETH</p>
              </div>
              <button type="button" className={s.nftDeleteButton}>
                <img src={removeIcon} alt="remove-icon" className={s.removeIcon} />
                Clear all
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditNft; 


