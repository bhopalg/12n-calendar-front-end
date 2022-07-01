import { KeyboardEvent, useState} from 'react';
import {decode} from 'html-entities';
import styles from '../../styles/newsletter-form.module.css'

interface Props {
    message: string | null | Error;
    status: any;
    onValidated: ({EMAIL}: {EMAIL: string}) => any;
}

const NewsletterForm = ({status, message, onValidated}: Props) => {
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const handleFormSubmit = () => {
        setError(null);

        if (!email) {
            setError('Please enter a valid email address');
            return null;
        }

        const isFormValidated: boolean = onValidated({EMAIL: email});
        return email && (email as string).indexOf("@") > -1 && isFormValidated;
    }

    const handleInputKeyEvent = (event: KeyboardEvent<HTMLInputElement> ) => {
        setError(null);
        if (event.key === 'Enter') {
            event.preventDefault();
            handleFormSubmit();
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
            <div className={`${styles['newsletter-container']}`}>
                <div className="">
                    <form className="sm:flex sm:items-center">
                        <div className={`${styles['newsletter-text']} text-white pr-5`}>
                            Subscribe to newsletter
                        </div>
                        <div className="w-full sm:max-w-xs">
                            <input
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
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );

    return (
        <>
            <div className="d-flex newsletter-input-fields">
                <div className="mc-field-group">
                    <input
                        // @ts-ignore
                        onChange={(event) => setEmail(event?.target?.value ?? '')}
                        type="email"
                        placeholder="Your email"
                        className="mr-2"
                        onKeyUp={(event) => handleInputKeyEvent(event)}
                    />
                </div>
                <div className="button-wrap wp-block-button">
                    <button className="wp-block-button__link" onClick={handleFormSubmit}>
                        Submit
                    </button>
                </div>
            </div>
            <div className="newsletter-form-info">
                {status === "sending" && <div>Sending...</div>}
                {status === "error" || error ? (
                    <div
                        className="newsletter-form-error"
                        dangerouslySetInnerHTML={{ __html: error || getMessage(message as string) }}
                    />
                ) : null }
                {status === "success" && status !== "error" && !error && (
                    <div dangerouslySetInnerHTML={{ __html: decode(message as string) }} />
                )}
            </div>
        </>
    );
}

export default NewsletterForm