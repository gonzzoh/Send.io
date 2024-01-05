import { createContext, Dispatch, SetStateAction } from 'react';

interface SubmissionContextProps {
    submissionValue: boolean;
    setSubmissionValue: Dispatch<SetStateAction<boolean>> | undefined;
}

export const SubmissionContext = createContext<SubmissionContextProps>({ submissionValue: false, setSubmissionValue: undefined });
