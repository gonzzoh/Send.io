import React, { useState } from 'react';
import ShipmentForm from './components/ShipmentForm.tsx';
import ShipmentList from './components/ShipmentList.jsx';
import { SubmissionContext } from './context/SubmissionContext.tsx';

export default function App() {
    const [submission, setSubmission] = useState<boolean>(false);

    return (
        <SubmissionContext.Provider value={{ submissionValue: submission, setSubmissionValue: setSubmission }}>
            <ShipmentForm />
            <ShipmentList />
        </SubmissionContext.Provider>
    );
}
