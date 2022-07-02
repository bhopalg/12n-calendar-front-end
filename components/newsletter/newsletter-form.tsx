import { KeyboardEvent, useState } from 'react';
import styles from '../../styles/newsletter-form.module.scss';
import Notification from "../notification/notification";

const NewsletterForm = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [notificationSettings, setNotificationSettings] = useState<{
        message: string;
        status: 'error' | 'success' | 'sending'
    }>();

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();

        if (!email) {
            setShowNotification(true);
            setNotificationSettings({
                message: 'Please enter a vaild email',
                status: 'error',
            });
            return;
        }

        setNotificationSettings({
            message: 'Sending....',
            status: 'sending',
        });
        setShowNotification(true);

        const res = await fetch("/api/newsletter-subscribe", {
            body: JSON.stringify({
                email: email,
            }),

            headers: {
                "Content-Type": "application/json",
            },

            method: "POST",
        });
        const results = await res.json();

        if (res.status >= 400) {
            setShowNotification(true);
            setNotificationSettings({
                message: results?.error,
                status: 'error',
            });
            return;
        }

        setShowNotification(true);
        setNotificationSettings({
            message: 'Successfully subscribed',
            status: 'success',
        });
        return;

    }

    const handleInputKeyEvent = (event: KeyboardEvent<HTMLInputElement> ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleFormSubmit(event);
        }
    }

    return (
        <>
            {
                showNotification ?
                    <Notification
                        show={showNotification}
                        message={notificationSettings?.message}
                        status={notificationSettings?.status}
                        setShow={setShowNotification}/>
                    : <></>
            }
            <div className={`${styles['newsletter-container']}`}>
                <div className="">
                    <form className="sm:flex sm:items-center">
                        <div className={`${styles['newsletter-text']} text-white pr-5`}>
                            Subscribe to newsletter
                        </div>
                        <div className="w-full sm:max-w-xs">
                            <input
                                onChange={(event) => setEmail(event?.target?.value ?? '')}
                                onKeyUp={(event) => handleInputKeyEvent(event)}
                                type="email"
                                name="email"
                                id="email"
                                className={`block w-full sm:text-sm rounded-md ${styles['email-input']} border border-transparent`}
                                placeholder="you@example.com"
                            />
                        </div>
                        <button
                            type="submit"
                            className={`${styles['email-button']} w-full inline-flex items-center justify-center px-4 py-2 font-medium rounded-md text-white sm:mt-0 sm:ml-3 sm:w-auto border border-transparent`}
                            onClick={(e) => handleFormSubmit(e)}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewsletterForm