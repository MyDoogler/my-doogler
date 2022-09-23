import { useState } from 'react';
import { Header } from '../components/Header';
import { ImageWithTextBlock } from '../components/ImageWithTextBlock';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import {
  query,
  collection,
  where,
  setDoc,
  DocumentData,
  doc,
} from 'firebase/firestore';
import { Doogler } from '../components/Doogler';
import { DateTimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

import smartDogs from '../assets/header.jpg';
import { MinderApplication, MinderApplicationProps } from '../components/MinderApplication';

export const FindMinder = () => {
  const firestore = useFirestore();
  const { status: userStatus, data: user } = useUser();
  const dooglersQuery = query(
    collection(firestore, 'dogs'),
    where('owner', '==', user?.email || ''),
  );
  const { status, data: dooglers } = useFirestoreCollectionData(dooglersQuery);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  function toUnix(date: Date) {
    return Math.floor(new Date(date.toString()).getTime() / 1000);
  }

  const findMinder = async (doogler: DocumentData) => {
    if (!startDate || !endDate) {
      alert('Please select a valid start and end date');
      return;
    }
    if (totalMindingTime(startDate, endDate) === "") {
      alert('Please select a valid start and end date');
      return;
    }
    await setDoc(doc(collection(firestore, 'dogs'), doogler.id), {
      lookingForMinder: true,
      startTime: toUnix(startDate),
      endTime: toUnix(endDate),
    }, { merge: true });
  };

  function totalMindingTime(startDate: Date, endDate: Date) {
    const res = ((toUnix(endDate) - toUnix(startDate)) / 60 / 60).toFixed(2)
    return res === 'NaN' ? '' : `${res} hours`;
  }

  const FindMinderForm = () => (
    <div className="find-minder__form">
      <DateTimePicker
        value={startDate}
        onChange={(date) => setStartDate(date)}
        renderInput={(props) => <TextField {...props} />}
        label="Start Date"
      />
      <DateTimePicker
        value={startDate}
        onChange={(date) => setEndDate(date)}
        renderInput={(props) => <TextField {...props} />}
        label="End Date"
      />
      {
        endDate && startDate &&
        <div style={{ marginTop: '0.45rem' }}>
          Total Minding time: {totalMindingTime(startDate, endDate)}
        </div>
      }
    </div>
  )

  return (
    <>
      <Header />
      <ImageWithTextBlock
        imageSrc={smartDogs}
        text={"Find Minder"}
      />
      {status === 'loading' || userStatus === 'loading' ? (
        <p>Loading...</p>
      ) : dooglers.length === 0 ? (
        <p>You have no dooglers</p>
      ) : (
        dooglers?.map((doogler, index) => (
          <>
            <div className="find-minders__container">
              <Doogler
                key={index}
                id={doogler.id}
                imgSrc={doogler.imgSrc}
                name={doogler.name}
                breed={doogler.breed}
                owner={doogler.owner}
                office={doogler.office}
                description={doogler?.description}
                startTime={doogler?.startTime}
                endTime={doogler?.endTime}
                lookingForMinder={doogler?.lookingForMinder}
                minderApplications={doogler?.minderApplications}
                age={doogler.age}
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1', justifyContent: 'center' }}>
                {!doogler.lookingForMinder && <FindMinderForm />}
                <div style={{ marginBottom: "1rem" }}>
                  {
                    doogler.lookingForMinder ? (
                      <p>✅ Posted</p>
                    ) : (
                      <button onClick={() => findMinder(doogler)} style={{ marginTop: '3rem' }}>
                        Find Minder for {doogler.name}
                      </button>
                    )
                  }
                </div>
                {doogler.minderApplications && doogler.minderApplications.length > 0 ? (
                  <table className="applications-table">
                    <thead>
                      <tr>
                        <th>Reply</th>
                        <th>Status</th>
                        <th>Minder Email</th>
                      </tr>
                    </thead>
                    {doogler.minderApplications.map((application: MinderApplicationProps) => (
                      <MinderApplication {...application} />
                    ))}
                  </table>
                ) : (
                  <>
                    {
                      doogler.lookingForMinder && <p>No applications yet</p>
                    }
                  </>
                )}
              </div>
            </div>
          </>
        ))
      )}
    </>
  );
};
