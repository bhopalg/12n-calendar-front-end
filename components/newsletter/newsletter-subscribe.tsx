import MailchimpSubscribe, {DefaultFormFields, FormHooks} from 'react-mailchimp-subscribe';
import NewsletterForm from './newsletter-form';

function NewsletterSubscribe() {
    const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

    return (
        <MailchimpSubscribe
            url={ MAILCHIMP_URL as string }
            render={ ( props: FormHooks<DefaultFormFields> ) => {
                const { subscribe, status, message } = props || {};
                return (
                    <NewsletterForm
                        status={ status }
                        message={ message }
                        onValidated={(formData: {EMAIL: string}) => subscribe(formData)}
                    />
                );
            } }
        />
    );
}

export default NewsletterSubscribe;