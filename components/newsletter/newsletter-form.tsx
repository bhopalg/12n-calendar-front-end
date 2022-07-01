import {KeyboardEvent, useEffect, useState} from 'react';
import {decode} from 'html-entities';
import styles from '../../styles/newsletter-form.module.scss';
import Notification from "../notification/notification";

interface Props {
    message: string | null | Error;
    status: any;
    onValidated: ({EMAIL}: {EMAIL: string}) => any;
}

const NewsletterForm = ({status, message, onValidated}: Props) => {
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [notificationSettings, setNotificationSettings] = useState<{
        message: string;
        status: 'error' | 'success' | 'sending'
    }>();

    useEffect(() => {
        if (status === 'sending') {
            setNotificationSettings({
                status: 'sending',
                message: 'Sending...',
            });
            setShowNotification(true);
        } else if (status === 'error' || error) {
            setNotificationSettings({
                status: 'error',
                message: error || getMessage(message as string),
            });
            setShowNotification(true);
        } else if (status === "success" && status !== "error" && !error) {
            setNotificationSettings({
                status: 'success',
                message: decode(message as string),
            });
            setShowNotification(true);
        } else {
            setShowNotification(false);
        }
    }, [status]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setError(null);

        if (!email) {
            setNotificationSettings({
                status: 'error',
                message: 'Please enter a valid email address'
            });
            return null;
        }

        const isFormValidated: boolean = onValidated({EMAIL: email});
        return email && (email as string).indexOf("@") > -1 && isFormValidated;
    }

    const handleInputKeyEvent = (event: KeyboardEvent<HTMLInputElement> ) => {
        setError(null);
        if (event.key === 'Enter') {
            event.preventDefault();
            handleFormSubmit(event);
        }
    }

    const getMessage = (message: string): null | any => {
        if ( !message ) {
            return null;
        }
        const result = message?.split('-') ?? null;
        if ( "0" !== result?.[0]?.trim() ) {
            return decode(message);
        }
        const formattedMessage = result?.[1]?.trim() ?? null;

        return formattedMessage ? decode( formattedMessage ) : null;
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