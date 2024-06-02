import { CONTACT_US_FIELDS_INTERFACE } from "..";

export const CONTACT_FIELDS: CONTACT_US_FIELDS_INTERFACE[] = [
    {
        label: "Name",
        className: 'aboutUsField',
        name: 'name',
        placeHolder: 'Enter your name'
    },
    {
        label: "Email Address",
        className: 'aboutUsField',
        name: 'email',
        placeHolder: 'Enter your email'
    },
    {
        label: "Message",
        className: 'aboutUsField',
        name: 'comment',
        placeHolder: 'How can we help?'
    }
]