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
      ...doogler,
      lookingForMinder: true,
      startTime: toUnix(startDate),
      endTime: toUnix(endDate),
    });
  };

  function totalMindingTime(startDate: Date, endDate: Date) {
    const res = ((toUnix(endDate) - toUnix(startDate)) / 60 / 60).toFixed(2)
    return res === 'NaN' ? '' : `${res} hours`;
  }

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
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Doogler
                key={index}
                imgSrc={doogler.imgSrc}
                name={doogler.name}
                breed={doogler.breed}
                owner={doogler.owner}
                office={doogler.office}
                description={doogler?.description}
                age={doogler.age}
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingTop: '2rem', paddingBottom: '2rem', marginLeft: '25px' }}>
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
                  <div>
                    Total Minding time: {totalMindingTime(startDate, endDate)}
                  </div>
                }
              </div>
            </div>
            {
              doogler.lookingForMinder ? (
                <p>✅ Already posted</p>
              ) : (
                <button onClick={() => findMinder(doogler)}>
                  Find Minder for {doogler.name}
                </button>
              )
            }
          </>
        ))
      )}
    </>
  );
};
