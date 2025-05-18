import s from './Notification.module.scss';
import nft from '../../assets/singleImage.png'
import { useInfo } from '../../context/UserInfo';
import axios from 'axios';
import { useEffect, useState } from 'react';


interface NotificationData {
    id: string;
    image?: string; 
    message: string;
    date: string;
}


const Notification = () => {
    const { token } = useInfo();
    const [data, setData] = useState<NotificationData[]>([])

    const getNotifications = async () => {
        if (!token) {
            alert("You do not have a token");
            return;
        }
        try {
            const response = await axios.get(
                "http://localhost:5555/api/v1/auth/messages",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data); 

            const { walletTransfers } = response.data;

            if (Array.isArray(walletTransfers) && walletTransfers.length > 0) {
                const notifications = walletTransfers.map((transfer: any) => ({
                    id: transfer._id,
                    image: nft,
                    message: `Transferred ${transfer.amount} tokens`,
                    date: new Date(transfer.timestamp).toLocaleString(),
                }));
                setData(notifications);
            } else {
                setData([]); 
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        getNotifications();
    }, []);

    return (
        <section className={s.notification}>
            <div className={s.notificationBlock}>
                <div className={s.notificationTop}>
                    <h2 className={s.notificationTitle}>Notification</h2>
                    <button type='button' className={s.notificationButton}>See all</button>
                </div>
                {data.length === 0 ? (
                    <p>No notifications available.</p>
                ) : (
                    data.map((notification) => (
                        <div key={notification.id} className={s.notificationContent}>
                            <div className={s.notificationBlockInfo}>
                                <p className={s.notificationContTitle}>
                                    {notification.message}
                                </p>
                                <p className={s.notificationDate}>{notification.date}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}

export default Notification
