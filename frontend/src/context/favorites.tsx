import  { createContext, useState, useContext, ReactNode } from 'react';

interface NFT {
    image: string;
    name: string;
    price: number;
    _id: string;
  }
  
  interface FavoritesContextType {
    favorites: NFT[];
    addFavorite: (nft: NFT) => void;
    removeFavorite: (nftId: string) => void;
    getFavorites: () => NFT[];
  }
  
  const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
  
  export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<NFT[]>(() => {
      const storedFavorites = localStorage.getItem("favorites");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    });
  
    const addFavorite = (nft: NFT) => {
      setFavorites((prevFavorites) => {
        if (prevFavorites.some((item) => item._id === nft._id)) {
          return prevFavorites; 
        }
        const updatedFavorites = [...prevFavorites, nft];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
        return updatedFavorites;
      });
    };
  
    const removeFavorite = (nftId: string) => {
      setFavorites((prevFavorites) => {
        const updatedFavorites = prevFavorites.filter((item) => item._id !== nftId);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
        return updatedFavorites;
      });
    };
  
    const getFavorites = () => favorites;

    return (
      <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, getFavorites }}>
        {children}
      </FavoritesContext.Provider>
    );
  };
  
  export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (!context) {
      throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
  };